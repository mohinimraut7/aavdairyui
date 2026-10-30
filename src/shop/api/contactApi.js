import api from "./axios";

export const sendContactApi = (body) => api.post("/shop/contact", body).then((r) => r.data);
