import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LuCheck, LuArrowLeft, LuArrowRight, LuWallet, LuCreditCard } from "react-icons/lu";
import PageHeader from "../components/common/PageHeader";
import CartSummary from "../components/cart/CartSummary";
import ErrorMessage from "../components/common/ErrorMessage";
import OfflineNotice from "../components/common/OfflineNotice";
import { selectCartItems, clearCart } from "../redux/slices/cartSlice";
import { selectStoreConfig } from "../redux/slices/productSlice";
import { placeOrder } from "../redux/slices/orderSlice";
import { selectUser } from "../redux/slices/authSlice";
import { createPaymentOrderApi, loadRazorpay, verifyPaymentApi } from "../api/paymentApi";
import { errorMessage } from "../api/axios";
import { isServiceablePincode, isValidEmail, isValidPhone, isValidPincode, normalizePhone } from "../utils/validation";
import { formatINR } from "../utils/currency";
import { SITE } from "../config/site";
import usePageTitle from "../hooks/usePageTitle";

const STEPS = ["Details", "Address", "Delivery", "Payment"];

function Field({ id, label, error, children, className = "" }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="label">{label}</label>
      {children}
      {error && <p id={`${id}-err`} className="mt-1 text-xs text-red-700">{error}</p>}
    </div>
  );
}

