import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import PageHeader from "../components/common/PageHeader";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import EmptyState from "../components/common/EmptyState";
import { clearCart, selectCartItems } from "../redux/slices/cartSlice";
import usePageTitle from "../hooks/usePageTitle";

export default function Cart() {
  usePageTitle("Your Cart");
  const items = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blocked = items.some((i) => i.unavailable);

  return (
    <>
      <PageHeader title="Your Cart" crumbs={[{ label: "Cart" }]} />
      <div className="container-x py-10">
        {items.length === 0 ? (
          <EmptyState title="Your cart is empty" text="Add some farm-fresh milk, paneer or ghee to get started." actionLabel="Shop products" actionTo="/products" />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <section className="card px-5 sm:px-6">
              <div className="flex items-center justify-between border-b border-line py-4">
                <h2 className="font-display font-bold">{items.length} item{items.length > 1 ? "s" : ""}</h2>
                <button onClick={() => dispatch(clearCart())} className="text-sm text-muted underline hover:text-red-600">Clear cart</button>
              </div>
              <ul className="divide-y divide-line">
                {items.map((i) => <CartItem key={i.id} item={i} />)}
              </ul>
            </section>
            <CartSummary>
              <button className="btn-primary w-full" disabled={blocked} onClick={() => navigate("/checkout")}>
                Proceed to Checkout <LuArrowRight className="h-4 w-4" aria-hidden />
              </button>
              <Link to="/products" className="btn-outline w-full">
                <LuArrowLeft className="h-4 w-4" aria-hidden /> Continue Shopping
              </Link>
            </CartSummary>
          </div>
        )}
      </div>
    </>
  );
}
