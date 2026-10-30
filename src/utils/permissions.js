// Frontend copy of the role matrix. Keep in sync with backend config/permissions.js.
// Backend is the real gate (it returns 403); this file only decides what to SHOW.

export const ROLES = {
  ADMIN: "Administrator",
  DOCTOR: "Doctor",
  CARETAKER: "Caretaker",
};

const { ADMIN, DOCTOR, CARETAKER } = ROLES;
const ALL = [ADMIN, DOCTOR, CARETAKER];

// Options shown on the Register page
// Online-store customers. Picking this role on Register/Login opens the store, not the admin panel.
export const CUSTOMER_ROLE = "customer";
export const isCustomer = (user) => user?.role === CUSTOMER_ROLE;

export const ROLE_OPTIONS = [
  { value: CUSTOMER_ROLE, label: "Customer (Online Store)" },
  { value: DOCTOR, label: "Doctor (Veterinary)" },
  { value: CARETAKER, label: "Caretaker" },
  { value: ADMIN, label: "Administrator (first setup only)" },
];

export const PERMISSIONS = {
  dashboard:   { view: ALL },
  animals:     { view: ALL,                      create: [ADMIN, CARETAKER],         update: [ADMIN, CARETAKER, DOCTOR], remove: [ADMIN] },
  breeding:    { view: ALL,                      create: [ADMIN, DOCTOR, CARETAKER], update: [ADMIN, DOCTOR],            remove: [ADMIN] },
  calves:      { view: ALL,                      create: [ADMIN, CARETAKER],         update: [ADMIN, CARETAKER, DOCTOR], remove: [ADMIN] },
  medical:     { view: ALL,                      create: [ADMIN, DOCTOR],            update: [ADMIN, DOCTOR],            remove: [ADMIN] },
  vaccination: { view: ALL,                      create: [ADMIN, DOCTOR],            update: [ADMIN, DOCTOR],            remove: [ADMIN] },
  milk:        { view: [ADMIN, CARETAKER],       create: [ADMIN, CARETAKER],         update: [ADMIN, CARETAKER],         remove: [ADMIN] },
  feed:        { view: [ADMIN, CARETAKER],       create: [ADMIN, CARETAKER],         update: [ADMIN, CARETAKER],         remove: [ADMIN] },
  breeds:      { view: [ADMIN],                  create: [ADMIN],                    update: [ADMIN],                    remove: [ADMIN] },
  diseases:    { view: [ADMIN, DOCTOR],          create: [ADMIN, DOCTOR],            update: [ADMIN, DOCTOR],            remove: [ADMIN] },
  medicines:   { view: [ADMIN, DOCTOR],          create: [ADMIN, DOCTOR],            update: [ADMIN, DOCTOR],            remove: [ADMIN] },
  suppliers:   { view: [ADMIN],                  create: [ADMIN],                    update: [ADMIN],                    remove: [ADMIN] },
  reports:     { view: [ADMIN] },
  store:       { view: [ADMIN],                  create: [ADMIN],                    update: [ADMIN],                    remove: [ADMIN] },
};

export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem("avv_user") || "null");
  } catch {
    return null;
  }
};

export const getRole = () => getCurrentUser()?.role || null;

export const can = (module, action = "view", role = getRole()) => {
  if (!role) return false;
  return PERMISSIONS[module]?.[action]?.includes(role) || false;
};