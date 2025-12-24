"use client";

import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/store/theme.store";
import clsx from "clsx";

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={clsx(
        "relative w-12 h-6 rounded-full transition-colors",
        isDark ? "bg-primary" : "bg-muted"
      )}
    >
      {/* Knob */}
      <span
        className={clsx(
          "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center transition-transform",
          isDark && "translate-x-6"
        )}
      >
        {isDark ? (
          <Moon size={12} className="text-primary" />
        ) : (
          <Sun size={12} className="text-yellow-500" />
        )}
      </span>
    </button>
  );
}
