import api from "./axios";

export const getCalves = () => api.get("/calves").then((r) => r.data);
export const getCalfById = (id) => api.get(`/calves/${id}`).then((r) => r.data);
export const createCalf = (payload) => api.post("/calves", payload).then((r) => r.data);
export const updateCalf = (id, payload) => api.put(`/calves/${id}`, payload).then((r) => r.data);
export const deleteCalf = (id) => api.delete(`/calves/${id}`).then((r) => r.data);
