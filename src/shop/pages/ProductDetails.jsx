import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LuShoppingCart, LuHeart, LuCheck, LuMapPin, LuThermometer, LuPackage, LuTruck } from "react-icons/lu";
import PageHeader from "../components/common/PageHeader";
import QuantitySelector from "../components/product/QuantitySelector";
import StarRating from "../components/product/StarRating";
import ProductGrid from "../components/product/ProductGrid";
import SectionTitle from "../components/common/SectionTitle";
import EmptyState from "../components/common/EmptyState";
import Loader from "../components/common/Loader";
import useAddToCart from "../components/product/useAddToCart";
import { categoryName } from "../data/catalog";
import { formatINR } from "../utils/currency";
import { effectivePrice, isInStock, productId, productImage } from "../utils/product";
import { isServiceablePincode, isValidPincode } from "../utils/validation";
import { selectStoreConfig } from "../redux/slices/productSlice";
import { toggleWishlist } from "../redux/slices/wishlistSlice";
import usePageTitle from "../hooks/usePageTitle";

function DeliveryCheck() {
  const config = useSelector(selectStoreConfig);
  const [pin, setPin] = useState("");
  const [result, setResult] = useState(null);
  const check = (e) => {
    e.preventDefault();
    if (!isValidPincode(pin)) return setResult({ ok: false, msg: "Enter a valid 6-digit PIN code." });
    setResult(
      isServiceablePincode(pin, config.serviceablePincodePrefixes)
        ? { ok: true, msg: `Great — we deliver to ${pin}.` }
        : { ok: false, msg: `Sorry, we don’t deliver to ${pin} yet.` }
    );
  };
  return (
    <form onSubmit={check} className="rounded-xl border border-line p-4">
      <label htmlFor="pin" className="flex items-center gap-2 text-sm font-semibold text-ink">
        <LuMapPin className="h-4 w-4 text-leaf" aria-hidden /> Check delivery
      </label>
      <div className="mt-2 flex gap-2">
        <input id="pin" inputMode="numeric" maxLength={6} value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))} placeholder="Enter PIN code" className="input py-2.5" />
        <button className="btn-outline btn-sm shrink-0">Check</button>
      </div>
      {result && <p className={`mt-2 text-sm ${result.ok ? "text-leaf" : "text-red-700"}`}>{result.msg}</p>}
    </form>
  );
}

