import api from "./axios";

export const getAnimals = (params) => api.get("/animals", { params }).then((r) => r.data);
export const getAnimalById = (id) => api.get(`/animals/${id}`).then((r) => r.data);
export const createAnimal = (payload) => api.post("/animals", payload).then((r) => r.data);
export const updateAnimal = (id, payload) => api.put(`/animals/${id}`, payload).then((r) => r.data);
export const deleteAnimal = (id) => api.delete(`/animals/${id}`).then((r) => r.data);
