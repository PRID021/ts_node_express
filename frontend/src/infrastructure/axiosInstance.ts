import { container } from "@/di-container";
import { AuthService } from "@/services/authService";
import { TYPES } from "@/types";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Check if the request requires authentication
    if (config.requiresAuth) {
      const authService = container.get<AuthService>(TYPES.AuthService);
      const token = authService.getAccessToken(); // Adjust based on your token storage

      console.log("Token ==>", token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response.data, // Automatically return only the data part of the response
  (error) => {
    if (error.response) {
      console.error("Error Response:", error.response.data);
    } else if (error.request) {
      console.error("No Response:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