export default function ProductDetails() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { items, status } = useSelector((s) => s.product);
  const wishlist = useSelector((s) => s.wishlist.ids);
  const add = useAddToCart();
  const [qty, setQty] = useState(1);

  const product = items.find((p) => p.slug === slug);
  const related = useMemo(
    () => (product ? items.filter((p) => p.category === product.category && p.slug !== slug).slice(0, 4) : []),
    [items, product, slug]
  );
  const variants = useMemo(
    () => (product ? items.filter((p) => p.name === product.name && p.isActive !== false) : []),
    [items, product]
  );

  usePageTitle(product ? `${product.name} ${product.packageSize}` : "Product", product?.description);

  if (status === "idle" || status === "loading") return <Loader full />;
  if (!product)
    return (
      <div className="container-x py-16">
        <EmptyState title="Product not found" text="This product may have been removed or renamed." actionLabel="Browse products" actionTo="/products" />
      </div>
    );

  const price = effectivePrice(product);
  const inStock = isInStock(product);
  const wished = wishlist.includes(productId(product));

  return (
    <>
      <PageHeader
        title={product.name}
        crumbs={[{ label: "Products", to: "/products" }, { label: categoryName(product.category), to: `/products?category=${product.category}` }, { label: product.name }]}
      />
      <div className="container-x grid gap-10 py-10 lg:grid-cols-[minmax(0,460px)_1fr] lg:gap-14">
        <div className="card overflow-hidden p-3">
          <img src={productImage(product)} alt={`${product.name} ${product.packageSize}`} className="aspect-square w-full rounded-xl object-cover" />
        </div>

        <div>
          <p className="eyebrow">{categoryName(product.category)}</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-farm-900">{product.name}</h2>
          <div className="mt-2"><StarRating rating={product.rating} count={product.reviewCount} /></div>
          <p className="mt-4 font-display text-3xl font-extrabold text-farm-900">
            {formatINR(price)}
            {price < product.price && <span className="ml-3 text-lg font-medium text-muted line-through">{formatINR(product.price)}</span>}
            <span className="ml-2 text-sm font-medium text-muted">/ {product.packageSize}</span>
          </p>
          <p className={`mt-2 text-sm font-semibold ${inStock ? "text-leaf" : "text-red-700"}`}>
            {inStock ? (product.stockQuantity <= 5 ? `Only ${product.stockQuantity} left` : "In stock") : "Out of stock"}
          </p>

          {variants.length > 1 && (
            <div className="mt-5">
              <p className="label">Pack size</p>
              <div className="flex flex-wrap gap-2">
                {variants.map((v) => (
                  <Link
                    key={v.slug}
                    to={`/products/${v.slug}`}
                    className={`rounded-lg border px-4 py-2 text-sm font-semibold ${v.slug === slug ? "border-farm-800 bg-farm-800 text-white" : "border-line bg-white hover:border-farm-800"}`}
                  >
                    {v.packageSize} · {formatINR(effectivePrice(v))}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <p className="mt-5 leading-relaxed text-ink/85">{product.description}</p>

          {product.highlights?.length > 0 && (
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {product.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-sm"><LuCheck className="h-4 w-4 text-leaf" aria-hidden /> {h}</li>
              ))}
            </ul>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <QuantitySelector value={qty} onChange={setQty} max={Math.min(20, product.stockQuantity ?? 20) || 1} />
            <button className="btn-primary h-11 flex-1 sm:flex-none" disabled={!inStock} onClick={() => { add(product, qty); setQty(1); }}>
              <LuShoppingCart className="h-5 w-5" aria-hidden /> {inStock ? "Add to Cart" : "Sold out"}
            </button>
            <button
              onClick={() => dispatch(toggleWishlist(productId(product)))}
              aria-pressed={wished}
              aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
              className={`grid h-11 w-11 place-items-center rounded-full border ${wished ? "border-red-200 bg-red-50 text-red-600" : "border-line bg-white text-ink hover:text-red-600"}`}
            >
              <LuHeart className={`h-5 w-5 ${wished ? "fill-current" : ""}`} />
            </button>
          </div>

          <div className="mt-6 space-y-3">
            <DeliveryCheck />
            <dl className="grid gap-3 text-sm sm:grid-cols-3">
              {product.ingredients && (
                <div className="rounded-xl bg-cream p-3"><dt className="flex items-center gap-1.5 font-semibold"><LuPackage className="h-4 w-4 text-leaf" aria-hidden /> Ingredients</dt><dd className="mt-1 text-muted">{product.ingredients}</dd></div>
              )}
              {product.storage && (
                <div className="rounded-xl bg-cream p-3"><dt className="flex items-center gap-1.5 font-semibold"><LuThermometer className="h-4 w-4 text-leaf" aria-hidden /> Storage</dt><dd className="mt-1 text-muted">{product.storage}</dd></div>
              )}
              <div className="rounded-xl bg-cream p-3"><dt className="flex items-center gap-1.5 font-semibold"><LuTruck className="h-4 w-4 text-leaf" aria-hidden /> Delivery</dt><dd className="mt-1 text-muted">Morning &amp; evening slots</dd></div>
            </dl>
            {product.sku && <p className="text-xs text-muted">SKU: {product.sku}</p>}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="container-x pb-6">
          <SectionTitle title="You may also like" />
          <ProductGrid products={related} />
        </section>
      )}
    </>
  );
}
