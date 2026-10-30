import ProductCard, { ProductCardSkeleton } from "./ProductCard";

export default function ProductGrid({ products, loading = false, skeletons = 8 }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
      {loading
        ? Array.from({ length: skeletons }, (_, i) => <ProductCardSkeleton key={i} />)
        : products.map((p) => <ProductCard key={p._id || p.slug} product={p} />)}
    </div>
  );
}
