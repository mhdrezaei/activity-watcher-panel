"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";
import { authService } from "@/core/services/authService";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/shared/components/ui/tabs/Tabs";

import { Input } from "@/shared/components/ui/input/Input";
import { Button } from "@/shared/components/ui/button/Button";

import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  MessageSquareMore,
  KeyRound,
  Loader2,
} from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/shared/components/ui/tooltip/Tooltip";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  username: z.string().min(1, "نام کاربری الزامی است"),
  password: z.string().min(1, "رمز عبور الزامی است"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const [tab, setTab] = useState("password");
  const [showPass, setShowPass] = useState(false);
  const [capsWarning, setCapsWarning] = useState(false);

  const [serverError, setServerError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { register, handleSubmit, formState, watch, setValue } = form;

  const watchedUsername = watch("username");
  const watchedPassword = watch("password");

  useEffect(() => {
    const id = setTimeout(() => {
      const trimmed = watchedUsername.trim();
      if (trimmed !== watchedUsername) {
        setValue("username", trimmed, {
          shouldDirty: true,
          shouldValidate: true,
        });
      }
    }, 300);

    return () => clearTimeout(id);
  }, [watchedUsername, setValue]);

  useEffect(() => {
    const id = setTimeout(() => {
      const trimmed = watchedPassword.trim();
      if (trimmed !== watchedPassword) {
        setValue("password", trimmed, {
          shouldDirty: true,
          shouldValidate: true,
        });
      }
    }, 300);

    return () => clearTimeout(id);
  }, [watchedPassword, setValue]);

  async function onSubmit(data: LoginFormValues) {
    try {
      setLoading(true);
      setServerError("");
      setSuccessMsg("");

      await authService.login(data.username, data.password);

      setSuccessMsg("با موفقیت وارد شدید");

      setTimeout(() => {
        router.replace("/dashboard");
      }, 700);
    } catch (err) {
      console.log(err);
      setServerError("نام کاربری یا رمز عبور صحیح نمی‌باشد.");
    } finally {
      setLoading(false);
    }
  }

  function checkCapsLock(e: React.KeyboardEvent<HTMLInputElement>) {
    setCapsWarning(e.getModifierState("CapsLock"));
  }

  return (
    <div className="w-full max-w-sm p-6 rounded-2xl bg-white">
      <h2 className="text-xl font-bold text-center mb-1">خوش آمدید.</h2>

      <p className="text-sm text-center text-muted-foreground mb-4">
        آماده شروع تازه‌اید؟{" "}
        <span className="text-primary cursor-pointer font-semibold">
          ساخت حساب کاربری
        </span>
      </p>

      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="w-full grid grid-cols-2 mb-4 bg-muted p-1 rounded-lg">
          <TabsTrigger className="data-[state=active]:bg-white" value="otp">
            رمز یکبار مصرف
            <MessageSquareMore className="w-4 h-4 mr-1" />
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-white"
            value="password"
          >
            ورود با رمز عبور
            <KeyRound className="w-4 h-4 mr-1" />
          </TabsTrigger>
        </TabsList>

        {/* ---------------- LOGIN FORM ---------------- */}
        <TabsContent value="password">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* USERNAME */}
            <div className="relative">
              <Mail className="w-4 h-4 absolute right-3 top-3 text-muted-foreground" />
              <Input
                {...register("username")}
                placeholder="ایمیل یا نام کاربری"
                className={`h-10 pr-10 placeholder:text-start ${
                  formState.errors.username ? "border-red-500" : ""
                }`}
                disabled={loading}
              />
              {formState.errors.username && (
                <p className="text-red-500 text-xs mt-1 transition-all duration-200">
                  {formState.errors.username.message}
                </p>
              )}
            </div>

            {/* PASSWORD WITH TOOLTIP */}
            <div className="relative">
              <Lock className="w-4 h-4 absolute right-3 top-3 text-muted-foreground" />

              <Input
                {...register("password")}
                type={showPass ? "text" : "password"}
                placeholder="رمز عبور"
                className={`h-10 pr-10 pl-10 placeholder:text-start ${
                  formState.errors.password ? "border-red-500" : ""
                }`}
                onKeyUp={checkCapsLock}
                disabled={loading}
              />

              {/* Tooltip for CapsLock */}
              <Tooltip open={capsWarning}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute left-3 top-3 text-muted-foreground"
                    disabled={loading}
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </TooltipTrigger>

                <TooltipContent side="top" className="bg-orange-500 text-white">
                  کلید CapsLock روشن است
                </TooltipContent>
              </Tooltip>

              {formState.errors.password && (
                <p className="text-red-500 text-xs mt-1 transition-all duration-200">
                  {formState.errors.password.message}
                </p>
              )}
            </div>

            {serverError && (
              <p className="text-red-500 text-sm text-center bg-red-50 border border-red-100 rounded-md py-2 mt-1 animate-pulse">
                {serverError}
              </p>
            )}

            {/* Success message */}
            {successMsg && (
              <p className="text-green-600 text-sm text-center bg-green-50 border border-green-100 rounded-md py-2 mt-1 transition-all duration-300">
                {successMsg}
              </p>
            )}

            <Button
              className="w-full bg-primary text-primary-foreground mt-2 flex items-center justify-center gap-2"
              disabled={loading}
              type="submit"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? "در حال ورود..." : "ورود"}
            </Button>
          </form>
        </TabsContent>

        {/* OTP TAB - Optional */}
        <TabsContent value="otp">
          <div className="space-y-4">
            <Input placeholder="ایمیل یا شماره موبایل" disabled={loading} />
            <Button className="w-full bg-primary" disabled={loading}>
              ارسال کد یکبار مصرف
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <p className="text-center text-sm mt-4 text-muted-foreground cursor-pointer">
        فراموشی رمز عبور
      </p>
    </div>
  );
}
