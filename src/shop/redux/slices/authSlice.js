import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { meApi, updateProfileApi, saveAddressApi, deleteAddressApi } from "../../api/authApi";
import { clearSession, errorMessage, getCustomerToken, getStoredUser } from "../../api/axios";

// Login / register happen on the shared Login & Register pages (role "customer").
// This slice only reads that session and manages the customer's profile.

export const loadMe = createAsyncThunk("auth/me", async (_, { rejectWithValue }) => {
  try {
    return await meApi();
  } catch (e) {
    return rejectWithValue(e.response?.status || 0);
  }
});

export const updateProfile = createAsyncThunk("auth/update", async (body, { rejectWithValue }) => {
  try {
    return await updateProfileApi(body);
  } catch (e) {
    return rejectWithValue(errorMessage(e));
  }
});

export const saveAddress = createAsyncThunk("auth/saveAddress", async (body, { rejectWithValue }) => {
  try {
    return await saveAddressApi(body);
  } catch (e) {
    return rejectWithValue(errorMessage(e));
  }
});

export const deleteAddress = createAsyncThunk("auth/deleteAddress", async (id, { rejectWithValue }) => {
  try {
    return await deleteAddressApi(id);
  } catch (e) {
    return rejectWithValue(errorMessage(e));
  }
});

const stored = getStoredUser();

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: getCustomerToken(),
    // role of whoever is logged in on this browser ("customer", "Doctor", …) — used for header links
    role: stored?.role || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (s) => {
      s.user = null;
      s.token = null;
      s.role = null;
      clearSession();
    },
  },
  extraReducers: (b) => {
    b.addCase(loadMe.fulfilled, (s, a) => {
      s.user = a.payload;
    }).addCase(loadMe.rejected, (s, a) => {
      if (a.payload === 401) {
        s.user = null;
        s.token = null;
        s.role = null;
        clearSession();
      }
    });
    b.addCase(updateProfile.fulfilled, (s, a) => {
      s.user = a.payload;
    });
    b.addCase(saveAddress.fulfilled, (s, a) => {
      if (s.user) s.user.addresses = a.payload;
    });
    b.addCase(deleteAddress.fulfilled, (s, a) => {
      if (s.user) s.user.addresses = a.payload;
    });
  },
});

export const { logout } = authSlice.actions;
export const selectUser = (s) => s.auth.user;
export const selectIsLoggedIn = (s) => Boolean(s.auth.token);
// Where the header account icon should go for the current session.
export const selectAccountLink = (s) =>
  s.auth.token ? "/account" : s.auth.role && s.auth.role !== "customer" ? "/dashboard" : "/login";

export default authSlice.reducer;
