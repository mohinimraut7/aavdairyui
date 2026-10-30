import { useId, useState } from "react";
import { useSelector } from "react-redux";
import { LuMinus, LuPlus } from "react-icons/lu";
import SectionTitle from "../common/SectionTitle";
import { selectStoreConfig } from "../../redux/slices/productSlice";
import { formatINR } from "../../utils/currency";
import { SITE } from "../../config/site";

// Answers are built from the live store settings (admin panel → Store Settings),
// so delivery and payment rules shown here always match what checkout enforces.
function FaqItem({ q, a, open, onToggle }) {
  const id = useId();
  return (
    <div className="rounded-2xl border border-line bg-white">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-btn`}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 rounded-2xl px-6 py-5 text-left font-display text-base font-semibold text-ink"
        >
          {q}
          <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors ${open ? "bg-farm-800 text-white" : "bg-leaf-soft text-farm-800"}`} aria-hidden>
            {open ? <LuMinus className="h-4 w-4" /> : <LuPlus className="h-4 w-4" />}
          </span>
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-btn`}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden" inert={open ? undefined : ""}>
          <p className="px-6 pb-5 text-[15px] leading-relaxed text-muted">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const config = useSelector(selectStoreConfig);
  const [open, setOpen] = useState(0);
  const payWays = [config.codEnabled && "cash on delivery", config.onlinePaymentEnabled && "online (UPI, cards or net banking via Razorpay)"].filter(Boolean);
  const items = [
    {
      q: "Which areas do you deliver to?",
      a: `We currently deliver across ${SITE.serviceArea}. Enter your PIN code on any product page or at checkout to confirm delivery to your address.`,
    },
    {
      q: "Is there a delivery charge?",
      a: `Delivery is free on orders of ${formatINR(config.freeDeliveryThreshold)} and above. Smaller orders have a delivery fee of ${formatINR(config.deliveryFee)}.`,
    },
    {
      q: "How can I pay?",
      a: payWays.length ? `You can pay ${payWays.join(" or ")}.` : "Payment options will be confirmed when you place your order.",
    },
    {
      q: "How should I store the products?",
      a: "Keep milk, paneer, cheese and curd refrigerated. Store ghee in a cool, dry place and always use a dry spoon. Each product page lists its own storage instructions.",
    },
  ];
  return (
    <section className="container-x py-16 lg:py-[72px]">
      <SectionTitle center eyebrow="Questions" title="Frequently Asked Questions" />
      <div className="mx-auto max-w-[760px] space-y-3">
        {items.map((f, i) => (
          <FaqItem key={f.q} {...f} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
        ))}
      </div>
    </section>
  );
}
