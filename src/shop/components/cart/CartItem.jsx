import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LuTrash2 } from "react-icons/lu";
import QuantitySelector from "../product/QuantitySelector";
import { removeFromCart, setQuantity } from "../../redux/slices/cartSlice";
import { formatINR } from "../../utils/currency";

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  const max = Math.min(20, item.stockQuantity ?? 20) || 1;
  return (
    <li className="flex gap-4 py-5">
      <Link to={`/products/${item.slug}`} className="shrink-0">
        <img src={item.image} alt={item.name} className="h-24 w-24 rounded-xl border border-line object-cover sm:h-28 sm:w-28" />
      </Link>
      <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link to={`/products/${item.slug}`} className="font-display font-bold text-ink hover:text-farm-800">{item.name}</Link>
          <p className="text-sm text-muted">{item.packageSize} · {formatINR(item.price)} each</p>
          {item.unavailable && <p className="mt-1 text-xs font-semibold text-red-700">Currently unavailable — remove to continue</p>}
        </div>
        <div className="flex items-center justify-between gap-4 sm:justify-end">
          <QuantitySelector size="sm" value={item.quantity} max={max} onChange={(q) => dispatch(setQuantity({ id: item.id, quantity: q }))} />
          <p className="w-20 text-right font-display font-bold text-farm-900">{formatINR(item.price * item.quantity)}</p>
          <button onClick={() => dispatch(removeFromCart(item.id))} aria-label={`Remove ${item.name}`} className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-red-50 hover:text-red-600">
            <LuTrash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </li>
  );
}
