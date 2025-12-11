"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import LoginContainer from "./LoginContainer";

export default function LoginPage() {
  const access = useAuthStore((s) => s.accessToken);

  useEffect(() => {
    if (access) {
      window.location.href = "/dashboard";
    }
  }, [access]);

  return <LoginContainer />;
}
