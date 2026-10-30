import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { myOrdersApi, placeOrderApi } from "../../api/orderApi";
import { errorMessage } from "../../api/axios";

export const placeOrder = createAsyncThunk("order/place", async (body, { rejectWithValue }) => {
  try {
    return await placeOrderApi(body);
  } catch (e) {
    return rejectWithValue(errorMessage(e));
  }
});

export const fetchMyOrders = createAsyncThunk("order/mine", async (_, { rejectWithValue }) => {
  try {
    return await myOrdersApi();
  } catch (e) {
    return rejectWithValue(errorMessage(e));
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState: { orders: [], currentOrder: null, placing: false, loading: false, error: null },
  reducers: {
    setCurrentOrder: (s, a) => {
      s.currentOrder = a.payload;
    },
  },
  extraReducers: (b) => {
    b.addCase(placeOrder.pending, (s) => {
      s.placing = true;
      s.error = null;
    })
      .addCase(placeOrder.fulfilled, (s, a) => {
        s.placing = false;
        s.currentOrder = a.payload;
      })
      .addCase(placeOrder.rejected, (s, a) => {
        s.placing = false;
        s.error = a.payload;
      })
      .addCase(fetchMyOrders.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchMyOrders.fulfilled, (s, a) => {
        s.loading = false;
        s.orders = a.payload;
      })
      .addCase(fetchMyOrders.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      });
  },
});

export const { setCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
