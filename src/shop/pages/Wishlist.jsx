import { useSelector } from "react-redux";
import { LuHeart } from "react-icons/lu";
import PageHeader from "../components/common/PageHeader";
import ProductGrid from "../components/product/ProductGrid";
import EmptyState from "../components/common/EmptyState";
import { productId } from "../utils/product";
import usePageTitle from "../hooks/usePageTitle";

export default function Wishlist() {
  usePageTitle("Wishlist");
  const ids = useSelector((s) => s.wishlist.ids);
  const products = useSelector((s) => s.product.items).filter((p) => ids.includes(productId(p)));
  return (
    <>
      <PageHeader title="Wishlist" crumbs={[{ label: "Wishlist" }]} />
      <div className="container-x py-10">
        {products.length ? <ProductGrid products={products} /> : <EmptyState icon={LuHeart} title="Your wishlist is empty" text="Tap the heart on any product to save it here." actionLabel="Browse products" actionTo="/products" />}
      </div>
    </>
  );
}