export default function Checkout() {
  usePageTitle("Checkout");
  const items = useSelector(selectCartItems);
  const config = useSelector(selectStoreConfig);
  const user = useSelector(selectUser);
  const source = useSelector((s) => s.product.source);
  const { placing } = useSelector((s) => s.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [pendingOrder, setPendingOrder] = useState(null);
  const [paying, setPaying] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    line1: "", area: "", city: "Vasai Virar", state: "Maharashtra", pincode: "", instructions: "",
    slot: config.deliverySlots?.[0] || "", notes: "",
    paymentMethod: config.codEnabled ? "cod" : "online",
  });

  // Prefill from the logged-in customer + their default address (once per user).
  const [prefilledFor, setPrefilledFor] = useState(null);
  if (user && prefilledFor !== user._id) {
    setPrefilledFor(user._id);
    const addr = user.addresses?.find((a) => a.isDefault) || user.addresses?.[0];
    setForm((f) => ({
      ...f,
      name: f.name || user.name || "",
      phone: f.phone || user.phone || "",
      email: f.email || user.email || "",
      ...(addr && !f.line1 ? { line1: addr.line1, area: addr.area, city: addr.city, state: addr.state, pincode: addr.pincode } : {}),
    }));
  }

  if (!items.length && !pendingOrder) return <Navigate to="/cart" replace />;

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = (s) => {
    const e = {};
    if (s === 0) {
      if (form.name.trim().length < 2) e.name = "Please enter your full name.";
      if (!isValidPhone(form.phone)) e.phone = "Enter a valid 10-digit mobile number.";
      if (!isValidEmail(form.email)) e.email = "Enter a valid email address.";
    }
    if (s === 1) {
      if (form.line1.trim().length < 5) e.line1 = "Enter your house / flat and street.";
      if (!form.area.trim()) e.area = "Enter your area or locality.";
      if (!form.city.trim()) e.city = "Enter your city.";
      if (!isValidPincode(form.pincode)) e.pincode = "Enter a valid 6-digit PIN code.";
      else if (!isServiceablePincode(form.pincode, config.serviceablePincodePrefixes))
        e.pincode = `Sorry, we don’t deliver to ${form.pincode} yet. We currently serve ${SITE.serviceArea}.`;
    }
    if (s === 2 && config.deliverySlots?.length && !form.slot) e.slot = "Choose a delivery slot.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => validate(step) && setStep((s) => s + 1);

  const finish = (order) => {
    dispatch(clearCart());
    navigate(`/order-success/${order.orderNumber}`, { state: { order } });
  };

  const payOnline = async (order) => {
    setPaying(true);
    setSubmitError("");
    try {
      const ok = await loadRazorpay();
      if (!ok) throw new Error("Could not load the payment window. Check your connection and try again.");
      const rp = await createPaymentOrderApi(order._id);
      await new Promise((resolve, reject) => {
        const rzp = new window.Razorpay({
          key: rp.keyId,
          amount: rp.amount,
          currency: rp.currency,
          order_id: rp.razorpayOrderId,
          name: SITE.shortName,
          description: `Order ${order.orderNumber}`,
          image: SITE.logo,
          prefill: { name: form.name, contact: normalizePhone(form.phone), email: form.email },
          theme: { color: "#124C2F" },
          handler: async (resp) => {
            try {
              const verified = await verifyPaymentApi({ orderId: order._id, ...resp });
              resolve(verified);
            } catch (err) {
              reject(err);
            }
          },
          modal: { ondismiss: () => reject(new Error("Payment was cancelled.")) },
        });
        rzp.on("payment.failed", (r) => reject(new Error(r.error?.description || "Payment failed.")));
        rzp.open();
      });
      finish(order);
    } catch (err) {
      setPendingOrder(order);
      setSubmitError(`${errorMessage(err)} Your order ${order.orderNumber} is saved — you can retry the payment.`);
    } finally {
      setPaying(false);
    }
  };

  const submit = async () => {
    for (const s of [0, 1, 2]) {
      if (!validate(s)) return setStep(s);
    }
    setSubmitError("");
    if (pendingOrder) return payOnline(pendingOrder);
    const body = {
      items: items.map((i) => ({ product: i.id, quantity: i.quantity })),
      customer: { name: form.name.trim(), phone: normalizePhone(form.phone), email: form.email.trim() },
      deliveryAddress: {
        line1: form.line1.trim(), area: form.area.trim(), city: form.city.trim(), state: form.state.trim(),
        pincode: form.pincode, instructions: form.instructions.trim(),
      },
      deliverySlot: form.slot,
      notes: form.notes.trim(),
      paymentMethod: form.paymentMethod,
    };
    const res = await dispatch(placeOrder(body));
    if (placeOrder.rejected.match(res)) return setSubmitError(res.payload);
    const order = res.payload;
    if (form.paymentMethod === "online") return payOnline(order);
    finish(order);
  };

  const err = (k) => errors[k];
  const aria = (k) => ({ "aria-invalid": Boolean(errors[k]), "aria-describedby": errors[k] ? `${k}-err` : undefined });

  return (
    <>
      <PageHeader title="Checkout" crumbs={[{ label: "Cart", to: "/cart" }, { label: "Checkout" }]} />
      <div className="container-x grid gap-8 py-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-5">
          {source === "local" && <OfflineNotice />}
          <ol className="flex items-center gap-2" aria-label="Checkout steps">
            {STEPS.map((s, i) => (
              <li key={s} className="flex flex-1 items-center gap-2">
                <button
                  type="button"
                  onClick={() => i < step && setStep(i)}
                  disabled={i > step}
                  aria-current={i === step ? "step" : undefined}
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold ${
                    i < step ? "bg-leaf text-white" : i === step ? "bg-farm-800 text-white" : "bg-beige text-muted"
                  }`}
                >
                  {i < step ? <LuCheck className="h-4 w-4" /> : i + 1}
                </button>
                <span className={`hidden text-sm font-semibold sm:block ${i === step ? "text-farm-900" : "text-muted"}`}>{s}</span>
                {i < STEPS.length - 1 && <span className="h-px flex-1 bg-line" />}
              </li>
            ))}
          </ol>

          <section className="card p-5 sm:p-7">
            {step === 0 && (
              <div className="grid gap-4 sm:grid-cols-2">
                <h2 className="font-display text-lg font-bold sm:col-span-2">Customer information</h2>
                {!user && (
                  <p className="text-sm text-muted sm:col-span-2">
                    Have an account? <Link to="/login?redirect=%2Fcheckout" className="font-semibold text-farm-800 underline">Log in</Link> for faster checkout — or continue as a guest.
                  </p>
                )}
                <Field id="name" label="Full name *" error={err("name")} className="sm:col-span-2">
                  <input id="name" className="input" autoComplete="name" value={form.name} onChange={set("name")} {...aria("name")} />
                </Field>
                <Field id="phone" label="Mobile number *" error={err("phone")}>
                  <input id="phone" className="input" inputMode="tel" autoComplete="tel" placeholder="10-digit mobile" value={form.phone} onChange={set("phone")} {...aria("phone")} />
                </Field>
                <Field id="email" label="Email (optional)" error={err("email")}>
                  <input id="email" type="email" className="input" autoComplete="email" value={form.email} onChange={set("email")} {...aria("email")} />
                </Field>
              </div>
            )}

            {step === 1 && (
              <div className="grid gap-4 sm:grid-cols-2">
                <h2 className="font-display text-lg font-bold sm:col-span-2">Delivery address</h2>
                <Field id="line1" label="House / flat, building, street *" error={err("line1")} className="sm:col-span-2">
                  <input id="line1" className="input" autoComplete="address-line1" value={form.line1} onChange={set("line1")} {...aria("line1")} />
                </Field>
                <Field id="area" label="Area / locality *" error={err("area")}>
                  <input id="area" className="input" autoComplete="address-line2" value={form.area} onChange={set("area")} {...aria("area")} />
                </Field>
                <Field id="city" label="City *" error={err("city")}>
                  <input id="city" className="input" autoComplete="address-level2" value={form.city} onChange={set("city")} {...aria("city")} />
                </Field>
                <Field id="state" label="State">
                  <input id="state" className="input" autoComplete="address-level1" value={form.state} onChange={set("state")} />
                </Field>
                <Field id="pincode" label="PIN code *" error={err("pincode")}>
                  <input id="pincode" className="input" inputMode="numeric" maxLength={6} autoComplete="postal-code" value={form.pincode} onChange={(e) => setForm((f) => ({ ...f, pincode: e.target.value.replace(/\D/g, "") }))} {...aria("pincode")} />
                </Field>
                <Field id="instructions" label="Delivery instructions (optional)" className="sm:col-span-2">
                  <input id="instructions" className="input" placeholder="e.g. Ring the bell, leave with security" value={form.instructions} onChange={set("instructions")} />
                </Field>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="font-display text-lg font-bold">Delivery</h2>
                <p className="rounded-xl bg-cream p-3 text-sm text-farm-800">
                  <LuCheck className="mr-1 inline h-4 w-4" aria-hidden /> We deliver to PIN code {form.pincode}.
                </p>
                {config.deliverySlots?.length > 0 && (
                  <fieldset>
                    <legend className="label">Preferred delivery slot *</legend>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {config.deliverySlots.map((slot) => (
                        <label key={slot} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm font-medium ${form.slot === slot ? "border-farm-800 bg-cream" : "border-line"}`}>
                          <input type="radio" name="slot" value={slot} checked={form.slot === slot} onChange={set("slot")} className="accent-farm-800" />
                          {slot}
                        </label>
                      ))}
                    </div>
                    {err("slot") && <p className="mt-1 text-xs text-red-700">{err("slot")}</p>}
                  </fieldset>
                )}
                <Field id="notes" label="Order notes (optional)">
                  <textarea id="notes" rows={3} className="input" value={form.notes} onChange={set("notes")} />
                </Field>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <h2 className="font-display text-lg font-bold">Payment</h2>
                <fieldset className="grid gap-3 sm:grid-cols-2" disabled={Boolean(pendingOrder)}>
                  <legend className="sr-only">Payment method</legend>
                  {config.codEnabled && (
                    <label className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 ${form.paymentMethod === "cod" ? "border-farm-800 bg-cream" : "border-line"}`}>
                      <input type="radio" name="pm" value="cod" checked={form.paymentMethod === "cod"} onChange={set("paymentMethod")} className="mt-1 accent-farm-800" />
                      <span><span className="flex items-center gap-2 font-semibold"><LuWallet className="h-4 w-4" aria-hidden /> Cash on Delivery</span><span className="text-xs text-muted">Pay by cash or UPI when your order arrives.</span></span>
                    </label>
                  )}
                  <label className={`flex items-start gap-3 rounded-xl border p-4 ${config.onlinePaymentEnabled ? "cursor-pointer" : "opacity-50"} ${form.paymentMethod === "online" ? "border-farm-800 bg-cream" : "border-line"}`}>
                    <input type="radio" name="pm" value="online" disabled={!config.onlinePaymentEnabled} checked={form.paymentMethod === "online"} onChange={set("paymentMethod")} className="mt-1 accent-farm-800" />
                    <span><span className="flex items-center gap-2 font-semibold"><LuCreditCard className="h-4 w-4" aria-hidden /> Pay Online</span><span className="text-xs text-muted">{config.onlinePaymentEnabled ? "UPI, cards & net banking via Razorpay." : "Online payment is not available yet."}</span></span>
                  </label>
                </fieldset>

                <div className="rounded-xl border border-line p-4 text-sm">
                  <p className="font-semibold">Delivering to</p>
                  <p className="mt-1 text-muted">
                    {form.name} · {form.phone}<br />
                    {form.line1}, {form.area}, {form.city}, {form.state} – {form.pincode}<br />
                    Slot: {form.slot}
                  </p>
                </div>
                <ul className="divide-y divide-line rounded-xl border border-line text-sm">
                  {items.map((i) => (
                    <li key={i.id} className="flex justify-between gap-3 p-3">
                      <span>{i.name} ({i.packageSize}) × {i.quantity}</span>
                      <span className="font-semibold">{formatINR(i.price * i.quantity)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {submitError && <div className="mt-5"><ErrorMessage message={submitError} /></div>}

            <div className="mt-7 flex justify-between gap-3">
              {step > 0 ? (
                <button type="button" className="btn-outline" onClick={() => setStep((s) => s - 1)}>
                  <LuArrowLeft className="h-4 w-4" aria-hidden /> Back
                </button>
              ) : (
                <Link to="/cart" className="btn-outline"><LuArrowLeft className="h-4 w-4" aria-hidden /> Cart</Link>
              )}
              {step < 3 ? (
                <button type="button" className="btn-primary" onClick={next}>Continue <LuArrowRight className="h-4 w-4" aria-hidden /></button>
              ) : (
                <button type="button" className="btn-primary" onClick={submit} disabled={placing || paying}>
                  {placing || paying ? "Please wait…" : pendingOrder ? "Retry payment" : form.paymentMethod === "online" ? "Pay & Place Order" : "Place Order"}
                </button>
              )}
            </div>
          </section>
        </div>
        <CartSummary />
      </div>
    </>
  );
}
