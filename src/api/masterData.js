import api from "./axios";

// Breeds
export const getBreeds = () => api.get("/breeds").then((r) => r.data);
export const createBreed = (payload) => api.post("/breeds", payload).then((r) => r.data);
export const updateBreed = (id, payload) => api.put(`/breeds/${id}`, payload).then((r) => r.data);
export const deleteBreed = (id) => api.delete(`/breeds/${id}`).then((r) => r.data);

// Diseases
export const getDiseases = () => api.get("/diseases").then((r) => r.data);
export const createDisease = (payload) => api.post("/diseases", payload).then((r) => r.data);
export const updateDisease = (id, payload) => api.put(`/diseases/${id}`, payload).then((r) => r.data);
export const deleteDisease = (id) => api.delete(`/diseases/${id}`).then((r) => r.data);

// Suppliers
export const getSuppliers = () => api.get("/suppliers").then((r) => r.data);
export const createSupplier = (payload) => api.post("/suppliers", payload).then((r) => r.data);
export const updateSupplier = (id, payload) => api.put(`/suppliers/${id}`, payload).then((r) => r.data);
export const deleteSupplier = (id) => api.delete(`/suppliers/${id}`).then((r) => r.data);

// Medicines
export const getMedicines = () => api.get("/medicines").then((r) => r.data);
export const createMedicine = (payload) => api.post("/medicines", payload).then((r) => r.data);
export const updateMedicine = (id, payload) => api.put(`/medicines/${id}`, payload).then((r) => r.data);
export const deleteMedicine = (id) => api.delete(`/medicines/${id}`).then((r) => r.data);
export const dispenseMedicine = (id, quantity) => api.post(`/medicines/${id}/dispense`, { quantity }).then((r) => r.data);
