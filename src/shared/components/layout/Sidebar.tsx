"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  DashboardIcon,
  UsersIcon,
  AnalyticsIcon,
  SettingsIcon,
  MenuIcon,
} from "@/shared/assets/icons/";
import { ChartIcon } from "@/shared/assets/icons/ChartIcon";
import { LogOut } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const menu = [
    { href: "/dashboard", icon: DashboardIcon },
    { href: "/view", icon: ChartIcon },
    { href: "/analytics", icon: AnalyticsIcon },
    { href: "/settings", icon: SettingsIcon },
    { href: "/users", icon: UsersIcon },
  ];

  return (
    <aside className="w-20 min-h-screen bg-white rounded-lg shadow-md p-4 flex flex-col justify-between items-center">
      {/* TOP ICONS */}
      <nav className="flex flex-col items-center gap-2">
        <MenuIcon active={false} />
        {menu.map((item) => {
          const Icon = item.icon;
          const active = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                w-12 h-12 flex items-center justify-center rounded-2xl transition-all
                ${
                  active
                    ? "bg-primary text-white border border-primary"
                    : " hover:bg-gray-200 text-gray-600"
                }
              `}
            >
              <Icon active={active} color="#fff" />
            </Link>
          );
        })}
        {/* LOGOUT ICON */}
        <div className="mt-auto">
          <button className="w-12 h-12 rounded-2xl hover:bg-gray-200 flex items-center justify-center">
            <LogOut size={18} />
          </button>
        </div>
      </nav>
    </aside>
  );
}
