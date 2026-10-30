import { useState } from "react";
import { Link } from "react-router-dom";
import { LuShoppingCart, LuLeaf, LuBadgeCheck, LuSprout } from "react-icons/lu";
import QuantitySelector from "./QuantitySelector";
import StarRating from "./StarRating";
import useAddToCart from "./useAddToCart";
import { formatINR } from "../../utils/currency";
import { effectivePrice, isInStock, productImage } from "../../utils/product";

const HIGHLIGHT_ICONS = [LuLeaf, LuBadgeCheck, LuSprout];

// Horizontal card that mirrors the "Best Sellers" design in the reference UI.
export default function ProductCard({ product }) {
  const [qty, setQty] = useState(1);
  const add = useAddToCart();
  const inStock = isInStock(product);
  const price = effectivePrice(product);
  const onSale = price < product.price;
  const max = Math.min(20, product.stockQuantity ?? 20) || 1;

  return (
    <article className="card group flex h-full flex-col p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-lift sm:p-5">
      <div className="flex flex-1 gap-3 sm:gap-4">
        <Link
          to={`/products/${product.slug}`}
          className="relative block aspect-[4/5] w-[42%] shrink-0 overflow-hidden rounded-xl bg-cream"
        >
          <img
            src={productImage(product)}
            alt={`${product.name} ${product.packageSize}`}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.04]"
          />
          {!inStock && (
            <span className="absolute inset-x-2 bottom-2 rounded-md bg-white/95 py-1 text-center text-[11px] font-bold text-red-700">
              Out of stock
            </span>
          )}
          {onSale && inStock && (
            <span className="absolute top-2 left-2 rounded-md bg-golden px-2 py-0.5 text-[11px] font-bold text-white">Offer</span>
          )}
        </Link>

        <div className="flex min-w-0 flex-1 flex-col">
          <h3 className="font-display text-[17px] leading-snug font-bold text-ink sm:text-lg">
            <Link to={`/products/${product.slug}`} className="hover:text-farm-800">
              {product.name}
            </Link>
          </h3>
          <p className="mt-0.5 text-sm text-muted">{product.packageSize}</p>
          <div className="mt-1.5">
            <StarRating rating={product.rating} count={product.reviewCount} />
          </div>
          <p className="mt-2 font-display text-[23px] font-extrabold text-farm-800 sm:text-[25px]">
            {formatINR(price)}
            {onSale && <span className="ml-2 text-sm font-medium text-muted line-through">{formatINR(product.price)}</span>}
          </p>
          <ul className="mt-2 space-y-1">
            {(product.highlights || []).slice(0, 3).map((h, i) => {
              const Icon = HIGHLIGHT_ICONS[i % 3];
              return (
                <li key={h} className="flex items-center gap-1.5 text-[13px] text-muted">
                  <Icon className="h-3.5 w-3.5 shrink-0 text-leaf" aria-hidden />
                  <span className="truncate">{h}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 sm:gap-3">
        <QuantitySelector value={qty} onChange={setQty} max={max} label={`Quantity for ${product.name}`} />
        <button
          type="button"
          disabled={!inStock}
          onClick={() => {
            add(product, qty);
            setQty(1);
          }}
          className="btn h-11 flex-1 rounded-lg bg-farm-800 px-3 text-sm text-white hover:bg-farm-900"
        >
          <LuShoppingCart className="h-4 w-4" aria-hidden />
          {inStock ? "Add to Cart" : "Sold out"}
        </button>
      </div>
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="card flex flex-col gap-3 p-4">
      <div className="flex gap-4">
        <div className="skeleton aspect-[4/5] w-[44%]" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-4 w-3/4" />
          <div className="skeleton h-3 w-1/3" />
          <div className="skeleton mt-4 h-6 w-1/2" />
          <div className="skeleton h-3 w-2/3" />
          <div className="skeleton h-3 w-1/2" />
        </div>
      </div>
      <div className="skeleton h-11 w-full" />
    </div>
  );
}
