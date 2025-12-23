"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

export function useLogout() {
  const router = useRouter();
  const clearAuth = useAuthStore((s) => s.clearAuth);

  return () => {
    clearAuth();
    router.replace("/login");
  };
}
