import api from "./axios";

export const getMilkRecords = (params) => api.get("/milk", { params }).then((r) => r.data);
export const getMilkSummary = () => api.get("/milk/summary").then((r) => r.data);
export const getMilkChart = (range) => api.get("/milk/chart", { params: { range } }).then((r) => r.data);
export const createMilkRecord = (payload) => api.post("/milk", payload).then((r) => r.data);
export const updateMilkRecord = (id, payload) => api.put(`/milk/${id}`, payload).then((r) => r.data);
export const deleteMilkRecord = (id) => api.delete(`/milk/${id}`).then((r) => r.data);
