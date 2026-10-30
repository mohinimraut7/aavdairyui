import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LuLogOut, LuPackage, LuUser, LuMapPin, LuTrash2 } from "react-icons/lu";
import PageHeader from "../components/common/PageHeader";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";
import ErrorMessage from "../components/common/ErrorMessage";
import { deleteAddress, logout, saveAddress, selectUser, updateProfile } from "../redux/slices/authSlice";
import { fetchMyOrders } from "../redux/slices/orderSlice";
import { pushToast } from "../redux/slices/uiSlice";
import { orderByIdApi } from "../api/orderApi";
import { errorMessage } from "../api/axios";
import { formatINR } from "../utils/currency";
import { isValidPincode } from "../utils/validation";
import usePageTitle from "../hooks/usePageTitle";

const STATUS_STYLE = {
  pending: "bg-golden/15 text-[#8a6a0c]",
  confirmed: "bg-blue-50 text-blue-700",
  processing: "bg-blue-50 text-blue-700",
  "out-for-delivery": "bg-leaf/15 text-farm-700",
  delivered: "bg-leaf/20 text-farm-800",
  cancelled: "bg-red-50 text-red-700",
};

export const StatusBadge = ({ status }) => (
  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${STATUS_STYLE[status] || "bg-beige text-ink"}`}>
    {String(status).replace(/-/g, " ")}
  </span>
);

const fmtDate = (d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function Account() {
  usePageTitle("My Account");
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tab = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold ${isActive ? "bg-farm-800 text-white" : "text-ink hover:bg-cream"}`;

  return (
    <>
      <PageHeader title={user ? `Hello, ${user.name.split(" ")[0]}` : "My Account"} crumbs={[{ label: "My Account" }]} />
      <div className="container-x grid gap-8 py-10 lg:grid-cols-[240px_1fr]">
        <nav className="card h-fit space-y-1 p-3" aria-label="Account">
          <NavLink end to="/account" className={tab}><LuUser className="h-4 w-4" /> Profile</NavLink>
          <NavLink to="/account/orders" className={tab}><LuPackage className="h-4 w-4" /> Orders</NavLink>
          <NavLink to="/account/addresses" className={tab}><LuMapPin className="h-4 w-4" /> Addresses</NavLink>
          <button
            onClick={() => {
              dispatch(logout());
              dispatch(pushToast("You have been logged out"));
              navigate("/");
            }}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-muted hover:bg-red-50 hover:text-red-600"
          >
            <LuLogOut className="h-4 w-4" /> Logout
          </button>
        </nav>
        <section>{user ? <Outlet /> : <Loader />}</section>
      </div>
    </>
  );
}

export function ProfileTab() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: user.name, email: user.email || "" });
  const [saving, setSaving] = useState(false);
  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    const r = await dispatch(updateProfile(form));
    setSaving(false);
    dispatch(pushToast(updateProfile.fulfilled.match(r) ? "Profile updated" : r.payload, updateProfile.fulfilled.match(r) ? "success" : "error"));
  };
  return (
    <form onSubmit={save} className="card grid max-w-xl gap-4 p-6">
      <h2 className="font-display text-lg font-bold">Profile</h2>
      <div><label htmlFor="pn" className="label">Full name</label><input id="pn" className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
      <div><label htmlFor="pp" className="label">Mobile number</label><input id="pp" className="input bg-cream" value={user.phone} disabled /></div>
      <div><label htmlFor="pe" className="label">Email</label><input id="pe" type="email" className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
      <button className="btn-primary w-fit" disabled={saving}>{saving ? "Saving…" : "Save changes"}</button>
    </form>
  );
}

