import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { LuArrowRight } from "react-icons/lu";
import SectionTitle from "../common/SectionTitle";
import ProductGrid from "../product/ProductGrid";
import ErrorMessage from "../common/ErrorMessage";
import { selectFeatured } from "../../redux/slices/productSlice";

export default function BestSellers() {
  const products = useSelector(selectFeatured);
  const { status, error } = useSelector((s) => s.product);
  const loading = status === "idle" || status === "loading";

  return (
    <section aria-labelledby="best-sellers" className="container-x pb-16">
      <SectionTitle
        title={<span id="best-sellers">Best Sellers</span>}
        subtitle="Our most loved farm-fresh products"
        action={
          <Link to="/products" className="flex items-center gap-1.5 text-sm font-semibold text-farm-800 hover:text-leaf">
            View All Products <LuArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        }
      />
      {status === "failed" ? <ErrorMessage message={error} /> : <ProductGrid products={products} loading={loading} skeletons={4} />}
    </section>
  );
}
