import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProductsApi, fetchStoreConfigApi } from "../../api/productApi";
import { isNetworkError } from "../../api/axios";
import { LOCAL_PRODUCTS } from "../../data/catalog";
import { DEFAULT_STORE_CONFIG } from "../../config/site";

// Products come from the API. If the server can't be reached at all we fall
// back to the bundled starter catalogue so the storefront still renders
// (ordering stays disabled until the server is back — see `source`).
export const fetchProducts = createAsyncThunk("product/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const data = await fetchProductsApi();
    return { items: data, source: "api" };
  } catch (err) {
    if (isNetworkError(err)) return { items: LOCAL_PRODUCTS, source: "local" };
    return rejectWithValue(err.response?.data?.message || "Could not load products");
  }
});

export const fetchStoreConfig = createAsyncThunk("product/config", async () => {
  try {
    return await fetchStoreConfigApi();
  } catch {
    return null;
  }
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    items: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
    source: null, // "api" | "local"
    config: DEFAULT_STORE_CONFIG,
  },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchProducts.pending, (s) => {
      s.status = "loading";
      s.error = null;
    })
      .addCase(fetchProducts.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.items = a.payload.items;
        s.source = a.payload.source;
      })
      .addCase(fetchProducts.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.payload || "Could not load products";
      })
      .addCase(fetchStoreConfig.fulfilled, (s, a) => {
        if (a.payload) s.config = { ...DEFAULT_STORE_CONFIG, ...a.payload };
      });
  },
});

export const selectProducts = (s) => s.product.items;
export const selectFeatured = (s) => {
  const featured = s.product.items.filter((p) => p.isFeatured);
  return (featured.length ? featured : s.product.items).slice(0, 4);
};
export const selectStoreConfig = (s) => s.product.config;

export default productSlice.reducer;
