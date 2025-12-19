"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { useHydrated } from "@/shared/hooks/useHydrated";

type Props = {
  children: React.ReactNode;
  redirectTo?: string;
};

export function AuthGuard({ children, redirectTo = "/login" }: Props) {
  const router = useRouter();
  const accessToken = useAuthStore((s) => s.accessToken);
  const hydrated = useHydrated();

  useEffect(() => {
    if (!hydrated) return;

    if (!accessToken) {
      router.replace(redirectTo);
    }
  }, [hydrated, accessToken, router, redirectTo]);

  // جلوگیری از نمایش لاگین فلیکر
  if (!hydrated) {
    return (
      <div className="h-screen grid place-items-center">در حال بررسی…</div>
    );
  }

  if (!accessToken) return null;

  return <>{children}</>;
}
