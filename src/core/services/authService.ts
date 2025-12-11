import { apiClient } from "@/lib/axiosClient";
import { useAuthStore } from "@/store/auth.store";

export const authService = {
  // login با username/password
  login: async (username: string, password: string) => {
    const res = await apiClient.post("/login/token/", {
      username,
      password,
    });

    const { access, refresh, user } = res.data;

    // ذخیره توکن‌ها و یوزر
    const { setTokens, setUser } = useAuthStore.getState();
    setTokens(access, refresh);
    setUser(user);

    return res.data;
  },

  // خروج
  logout: () => {
    const { logout } = useAuthStore.getState();
    logout();
  },

  // رفرش دستی (در صورت نیاز)
  refresh: async () => {
    const { refreshToken, setTokens } = useAuthStore.getState();

    if (!refreshToken) return null;

    const res = await apiClient.post("/refresh/", {
      refresh: refreshToken,
    });

    setTokens(res.data.access, refreshToken);

    return res.data.access;
  },
};
