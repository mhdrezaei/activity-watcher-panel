"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { DashboardShell } from "@/shared/components/layout/DashboardShell";
import { useHydrated } from "@/shared/hooks/useHydrated";
import { AuthGuard } from "@/shared/components/guards/AuthGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const accessToken = useAuthStore((s) => s.accessToken);
  const hydrated = useHydrated();

  useEffect(() => {
    // تا وقتی hydrated نشده، هیچ کاری نکن
    if (!hydrated) return;

    // وقتی hydrated شد و توکن وجود ندارد → ریدایرکت
    if (!accessToken) {
      router.replace("/login");
    }
  }, [hydrated, accessToken, router]);

  // تا قبل از hydration هیچ‌چیز رندر نکن
  if (!hydrated) return null;

  // اگر hydrated شد ولی توکن نداشت → صفحه خالی تا redirect انجام شود
  if (!accessToken) return null;

  return (
    <AuthGuard>
      <DashboardShell>{children}</DashboardShell>
    </AuthGuard>
  );
}
