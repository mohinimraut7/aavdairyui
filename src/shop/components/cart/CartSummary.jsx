import { useSelector } from "react-redux";
import { LuTruck } from "react-icons/lu";
import { selectCartSubtotal } from "../../redux/slices/cartSlice";
import { selectStoreConfig } from "../../redux/slices/productSlice";
import { calcTotals } from "../../utils/delivery";
import { formatINR } from "../../utils/currency";

export default function CartSummary({ children, title = "Order Summary" }) {
  const subtotal = useSelector(selectCartSubtotal);
  const config = useSelector(selectStoreConfig);
  const t = calcTotals(subtotal, config);
  const progress = Math.min(100, (subtotal / t.threshold) * 100);

  return (
    <aside className="card h-fit p-5 sm:p-6 lg:sticky lg:top-28">
      <h2 className="font-display text-lg font-bold text-farm-900">{title}</h2>

      <div className="mt-4 rounded-xl bg-cream p-3 text-sm">
        <p className="flex items-center gap-2 font-medium text-farm-800">
          <LuTruck className="h-4 w-4" aria-hidden />
          {t.amountForFreeDelivery > 0
            ? `Add ${formatINR(t.amountForFreeDelivery)} more for free delivery`
            : "You’ve unlocked free delivery!"}
        </p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-beige">
          <div className="h-full rounded-full bg-leaf transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted">Subtotal</dt>
          <dd className="font-semibold">{formatINR(t.subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">Delivery</dt>
          <dd className="font-semibold">{t.deliveryFee ? formatINR(t.deliveryFee) : <span className="text-leaf">FREE</span>}</dd>
        </div>
        <div className="flex justify-between border-t border-line pt-3 text-base">
          <dt className="font-display font-bold">Total</dt>
          <dd className="font-display text-xl font-extrabold text-farm-900">{formatINR(t.total)}</dd>
        </div>
      </dl>
      <p className="mt-2 text-xs text-muted">Final amount is confirmed by the farm when the order is placed.</p>
      {children && <div className="mt-5 space-y-3">{children}</div>}
    </aside>
  );
}
