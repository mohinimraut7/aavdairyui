import axios from "axios";
import { API_BASE_URL } from "../config/site";

// Shared with the admin panel: one login for everyone (see pages/Auth/Login.jsx).
export const TOKEN_KEY = "avv_token";
export const USER_KEY = "avv_user";

export const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || "null");
  } catch {
    return null;
  }
};

// Only a "customer" session counts as logged in on the store. Staff sessions are left
// untouched so a Doctor/Caretaker/Administrator browsing the store stays logged in to the admin panel.
export const getCustomerToken = () =>
  getStoredUser()?.role === "customer" ? localStorage.getItem(TOKEN_KEY) : null;

export const clearSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

const api = axios.create({ baseURL: API_BASE_URL, timeout: 15000 });

api.interceptors.request.use((config) => {
  const token = getCustomerToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Turn any axios error into a friendly message the UI can show.
export const errorMessage = (err, fallback = "Something went wrong. Please try again.") => {
  if (err?.response?.data?.message) return err.response.data.message;
  if (err?.code === "ERR_NETWORK" || err?.code === "ECONNABORTED")
    return "Cannot reach the AAV Dairy server right now. Please check your connection and try again.";
  return err?.message || fallback;
};

export const isNetworkError = (err) => !err?.response;

export default api;
