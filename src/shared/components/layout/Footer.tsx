"use client";

import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full flex items-center bg-white rounded-2xl justify-center my-3 py-4 text-xs text-muted-foreground">
      <div className="flex flex-col items-center gap-4">
        <Image
          src="/images/logo-symbol.png"
          alt="Akowa Logo"
          width={60}
          height={60}
          className="opacity-80"
        />
        <span>© {new Date().getFullYear()} Akowa — All Rights Reserved</span>
      </div>
    </footer>
  );
}
