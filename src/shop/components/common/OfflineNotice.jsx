import { useSelector } from "react-redux";
import { LuInfo } from "react-icons/lu";

// Shown when products come from the bundled fallback catalogue (API unreachable).
export default function OfflineNotice() {
  const source = useSelector((s) => s.product.source);
  if (source !== "local") return null;
  return (
    <div role="status" className="flex items-start gap-3 rounded-xl border border-golden/40 bg-golden/10 p-4 text-sm text-ink">
      <LuInfo className="mt-0.5 h-5 w-5 shrink-0 text-golden" aria-hidden />
      <p>
        We can’t reach the farm’s order server right now, so you’re seeing our standard catalogue and prices. You can
        browse and fill your cart — placing orders will work again as soon as the connection is back.
      </p>
    </div>
  );
}
