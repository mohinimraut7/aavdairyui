import api from "./axios";

export const fetchProductsApi = () => api.get("/shop/products").then((r) => r.data.data);
export const fetchProductApi = (slug) => api.get(`/shop/products/${slug}`).then((r) => r.data.data);
export const fetchStoreConfigApi = () => api.get("/shop/config").then((r) => r.data.data);
