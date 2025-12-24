"use client";

import { User, HelpCircle } from "lucide-react";
import Image from "next/image";
import { ThemeToggle } from "../ui/theme-toggle/ThemeToggle";

export function Topbar() {
  return (
    <header className="w-full bg-card   shadow-sm rounded-2xl px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2 select-none">
        <Image src="/akowatch-logo.png" alt="logo" width={163} height={20} />
      </div>
      {/* Left section icons */}
      <div className="flex items-center gap-3">
        {/* User Icon */}
        <button className="w-10 h-10 flex items-center cursor-pointer justify-center text-primary hover:text-card-foreground rounded-full bg-accent hover:bg-primary transition">
          <User size={18} />
        </button>
        {/* Help */}
        <button className="w-10 h-10 flex items-center cursor-pointer justify-center text-primary hover:text-card-foreground rounded-full bg-accent hover:bg-primary transition">
          <HelpCircle size={18} />
        </button>

        {/* Light / Dark Toggle */}
        <ThemeToggle />
      </div>
    </header>
  );
}
