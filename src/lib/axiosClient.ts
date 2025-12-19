// src/lib/axiosClient.ts

import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { API_BASE_URL } from "@/core/config/api";
import { useAuthStore } from "@/store/auth.store";

/* ------------------------------------------------------------------ */
/* 🔧 Types */
/* ------------------------------------------------------------------ */

interface FailedRequest {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}

interface RefreshResponse {
  access: string;
  refresh?: string;
}

/* ------------------------------------------------------------------ */
/* 🔄 Refresh State */
/* ------------------------------------------------------------------ */

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error?: unknown, token?: string) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error || !token) reject(error);
    else resolve(token);
  });
  failedQueue = [];
};

/* ------------------------------------------------------------------ */
/* 🌐 Axios Instance */
/* ------------------------------------------------------------------ */

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15_000,
});

/* ------------------------------------------------------------------ */
/* 🔐 Request Interceptor – Attach Token */
/* ------------------------------------------------------------------ */

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { accessToken } = useAuthStore.getState();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ------------------------------------------------------------------ */
/* 🚨 Response Interceptor – Handle 401 + Refresh */
/* ------------------------------------------------------------------ */

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // ❌ Not 401 → reject
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // ❌ Prevent infinite loop (refresh endpoint)
    if (originalRequest.url?.includes("refresh")) {
      useAuthStore.getState().clearAuth();
      return Promise.reject(error);
    }

    // ❌ Already retried
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const store = useAuthStore.getState();
    const refreshToken = store.refreshToken;

    // ❌ No refresh token → logout
    if (!refreshToken) {
      store.clearAuth();
      return Promise.reject(error);
    }

    /* ---------------- Queue requests while refreshing ---------------- */

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token) => {
            originalRequest.headers = {
              ...originalRequest.headers,
              Authorization: `Bearer ${token}`,
            };
            resolve(apiClient(originalRequest));
          },
          reject,
        });
      });
    }

    /* ---------------- Refresh Token ---------------- */

    isRefreshing = true;

    try {
      const refreshClient = axios.create({
        baseURL: API_BASE_URL,
        timeout: 15_000,
      });

      const res = await refreshClient.post<RefreshResponse>(
        "/login/token/refresh/",
        {
          refresh: refreshToken,
        }
      );

      const newAccess = res.data.access;
      const newRefresh = res.data.refresh ?? refreshToken;

      store.setAuth(newAccess, newRefresh);

      processQueue(undefined, newAccess);

      originalRequest.headers = {
        ...originalRequest.headers,
        Authorization: `Bearer ${newAccess}`,
      };

      return apiClient(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);
      store.clearAuth();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default apiClient;
