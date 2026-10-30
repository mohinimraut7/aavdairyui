import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { ids: [] },
  reducers: {
    toggleWishlist: (s, a) => {
      s.ids = s.ids.includes(a.payload) ? s.ids.filter((i) => i !== a.payload) : [...s.ids, a.payload];
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
