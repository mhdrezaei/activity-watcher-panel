"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useHydrated } from "@/shared/hooks/useHydrated";
import LoginContainer from "./LoginContainer";

export default function LoginPage() {
  const access = useAuthStore((s) => s.accessToken);
  const hydrated = useHydrated();

  useEffect(() => {
    if (!hydrated) return;

    if (access) {
      window.location.replace("/dashboard");
    }
  }, [access, hydrated]);

  if (!hydrated) {
    return (
      <div className="h-screen grid place-items-center">در حال بررسی…</div>
    );
  }

  if (access) {
    return null;
  }

  return <LoginContainer />;
}
