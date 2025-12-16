import { create } from "zustand";
import { persist } from "zustand/middleware";

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

export interface AuthUser {
  id: number;
  username: string;
}

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;

  /* actions */
  setAuth: (access: string, refresh: string, user?: AuthUser) => void;
  clearAuth: () => void;
}

/* ------------------------------------------------------------------ */
/* Store */
/* ------------------------------------------------------------------ */

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,

      setAuth: (access, refresh, user) =>
        set({
          accessToken: access,
          refreshToken: refresh,
          user: user ?? null,
        }),

      clearAuth: () =>
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
        }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
      }),
    }
  )
);
