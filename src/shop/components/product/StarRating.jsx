import { LuStar } from "react-icons/lu";

// Only rendered when the product has genuine reviews (reviewCount > 0).
export default function StarRating({ rating = 0, count = 0 }) {
  if (!count) return null;
  return (
    <div className="flex items-center gap-1.5 text-xs text-muted" aria-label={`Rated ${rating} out of 5 from ${count} reviews`}>
      <span className="flex text-golden">
        {[1, 2, 3, 4, 5].map((i) => (
          <LuStar key={i} className={`h-3.5 w-3.5 ${i <= Math.round(rating) ? "fill-current" : ""}`} aria-hidden />
        ))}
      </span>
      {rating.toFixed(1)} ({count})
    </div>
  );
}
