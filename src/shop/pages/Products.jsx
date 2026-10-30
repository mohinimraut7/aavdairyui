import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { LuSearch } from "react-icons/lu";
import PageHeader from "../components/common/PageHeader";
import ProductFilter from "../components/product/ProductFilter";
import ProductGrid from "../components/product/ProductGrid";
import EmptyState from "../components/common/EmptyState";
import ErrorMessage from "../components/common/ErrorMessage";
import OfflineNotice from "../components/common/OfflineNotice";
import { categoryName, CATEGORIES } from "../data/catalog";
import { effectivePrice, matchProduct } from "../utils/product";
import usePageTitle from "../hooks/usePageTitle";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";

const PAGE_SIZE = 12;

const sorters = {
  featured: (a, b) => Number(b.isFeatured) - Number(a.isFeatured),
  best: (a, b) => (b.soldCount || 0) - (a.soldCount || 0),
  newest: (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
  "price-asc": (a, b) => effectivePrice(a) - effectivePrice(b),
  "price-desc": (a, b) => effectivePrice(b) - effectivePrice(a),
};

export default function Products() {
  const [params, setParams] = useSearchParams();
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((s) => s.product);
  const [page, setPage] = useState(1);

  const category = params.get("category") || "";
  const q = params.get("q") || "";
  const sort = params.get("sort") || "featured";
  const inStockOnly = params.get("stock") === "1";

  usePageTitle(category ? categoryName(category) : "All Products", "Shop farm-fresh milk, paneer, cheese, desi ghee and curd.");

  const update = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
    setPage(1);
  };

  const active = useMemo(() => items.filter((p) => p.isActive !== false), [items]);
  const counts = useMemo(() => {
    const c = { all: active.length };
    active.forEach((p) => (c[p.category] = (c[p.category] || 0) + 1));
    return c;
  }, [active]);

  const filtered = useMemo(
    () =>
      active
        .filter((p) => !category || p.category === category)
        .filter((p) => matchProduct(p, q))
        .filter((p) => !inStockOnly || p.stockQuantity > 0)
        .sort(sorters[sort] || sorters.featured),
    [active, category, q, inStockOnly, sort]
  );

  const visible = filtered.slice(0, page * PAGE_SIZE);
  const loading = status === "idle" || status === "loading";
  const cat = CATEGORIES.find((c) => c.slug === category);

  return (
    <>
      <PageHeader
        title={cat ? cat.name : "All Products"}
        subtitle={cat ? cat.subtitle : "Farm-fresh milk, paneer, cheese, desi ghee and curd — straight from our desi cattle."}
        crumbs={[{ label: "Products", to: cat ? "/products" : undefined }, ...(cat ? [{ label: cat.name }] : [])]}
      />
      <div className="container-x space-y-6 py-8">
        <OfflineNotice />
        <ProductFilter
          category={category}
          onCategory={(v) => update("category", v)}
          sort={sort}
          onSort={(v) => update("sort", v === "featured" ? "" : v)}
          inStockOnly={inStockOnly}
          onInStock={(v) => update("stock", v ? "1" : "")}
          counts={counts}
          query={q}
          onQuery={(v) => update("q", v)}
        />
        {q && (
          <p className="flex items-center gap-2 text-sm text-muted">
            <LuSearch className="h-4 w-4" aria-hidden /> {filtered.length} result{filtered.length === 1 ? "" : "s"} for “
            <span className="font-semibold text-ink">{q}</span>”
            <button className="ml-2 font-semibold text-farm-800 underline" onClick={() => update("q", "")}>Clear</button>
          </p>
        )}

        {status === "failed" ? (
          <ErrorMessage message={error} onRetry={() => dispatch(fetchProducts())} />
        ) : !loading && filtered.length === 0 ? (
          <EmptyState title="No products found" text="Try a different category or search term." actionLabel="View all products" actionTo="/products" />
        ) : (
          <ProductGrid products={visible} loading={loading} />
        )}

        {visible.length < filtered.length && (
          <div className="text-center">
            <button className="btn-outline" onClick={() => setPage((p) => p + 1)}>
              Load more products
            </button>
          </div>
        )}
      </div>
    </>
  );
}
