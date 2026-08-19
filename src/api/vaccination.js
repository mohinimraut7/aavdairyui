import api from "./axios";

export const getVaccinations = (params) => api.get("/vaccinations", { params }).then((r) => r.data);
export const getVaccinationSummary = () => api.get("/vaccinations/summary").then((r) => r.data);
export const createVaccination = (payload) => api.post("/vaccinations", payload).then((r) => r.data);
export const updateVaccination = (id, payload) => api.put(`/vaccinations/${id}`, payload).then((r) => r.data);
export const deleteVaccination = (id) => api.delete(`/vaccinations/${id}`).then((r) => r.data);
