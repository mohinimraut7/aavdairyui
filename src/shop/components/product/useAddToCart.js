import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { pushToast } from "../../redux/slices/uiSlice";

export default function useAddToCart() {
  const dispatch = useDispatch();
  return (product, quantity = 1) => {
    dispatch(addToCart({ product, quantity }));
    dispatch(pushToast(`${quantity} × ${product.name} (${product.packageSize}) added to cart`));
  };
}
