import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { API_BASE_URL } from "@/core/config/api";
import { useAuthStore } from "@/store/auth.store";

interface FailedRequest {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((req) => {
    if (error) req.reject(error);
    else req.resolve(token);
  });

  failedQueue = [];
};

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

/* --------------------- REQUEST ---------------------- */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const access = useAuthStore.getState().accessToken;

    if (access) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${access}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ------------------- RESPONSE ------------------------ */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { refreshToken, setTokens, logout } = useAuthStore.getState();

      if (!refreshToken) {
        logout();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise<string | null>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((newToken) => {
          if (newToken) {
            originalRequest.headers = {
              ...originalRequest.headers,
              Authorization: `Bearer ${newToken}`,
            };
          }
          return apiClient(originalRequest);
        });
      }

      isRefreshing = true;

      try {
        const res = await axios.post(`${API_BASE_URL}refresh/`, {
          refresh: refreshToken,
        });

        const newAccess = res.data.access as string;

        setTokens(newAccess, refreshToken);

        processQueue(null, newAccess);
        isRefreshing = false;

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccess}`,
        };

        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;
        logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
