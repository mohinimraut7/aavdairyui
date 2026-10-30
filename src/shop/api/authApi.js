import api from "./axios";

// Register / login go through the common /api/auth endpoints from the Login & Register pages.
export const meApi = () => api.get("/shop/auth/me").then((r) => r.data.data);
export const updateProfileApi = (body) => api.put("/shop/auth/me", body).then((r) => r.data.data);
export const saveAddressApi = (body) => api.post("/shop/auth/addresses", body).then((r) => r.data.data);
export const deleteAddressApi = (id) => api.delete(`/shop/auth/addresses/${id}`).then((r) => r.data.data);
