"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BarChart3,
  Users,
  Settings,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const menu = [
    { href: "/dashboard", icon: LayoutDashboard },
    { href: "/analytics", icon: BarChart3 },
    { href: "/users", icon: Users },
    { href: "/settings", icon: Settings },
  ];

  return (
    <aside
      className="
        w-16 min-h-full bg-white rounded-l-3xl shadow-md
        flex flex-col justify-between py-6 items-center
      "
    >
      {/* آیکن‌ها بالا */}
      <div className="flex flex-col gap-4 items-center">
        {menu.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`w-12 h-12 flex items-center justify-center rounded-xl transition
                ${
                  active
                    ? "bg-primary text-white shadow"
                    : "bg-muted text-gray-600 hover:bg-gray-200"
                }
              `}
            >
              <Icon size={20} />
            </Link>
          );
        })}
      </div>

      {/* آیکن Logout */}
      <button className="w-12 h-12 bg-muted rounded-xl text-gray-600 hover:bg-gray-200 transition flex items-center justify-center">
        <LogOut size={20} />
      </button>
    </aside>
  );
}
