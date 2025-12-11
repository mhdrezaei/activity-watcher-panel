"use client";

import { Moon, Sun, User, HelpCircle } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export function Topbar() {
  const [dark, setDark] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm rounded-2xl px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2 select-none">
        <Image src="/akowatch-logo.png" alt="logo" width={163} height={20} />
      </div>
      {/* Left section icons */}
      <div className="flex items-center gap-3">
        {/* User Icon */}
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-muted hover:bg-gray-200 transition">
          <User size={18} />
        </button>
        {/* Help */}
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-muted hover:bg-gray-200 transition">
          <HelpCircle size={18} />
        </button>

        {/* Light / Dark Toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-muted hover:bg-gray-200 transition"
        >
          {dark ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>
    </header>
  );
}
