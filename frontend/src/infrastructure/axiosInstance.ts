import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL;

const axiosInstance = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response.data, // Automatically return only the data part of the response
  (error) => {
    // Enhance the error object with a direct `message` property
    // if (error.response) {
    //   console.error("Error Response:", error.response.data);
    //   error.message =
    //     error.response.data?.message || "An error occurred with the response.";
    // } else if (error.request) {
    //   console.error("No Response:", error.request);
    //   error.message = "No response received from the server.";
    // } else {
    //   console.error("Error:", error.message);
    // }
    return Promise.reject(error);
  }
);

export default axiosInstance;
