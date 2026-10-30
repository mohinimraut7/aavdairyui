import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../redux/slices/authSlice";
import cartReducer from "../redux/slices/cartSlice";
import orderReducer from "../redux/slices/orderSlice";
import productReducer from "../redux/slices/productSlice";
import uiReducer from "../redux/slices/uiSlice";
import wishlistReducer from "../redux/slices/wishlistSlice";

const PERSIST_KEY = "aav_shop_state_v1";

const loadPersisted = () => {
  try {
    return JSON.parse(localStorage.getItem(PERSIST_KEY)) || undefined;
  } catch {
    return undefined;
  }
};

const persisted = loadPersisted();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    product: productReducer,
    ui: uiReducer,
    wishlist: wishlistReducer,
  },
  preloadedState: persisted && {
    cart: persisted.cart,
    wishlist: persisted.wishlist,
  },
  devTools: import.meta.env.DEV,
});

// Persist the guest cart + wishlist so returning customers keep them.
let last;
store.subscribe(() => {
  const { cart, wishlist } = store.getState();
  if (last && last.cart === cart && last.wishlist === wishlist) return;
  last = { cart, wishlist };
  try {
    localStorage.setItem(PERSIST_KEY, JSON.stringify({ cart, wishlist }));
  } catch {
    /* storage full / private mode — cart just won't persist */
  }
});
