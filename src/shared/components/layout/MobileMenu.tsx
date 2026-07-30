"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { LogOut, Menu, X } from "lucide-react";

import { useLogout } from "@/shared/hooks/useLogout";
import { ConfirmLogoutModal } from "@/shared/components/modals/ConfirmLogoutModal";
import { useThemeStore } from "@/store/theme.store";

// ایمپورت آیکون‌های شما
import {
  DashboardIcon,
  UsersIcon,
  AnalyticsIcon,
  SettingsIcon,
} from "@/shared/assets/icons";
import { ChartIcon } from "@/shared/assets/icons/ChartIcon";

type SidebarItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ active?: boolean; color?: string }>;
};

const MENU_ITEMS: SidebarItem[] = [
  { href: "/dashboard", label: "پیشخوان", icon: DashboardIcon },
  { href: "/users-management", label: "مدیریت کاربران", icon: UsersIcon },
  { href: "/compare-dashboard", label: "مقایسه کاربران", icon: ChartIcon },
  // { href: "/analytics", label: "نمودارها", icon: AnalyticsIcon },
  // { href: "/view", label: "گزارش گیری", icon: ChartIcon },
  // { href: "/settings", label: "تنظیمات سیستم", icon: SettingsIcon },
];

export function MobileMenu() {
  const { theme } = useThemeStore();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const logout = useLogout();

  // بستن منو در صورت تغییر مسیر (تغییر صفحه)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
  }, [pathname]);

  // جلوگیری از اسکرول شدن صفحه در پس‌زمینه وقتی منو باز است
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      {/* دکمه منوی همبرگری برای نمایش در هدر */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-xl hover:bg-accent transition-colors flex items-center justify-center"
        aria-label="باز کردن منو"
      >
        <Menu size={24} className="text-primary" />
      </button>

      {/* پس‌زمینه تاریک (Overlay) */}
      <div
        className={clsx(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible",
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* منوی کشویی (Drawer) */}
      <aside
        className={clsx(
          "fixed top-0 right-0 z-50 h-full w-64 bg-card shadow-2xl transition-transform duration-300 ease-in-out flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="p-4 flex items-center justify-between border-b border-border">
          <span className="font-bold text-lg">منوی کاربری</span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-xl hover:bg-accent transition-colors"
            aria-label="بستن منو"
          >
            <X size={24} className="text-foreground" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col justify-between">
          <nav className="flex flex-col gap-2">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "flex items-center gap-3 rounded-2xl px-3 py-3 transition-all",
                    active && theme === "dark"
                      ? "bg-primary text-white"
                      : !active && theme === "dark"
                        ? "text-white hover:bg-accent"
                        : active && theme === "light"
                          ? "bg-primary text-white"
                          : "hover:bg-accent",
                  )}
                >
                  <div className="w-6 h-6 flex items-center justify-center">
                    <Icon
                      active={active}
                      color={
                        active && theme === "dark"
                          ? "#fff"
                          : !active && theme === "dark"
                            ? "#fff"
                            : active && theme === "light"
                              ? "#fff"
                              : "#222"
                      }
                    />
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* دکمه خروج */}
          <div className="mt-8 border-t border-border pt-4">
            <button
              aria-label="خروج"
              onClick={() => {
                setIsOpen(false);
                setLogoutOpen(true);
              }}
              className="w-full flex items-center gap-3 rounded-2xl px-3 py-3 hover:bg-accent text-red-500 hover:text-red-600 transition"
            >
              <LogOut size={20} />
              <span className="text-sm font-medium">خروج از حساب</span>
            </button>
          </div>
        </div>
      </aside>

      {/* مدال تایید خروج */}
      <ConfirmLogoutModal
        open={logoutOpen}
        onCancel={() => setLogoutOpen(false)}
        onConfirm={logout}
      />
    </div>
  );
}
