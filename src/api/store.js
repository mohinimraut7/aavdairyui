import api from "./axios";

// Online store (customer website) — Administrator only. Backend: /api/shop/admin/*
export const getShopDashboard = () => api.get("/shop/admin/dashboard").then((r) => r.data);
export const getShopProducts = () => api.get("/shop/admin/products").then((r) => r.data);
export const createShopProduct = (payload) => api.post("/shop/admin/products", payload).then((r) => r.data);
export const updateShopProduct = (id, payload) => api.put(`/shop/admin/products/${id}`, payload).then((r) => r.data);
export const deleteShopProduct = (id, hard = false) => api.delete(`/shop/admin/products/${id}`, { params: { hard } }).then((r) => r.data);
export const getShopOrders = (params) => api.get("/shop/admin/orders", { params }).then((r) => r.data);
export const updateShopOrderStatus = (id, payload) => api.patch(`/shop/admin/orders/${id}/status`, payload).then((r) => r.data);
export const getShopSettings = () => api.get("/shop/admin/settings").then((r) => r.data);
export const updateShopSettings = (payload) => api.put("/shop/admin/settings", payload).then((r) => r.data);

// Product images saved as "/images/..." are served by this same app (public/images).
export const shopImageUrl = (src) => src || "";