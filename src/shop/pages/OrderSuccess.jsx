import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { LuCircleCheck } from "react-icons/lu";
import { formatINR } from "../utils/currency";
import { selectIsLoggedIn } from "../redux/slices/authSlice";
import usePageTitle from "../hooks/usePageTitle";

export default function OrderSuccess() {
  usePageTitle("Order placed");
  const { orderNumber } = useParams();
  const { state } = useLocation();
  const order = state?.order;
  const loggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className="container-x py-16">
      <div className="card mx-auto max-w-xl p-8 text-center sm:p-10">
        <LuCircleCheck className="mx-auto h-16 w-16 text-leaf" aria-hidden />
        <h1 className="mt-4 font-display text-2xl font-extrabold text-farm-900 sm:text-3xl">Thank you! Your order is placed.</h1>
        <p className="mt-2 text-muted">Order number <span className="font-bold text-ink">{orderNumber}</span></p>
        {order && (
          <dl className="mx-auto mt-6 max-w-xs space-y-2 text-left text-sm">
            <div className="flex justify-between"><dt className="text-muted">Amount</dt><dd className="font-bold">{formatINR(order.totalAmount)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Payment</dt><dd className="font-semibold">{order.paymentMethod === "cod" ? "Cash on Delivery" : "Online"}</dd></div>
            {order.deliverySlot && <div className="flex justify-between"><dt className="text-muted">Slot</dt><dd className="font-semibold">{order.deliverySlot}</dd></div>}
          </dl>
        )}
        <p className="mt-6 text-sm text-muted">We’ll call you on your mobile number if we need anything before delivery.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {loggedIn && <Link to="/account/orders" className="btn-outline">My Orders</Link>}
          <Link to="/products" className="btn-primary">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}
