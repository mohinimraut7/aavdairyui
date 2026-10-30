import { createSlice, nanoid } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { mobileMenuOpen: false, toasts: [] },
  reducers: {
    setMobileMenu: (s, a) => {
      s.mobileMenuOpen = a.payload;
    },
    pushToast: {
      reducer: (s, a) => {
        s.toasts.push(a.payload);
      },
      prepare: (message, type = "success") => ({ payload: { id: nanoid(), message, type } }),
    },
    dismissToast: (s, a) => {
      s.toasts = s.toasts.filter((t) => t.id !== a.payload);
    },
  },
});

export const { setMobileMenu, pushToast, dismissToast } = uiSlice.actions;
export default uiSlice.reducer;
