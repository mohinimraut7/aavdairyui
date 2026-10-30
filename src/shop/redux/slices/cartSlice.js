import { createSlice } from "@reduxjs/toolkit";
import { effectivePrice, productId, productImage } from "../../utils/product";

// Guest cart, persisted in localStorage (see app/store.js).
// Each line keeps a snapshot for display; the server re-prices on checkout.
const MAX_QTY = 20;

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addToCart: (state, { payload: { product, quantity = 1 } }) => {
      const id = productId(product);
      const existing = state.items.find((i) => i.id === id);
      const limit = Math.min(MAX_QTY, product.stockQuantity ?? MAX_QTY);
      if (existing) {
        existing.quantity = Math.min(limit, existing.quantity + quantity);
      } else {
        state.items.push({
          id,
          slug: product.slug,
          name: product.name,
          packageSize: product.packageSize,
          price: effectivePrice(product),
          image: productImage(product),
          stockQuantity: product.stockQuantity,
          quantity: Math.min(limit, quantity),
        });
      }
    },
    setQuantity: (state, { payload: { id, quantity } }) => {
      const item = state.items.find((i) => i.id === id);
      if (!item) return;
      const limit = Math.min(MAX_QTY, item.stockQuantity ?? MAX_QTY);
      item.quantity = Math.max(1, Math.min(limit, quantity));
    },
    removeFromCart: (state, { payload: id }) => {
      state.items = state.items.filter((i) => i.id !== id);
    },
    clearCart: (state) => {
      state.items = [];
    },
    // Refresh price/stock snapshots after the catalogue loads.
    syncCartWithProducts: (state, { payload: products }) => {
      state.items.forEach((item) => {
        const p = products.find((x) => productId(x) === item.id || x.slug === item.slug);
        if (p) {
          item.id = productId(p);
          item.price = effectivePrice(p);
          item.stockQuantity = p.stockQuantity;
          item.image = productImage(p);
          item.unavailable = !p.isActive || p.stockQuantity <= 0;
        }
      });
    },
  },
});

export const { addToCart, setQuantity, removeFromCart, clearCart, syncCartWithProducts } =
  cartSlice.actions;

export const selectCartItems = (s) => s.cart.items;
export const selectCartCount = (s) => s.cart.items.reduce((n, i) => n + i.quantity, 0);
export const selectCartSubtotal = (s) =>
  s.cart.items.filter((i) => !i.unavailable).reduce((n, i) => n + i.price * i.quantity, 0);

export default cartSlice.reducer;
