import axios from "axios";
import { useAuthStore } from "@/store/auth.store";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://192.168.5.146:8000/api/0/";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

// 🔐 Attach token
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ❌ Handle 401 globally
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      // logout / refresh token / redirect
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);
