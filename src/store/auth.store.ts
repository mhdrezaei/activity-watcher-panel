import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: { id: number; username: string } | null;

  setTokens: (access: string, refresh: string) => void;
  setUser: (user: AuthState["user"]) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,

      setTokens: (access, refresh) =>
        set({
          accessToken: access,
          refreshToken: refresh,
        }),

      setUser: (user) => set({ user }),

      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
        }),
    }),
    {
      name: "auth-storage",
    }
  )
);
