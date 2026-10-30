import { Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PageHeader from "../components/common/PageHeader";
import { SITE } from "../config/site";
import { selectStoreConfig } from "../redux/slices/productSlice";
import { formatINR } from "../utils/currency";
import usePageTitle from "../hooks/usePageTitle";

// Starter policy text — review with the business before launch.
const build = (cfg) => ({
  privacy: {
    title: "Privacy Policy",
    body: [
      "We collect only what we need to deliver your order: your name, mobile number, optional email and delivery address.",
      "Your details are used to process orders, contact you about deliveries and provide customer support. We do not sell your personal data.",
      "Online payments are processed by Razorpay. We never see or store your card number or CVV.",
      `To update or delete your data, contact us at ${SITE.email}.`,
    ],
  },
  terms: {
    title: "Terms & Conditions",
    body: [
      "Prices and availability are shown on the website and may change without notice. The amount confirmed at checkout is final for that order.",
      "Orders are accepted for delivery within our service area only. We may cancel an order if a product becomes unavailable; any online payment will be refunded.",
      "Dairy products are perishable — please follow the storage instructions on each product page.",
    ],
  },
  shipping: {
    title: "Shipping Policy",
    body: [
      `We deliver across ${SITE.serviceArea}. Enter your PIN code at checkout to confirm we serve your address.`,
      `Delivery is free on orders of ${formatINR(cfg.freeDeliveryThreshold)} and above; a ${formatINR(cfg.deliveryFee)} delivery fee applies to smaller orders.`,
      `Deliveries are made in the slots shown at checkout (${(cfg.deliverySlots || []).join(", ")}).`,
    ],
  },
  refund: {
    title: "Refund Policy",
    body: [
      "If a product arrives damaged, spoiled or incorrect, please tell us on the day of delivery with a photo and we will replace or refund it.",
      "Because dairy is perishable, we cannot accept returns of opened products that were delivered in good condition.",
      "Refunds for online payments go back to the original payment method, usually within 5–7 working days.",
    ],
  },
});

export default function Policy() {
  const { type } = useParams();
  const cfg = useSelector(selectStoreConfig);
  const page = build(cfg)[type];
  usePageTitle(page?.title);
  if (!page) return <Navigate to="/" replace />;
  return (
    <>
      <PageHeader title={page.title} crumbs={[{ label: page.title }]} />
      <article className="container-x max-w-3xl space-y-4 py-12 leading-relaxed text-ink/85">
        {page.body.map((p) => <p key={p}>{p}</p>)}
        <p className="text-sm text-muted">Questions? Call {SITE.phone} or email {SITE.email}.</p>
      </article>
    </>
  );
}
