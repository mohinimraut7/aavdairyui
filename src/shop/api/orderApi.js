import api from "./axios";

export const placeOrderApi = (body) => api.post("/shop/orders", body).then((r) => r.data.data);
export const myOrdersApi = () => api.get("/shop/orders/my-orders").then((r) => r.data.data);
export const orderByIdApi = (id) => api.get(`/shop/orders/${id}`).then((r) => r.data.data);
export const trackOrderApi = (orderNumber, phone) =>
  api.get(`/shop/orders/track/${orderNumber}`, { params: { phone } }).then((r) => r.data.data);