export function OrdersTab() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((s) => s.order);
  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);
  if (loading) return <Loader label="Loading your orders…" />;
  if (error) return <ErrorMessage message={error} onRetry={() => dispatch(fetchMyOrders())} />;
  if (!orders.length) return <EmptyState icon={LuPackage} title="No orders yet" text="Your orders will appear here." actionLabel="Start shopping" actionTo="/products" />;
  return (
    <ul className="space-y-3">
      {orders.map((o) => (
        <li key={o._id}>
          <Link to={`/account/orders/${o._id}`} className="card flex flex-wrap items-center justify-between gap-3 p-5 transition hover:shadow-lift">
            <div>
              <p className="font-display font-bold text-farm-900">#{o.orderNumber}</p>
              <p className="text-sm text-muted">{fmtDate(o.createdAt)} · {o.items.length} item{o.items.length > 1 ? "s" : ""}</p>
            </div>
            <div className="flex items-center gap-4">
              <StatusBadge status={o.orderStatus} />
              <span className="font-display font-bold">{formatINR(o.totalAmount)}</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function OrderDetailTab() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    orderByIdApi(id).then(setOrder).catch((e) => setError(errorMessage(e)));
  }, [id]);
  if (error) return <ErrorMessage message={error} />;
  if (!order) return <Loader />;
  const a = order.deliveryAddress;
  return (
    <div className="card p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
        <div>
          <h2 className="font-display text-xl font-bold text-farm-900">Order #{order.orderNumber}</h2>
          <p className="text-sm text-muted">Placed on {fmtDate(order.createdAt)}</p>
        </div>
        <StatusBadge status={order.orderStatus} />
      </div>
      <ul className="divide-y divide-line">
        {order.items.map((i) => (
          <li key={i.product} className="flex justify-between gap-3 py-3 text-sm">
            <span>{i.name} ({i.packageSize}) × {i.quantity}</span>
            <span className="font-semibold">{formatINR(i.lineTotal)}</span>
          </li>
        ))}
      </ul>
      <dl className="mt-2 space-y-1 border-t border-line pt-3 text-sm">
        <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd>{formatINR(order.subtotal)}</dd></div>
        <div className="flex justify-between"><dt className="text-muted">Delivery</dt><dd>{order.deliveryFee ? formatINR(order.deliveryFee) : "FREE"}</dd></div>
        {order.discount > 0 && <div className="flex justify-between"><dt className="text-muted">Discount</dt><dd>-{formatINR(order.discount)}</dd></div>}
        <div className="flex justify-between font-display text-base font-bold"><dt>Total</dt><dd>{formatINR(order.totalAmount)}</dd></div>
      </dl>
      <div className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
        <div className="rounded-xl bg-cream p-4"><p className="font-semibold">Delivery address</p><p className="mt-1 text-muted">{a.line1}, {a.area}, {a.city}, {a.state} – {a.pincode}</p></div>
        <div className="rounded-xl bg-cream p-4"><p className="font-semibold">Payment</p><p className="mt-1 text-muted capitalize">{order.paymentMethod === "cod" ? "Cash on Delivery" : "Online"} · {order.paymentStatus}</p></div>
      </div>
      <Link to="/account/orders" className="btn-outline btn-sm mt-6">Back to orders</Link>
    </div>
  );
}

export function AddressesTab() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const empty = { label: "Home", line1: "", area: "", city: "Vasai Virar", state: "Maharashtra", pincode: "", isDefault: false };
  const [form, setForm] = useState(empty);
  const [err, setErr] = useState("");
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });
  const save = async (e) => {
    e.preventDefault();
    if (!form.line1.trim() || !form.area.trim() || !isValidPincode(form.pincode)) return setErr("Fill address, area and a valid 6-digit PIN code.");
    setErr("");
    const r = await dispatch(saveAddress(form));
    if (saveAddress.fulfilled.match(r)) {
      setForm(empty);
      dispatch(pushToast("Address saved"));
    } else setErr(r.payload);
  };
  return (
    <div className="space-y-6">
      {user.addresses?.length > 0 && (
        <ul className="grid gap-3 sm:grid-cols-2">
          {user.addresses.map((a) => (
            <li key={a._id} className="card flex justify-between gap-3 p-5 text-sm">
              <div>
                <p className="font-semibold">{a.label} {a.isDefault && <span className="ml-1 rounded bg-leaf/15 px-1.5 py-0.5 text-[11px] text-farm-800">Default</span>}</p>
                <p className="mt-1 text-muted">{a.line1}, {a.area}, {a.city}, {a.state} – {a.pincode}</p>
              </div>
              <button aria-label="Delete address" onClick={() => dispatch(deleteAddress(a._id))} className="h-fit rounded-full p-2 text-muted hover:bg-red-50 hover:text-red-600"><LuTrash2 className="h-4 w-4" /></button>
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={save} className="card grid gap-4 p-6 sm:grid-cols-2">
        <h2 className="font-display text-lg font-bold sm:col-span-2">Add an address</h2>
        <div><label htmlFor="al" className="label">Label</label><input id="al" className="input" value={form.label} onChange={set("label")} /></div>
        <div><label htmlFor="apin" className="label">PIN code</label><input id="apin" inputMode="numeric" maxLength={6} className="input" value={form.pincode} onChange={set("pincode")} /></div>
        <div className="sm:col-span-2"><label htmlFor="a1" className="label">House / flat, street</label><input id="a1" className="input" value={form.line1} onChange={set("line1")} /></div>
        <div><label htmlFor="aa" className="label">Area / locality</label><input id="aa" className="input" value={form.area} onChange={set("area")} /></div>
        <div><label htmlFor="ac" className="label">City</label><input id="ac" className="input" value={form.city} onChange={set("city")} /></div>
        <label className="flex items-center gap-2 text-sm sm:col-span-2"><input type="checkbox" checked={form.isDefault} onChange={set("isDefault")} className="accent-farm-800" /> Make this my default address</label>
        {err && <p className="text-sm text-red-700 sm:col-span-2">{err}</p>}
        <button className="btn-primary w-fit">Save address</button>
      </form>
    </div>
  );
}
