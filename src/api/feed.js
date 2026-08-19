import api from "./axios";

export const getFeedStock = () => api.get("/feed/stock").then((r) => r.data);
export const getFeedStockSummary = () => api.get("/feed/stock/summary").then((r) => r.data);
export const createFeedStock = (payload) => api.post("/feed/stock", payload).then((r) => r.data);
export const updateFeedStock = (id, payload) => api.put(`/feed/stock/${id}`, payload).then((r) => r.data);
export const deleteFeedStock = (id) => api.delete(`/feed/stock/${id}`).then((r) => r.data);

export const getFeedSchedule = () => api.get("/feed/schedule").then((r) => r.data);
export const createFeedSchedule = (payload) => api.post("/feed/schedule", payload).then((r) => r.data);
export const updateFeedSchedule = (id, payload) => api.put(`/feed/schedule/${id}`, payload).then((r) => r.data);
export const deleteFeedSchedule = (id) => api.delete(`/feed/schedule/${id}`).then((r) => r.data);
