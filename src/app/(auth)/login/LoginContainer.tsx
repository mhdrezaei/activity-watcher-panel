import { LoginForm } from "@/features/auth/components/LoginForm";
import Image from "next/image";
export default function LoginContainer() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="flex flex-col items-center mb-6">
        <Image src="/akowatch-logo.svg" alt="logo" width={214} height={60} />
      </div>

      <LoginForm />
    </div>
  );
}
