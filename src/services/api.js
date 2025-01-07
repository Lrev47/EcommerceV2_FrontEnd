// src/services/api.js
import axios from "axios";

// Create an axios instance
const api = axios.create({
  baseURL: "http://localhost:8080/api", // Adjust to your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: You can set up interceptors to attach tokens, log requests, etc.

// Request interceptor example:
api.interceptors.request.use(
  (config) => {
    // If you have a token in localStorage or Redux, attach it
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor example (for error handling, token refresh, etc.)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // e.g., handle 401 Unauthorized, 403 Forbidden, etc.
    return Promise.reject(error);
  }
);

export default api;
