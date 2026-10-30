import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LuSearch } from "react-icons/lu";
import { selectProducts } from "../../redux/slices/productSlice";
import { matchProduct, productImage } from "../../utils/product";
import { formatINR } from "../../utils/currency";

export default function SearchBox({ className = "", onDone }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const products = useSelector(selectProducts);
  const navigate = useNavigate();
  const blurTimer = useRef();

  const results = useMemo(() => (q.trim() ? products.filter((p) => matchProduct(p, q)).slice(0, 5) : []), [q, products]);

  const go = (path) => {
    setOpen(false);
    setQ("");
    onDone?.();
    navigate(path);
  };

  const submit = (e) => {
    e.preventDefault();
    go(q.trim() ? `/products?q=${encodeURIComponent(q.trim())}` : "/products");
  };

  return (
    <form role="search" onSubmit={submit} className={`relative ${className}`}>
      <label htmlFor="site-search" className="sr-only">Search products</label>
      <LuSearch className="pointer-events-none absolute top-1/2 left-4 h-[18px] w-[18px] -translate-y-1/2 text-ink" aria-hidden />
      <input
        id="site-search"
        type="search"
        value={q}
        autoComplete="off"
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => (blurTimer.current = setTimeout(() => setOpen(false), 150))}
        placeholder="Search milk, paneer, ghee..."
        className="h-11 w-full rounded-full border border-line bg-white pr-4 pl-11 text-sm outline-none transition focus:border-leaf focus:ring-2 focus:ring-leaf/20"
      />
      {open && q.trim() && (
        <div className="absolute top-full right-0 left-0 z-50 mt-2 overflow-hidden rounded-2xl border border-line bg-white shadow-lift">
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-muted">No products match “{q}”.</p>
          ) : (
            <ul>
              {results.map((p) => (
                <li key={p._id || p.slug}>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => go(`/products/${p.slug}`)}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-cream"
                  >
                    <img src={productImage(p)} alt="" className="h-10 w-10 rounded-lg object-cover" />
                    <span className="flex-1">
                      <span className="block text-sm font-semibold text-ink">{p.name}</span>
                      <span className="text-xs text-muted">{p.packageSize}</span>
                    </span>
                    <span className="text-sm font-bold text-farm-800">{formatINR(p.salePrice || p.price)}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </form>
  );
}
