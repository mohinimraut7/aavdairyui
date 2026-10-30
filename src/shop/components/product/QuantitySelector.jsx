import { LuMinus, LuPlus } from "react-icons/lu";

export default function QuantitySelector({ value, onChange, min = 1, max = 20, size = "md", label = "Quantity" }) {
  const h = size === "sm" ? "h-9" : "h-11";
  const btn = `grid ${size === "sm" ? "w-8" : "w-10"} place-items-center text-ink transition hover:text-farm-800 disabled:opacity-30`;
  return (
    <div className={`inline-flex ${h} items-center rounded-lg border border-line bg-white`} role="group" aria-label={label}>
      <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="Decrease quantity">
        <LuMinus className="h-4 w-4" />
      </button>
      <span className="min-w-8 text-center text-sm font-semibold tabular-nums" aria-live="polite">{value}</span>
      <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= max} aria-label="Increase quantity">
        <LuPlus className="h-4 w-4" />
      </button>
    </div>
  );
}
