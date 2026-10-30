import api from "./axios";

export const createPaymentOrderApi = (orderId) =>
  api.post("/shop/payments/create-order", { orderId }).then((r) => r.data.data);
export const verifyPaymentApi = (body) => api.post("/shop/payments/verify", body).then((r) => r.data.data);

// Loads Razorpay Checkout on demand (only when the customer picks online payment).
export const loadRazorpay = () =>
  new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
