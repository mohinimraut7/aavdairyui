import api from "./axios";

export const getBreedingRecords = (params) => api.get("/breeding", { params }).then((r) => r.data);
export const createBreedingRecord = (payload) => api.post("/breeding", payload).then((r) => r.data);
export const updateBreedingRecord = (id, payload) => api.put(`/breeding/${id}`, payload).then((r) => r.data);
export const deleteBreedingRecord = (id) => api.delete(`/breeding/${id}`).then((r) => r.data);
