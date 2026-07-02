import axios from "axios";

console.log("API URL =", import.meta.env.VITE_API_URL);

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

// Request interceptor to automatically attach authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token expiration (401/403) gracefully
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      localStorage.removeItem("token");
      const currentPath = window.location.pathname;
      if (
        currentPath !== "/login" &&
        currentPath !== "/register" &&
        currentPath !== "/"
      ) {
        window.location.href = "/login?expired=true";
      }
    }
    return Promise.reject(error);
  }
);

export default api;