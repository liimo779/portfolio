import axios from "axios";
import { getToken, clearToken } from "./adminAuth";

const adminApi = axios.create({
  baseURL: "http://localhost:5001/api/admin",
});

adminApi.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearToken();
    }
    return Promise.reject(error);
  }
);

export default adminApi;
