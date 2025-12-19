"use client";

import { useState } from "react";
import { useLogout } from "@/shared/hooks/useLogout";
import { ConfirmLogoutModal } from "@/shared/components/modals/ConfirmLogoutModal";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { LogOut } from "lucide-react";

import {
  DashboardIcon,
  UsersIcon,
  AnalyticsIcon,
  SettingsIcon,
  MenuIcon,
  ExpandedMenuIcon,
} from "@/shared/assets/icons";
import { ChartIcon } from "@/shared/assets/icons/ChartIcon";
type SidebarItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ active?: boolean; color?: string }>;
};

const MENU_ITEMS: SidebarItem[] = [
  { href: "/dashboard", label: "پیشخوان", icon: DashboardIcon },
  { href: "/analytics", label: "نمودارها", icon: AnalyticsIcon },
  { href: "/view", label: "گزارش گیری", icon: ChartIcon },
  { href: "/settings", label: "تنظیمات سیستم", icon: SettingsIcon },
  { href: "/users", label: "مدیریت کاربران", icon: UsersIcon },
];

export function Sidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const logout = useLogout();

  return (
    <aside
      className={clsx(
        "sticky top-3 h-full rounded-2xl bg-white shadow-md transition-all duration-300",
        expanded ? "w-64" : "w-20"
      )}
    >
      <div className="h-full p-4 flex flex-col justify-between">
        {/* -------- TOP -------- */}
        <nav className="flex flex-col gap-2">
          {/* Toggle Button */}
          <button
            onClick={() => setExpanded((v) => !v)}
            className="w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-gray-100 transition"
          >
            {expanded ? <ExpandedMenuIcon /> : <MenuIcon active={expanded} />}
          </button>

          {/* Menu Items */}
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 rounded-2xl px-3 py-3 transition-all",
                  active
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  <Icon active={active} color={active ? "#fff" : "#6b7280"} />
                </div>

                {/* Label فقط وقتی expanded است */}
                {expanded && (
                  <span className="text-sm font-medium whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* -------- LOGOUT -------- */}
        <button
          onClick={() => setLogoutOpen(true)}
          className={clsx(
            "flex items-center gap-3 rounded-2xl px-3 py-3 hover:bg-gray-100 transition",
            expanded ? "justify-start" : "justify-center"
          )}
        >
          <LogOut size={18} />
          {expanded && <span className="text-sm">خروج</span>}
        </button>
      </div>
      <ConfirmLogoutModal
        open={logoutOpen}
        onCancel={() => setLogoutOpen(false)}
        onConfirm={logout}
      />
    </aside>
  );
}
