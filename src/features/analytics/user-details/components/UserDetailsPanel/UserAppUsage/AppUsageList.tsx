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
  const max = Math.max(...items.map((i) => i.total_minutes), 1);

  return (
    <div className="flex flex-col gap-3 w-full">
      {items.map((item, index) => {
        // نسبت زمان این برنامه به بیشترین زمان (عددی بین 0 تا 1)
        const ratio = item.total_minutes / max;
        const color = COLORS[index % COLORS.length];

        return (
          <div
            key={item.app}
            className={cn(
              "rounded-xl px-4 py-3 text-sm transition-all flex flex-col",
              // nowrap برای جلوگیری از شکسته شدن خطوط به پایین
              "whitespace-nowrap overflow-hidden",
              color,
            )}
            style={{
              width: `calc(11rem + (100% - 11rem) * ${ratio})`,
            }}
          >
            <div className="font-medium truncate">{item.app}</div>
            <div className="text-muted-foreground truncate mt-1">
              {formatMinutes(item.total_minutes)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
