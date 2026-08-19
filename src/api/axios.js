import axios from "axios";

// VITE_API_URL should be set in .env (e.g. VITE_API_URL=http://localhost:5000/api)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5007/api",
});

// Attach the JWT saved at login to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("avv_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// If the token is invalid/expired, bounce back to login
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("avv_token");
      localStorage.removeItem("avv_user");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);

export default api;
