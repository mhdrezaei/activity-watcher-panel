"use client";

import { cn } from "@/lib/utils/shadcn";
import { AppUsage } from "../../../types";

const COLORS = [
  "bg-blue-200",
  "bg-pink-200",
  "bg-purple-200",
  "bg-green-200",
  "bg-yellow-200",
];

function formatMinutes(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h ? `${h} ساعت ` : ""}${Math.round(m)} دقیقه`;
}

export function AppUsageList({ items }: { items: AppUsage[] }) {
  const max = Math.max(...items.map((i) => i.total_minutes));

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => {
        const width = (item.total_minutes / max) * 100;
        const color = COLORS[index % COLORS.length];

        return (
          <div
            key={item.app}
            className={cn("rounded-xl px-4 py-3 text-sm transition-all", color)}
            style={{ width: `${width}%` }}
          >
            <div className="font-medium">{item.app}</div>
            <div className="text-muted-foreground">
              {formatMinutes(item.total_minutes)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
