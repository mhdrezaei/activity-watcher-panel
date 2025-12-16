import { apiClient } from "@/lib/axiosClient";
import { useAuthStore } from "@/store/auth.store";

export const authService = {
  /* -------------------------------------------------- */
  /* Login */
  /* -------------------------------------------------- */
  login: async (username: string, password: string) => {
    const res = await apiClient.post("/login/token/", {
      username,
      password,
    });

    const { access, refresh, user } = res.data;

    // ✅ هماهنگ با store جدید
    useAuthStore.getState().setAuth(access, refresh, user);

    return res.data;
  },

  /* -------------------------------------------------- */
  /* Logout */
  /* -------------------------------------------------- */
  logout: () => {
    useAuthStore.getState().clearAuth();
  },

  /* -------------------------------------------------- */
  /* Manual refresh (اختیاری) */
  /* -------------------------------------------------- */
  refresh: async () => {
    const { refreshToken, setAuth } = useAuthStore.getState();

    if (!refreshToken) return null;

    const res = await apiClient.post("/refresh/", {
      refresh: refreshToken,
    });

    const newAccess = res.data.access as string;

    // user را تغییر نمی‌دهیم
    setAuth(newAccess, refreshToken);

    return newAccess;
  },
};
