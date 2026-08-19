import api from "./axios";

export const getMedicalRecords = (params) => api.get("/medical", { params }).then((r) => r.data);
export const createMedicalRecord = (payload) => api.post("/medical", payload).then((r) => r.data);
export const updateMedicalRecord = (id, payload) => api.put(`/medical/${id}`, payload).then((r) => r.data);
export const deleteMedicalRecord = (id) => api.delete(`/medical/${id}`).then((r) => r.data);
