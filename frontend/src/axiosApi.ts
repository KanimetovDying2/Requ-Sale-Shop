import axios from "axios";

const axiosApi = axios.create({
  baseURL: "http://localhost:3000",
});

axiosApi.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
  } catch (e) {
    console.error("Error reading token from localStorage", e);
  }
  return config;
});

export default axiosApi;
