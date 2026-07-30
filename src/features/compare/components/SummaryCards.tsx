// src/features/compare/components/SummaryCards.tsx
"use client";

import { useState } from "react";
import { CompareResponse } from "../types";
import {
  Activity,
  Coffee,
  Clock,
  Percent,
  MonitorOff,
  AppWindow,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

export default function SummaryCards({ data }: { data: CompareResponse }) {
  const [isHourly, setIsHourly] = useState(false);

  const { a, b } = data.devices;
  const { comparison } = data;

  const topAppA = a.top_apps.split(",")[0]?.trim() || "-";
  const topAppB = b.top_apps.split(",")[0]?.trim() || "-";

  const cards = [
    {
      title: "کارکرد مفید",
      icon: <Activity className="w-5 h-5 text-emerald-500" />,
      valA: a.totals.active_min,
      valB: b.totals.active_min,
      diff: comparison.active_diff_min,
      unit: "دقیقه",
    },
    {
      title: "زمان عدم فعالیت",
      icon: <Coffee className="w-5 h-5 text-rose-500" />,
      valA: a.totals.inactive_min,
      valB: b.totals.inactive_min,
      diff: comparison.inactive_diff_min,
      unit: "دقیقه",
    },
    {
      title: "مجموع زمان حضور",
      icon: <Clock className="w-5 h-5 text-blue-500" />,
      valA: a.totals.total_min,
      valB: b.totals.total_min,
      diff: comparison.total_diff_min,
      unit: "دقیقه",
    },
    {
      title: "درصد فعالیت کل",
      icon: <Percent className="w-5 h-5 text-indigo-500" />,
      valA: a.totals.active_pct,
      valB: b.totals.active_pct,
      diff: comparison.active_pct_diff,
      unit: "%",
    },
    {
      title: "بیشترین زمان دوری (AFK)",
      icon: (
        <MonitorOff className="w-5 h-5 text-slate-500 dark:text-slate-400" />
      ),
      valA: a.longest_afk.duration,
      valB: b.longest_afk.duration,
      diff: undefined,
      unit: "",
    },
    {
      title: "نرم‌افزار پرکاربرد",
      icon: <AppWindow className="w-5 h-5 text-amber-500" />,
      valA: topAppA,
      valB: topAppB,
      diff: undefined,
      unit: "",
    },
  ];

  const formatValue = (val: string | number | undefined, unit: string) => {
    if (typeof val !== "number") return val;
    if (unit === "دقیقه") {
      return isHourly ? Number((val / 60).toFixed(1)) : Math.round(val);
    }
    if (unit === "%") return Math.round(val);
    return val;
  };

  const getUnit = (unit: string) => {
    if (unit === "دقیقه") return isHourly ? "ساعت" : "دقیقه";
    return unit;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <div className="flex items-center bg-card border border-border rounded-lg p-1">
          <button
            onClick={() => setIsHourly(false)}
            className={`px-4 py-1.5 text-xs font-medium rounded-md transition-colors ${
              !isHourly
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            دقیقه
          </button>
          <button
            onClick={() => setIsHourly(true)}
            className={`px-4 py-1.5 text-xs font-medium rounded-md transition-colors ${
              isHourly
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            ساعت
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {cards.map((card, idx) => {
          const displayValA = formatValue(card.valA, card.unit);
          const displayValB = formatValue(card.valB, card.unit);
          const displayDiff =
            card.diff !== undefined
              ? formatValue(Math.abs(card.diff), card.unit)
              : undefined;
          const displayUnit = getUnit(card.unit);

          return (
            <div
              key={idx}
              className="bg-card text-card-foreground p-5 rounded-2xl shadow-sm border border-border flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              {/* هدر کارت */}
              <div className="flex items-center gap-2 mb-5">
                {card.icon}
                <h4 className="font-semibold text-[15px]">{card.title}</h4>
              </div>

              {/* بدنه کارت: دیتای دو کاربر */}
              <div className="space-y-4 flex-1">
                {/* کاربر A */}
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-2 overflow-hidden flex-1">
                    <span className="min-w-3 w-3 h-3 rounded-full bg-blue-500 block shrink-0"></span>
                    <span
                      className="text-sm text-muted-foreground truncate"
                      title={a.name}
                    >
                      {a.name}
                    </span>
                  </div>
                  <div className="font-bold whitespace-nowrap text-foreground pl-2">
                    {displayValA}{" "}
                    <span className="text-xs font-normal text-muted-foreground ml-1">
                      {displayUnit}
                    </span>
                  </div>
                </div>

                {/* کاربر B */}
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-2 overflow-hidden flex-1">
                    <span className="min-w-3 w-3 h-3 rounded-full bg-orange-500 block shrink-0"></span>
                    <span
                      className="text-sm text-muted-foreground truncate"
                      title={b.name}
                    >
                      {b.name}
                    </span>
                  </div>
                  <div className="font-bold whitespace-nowrap text-foreground pl-2">
                    {displayValB}{" "}
                    <span className="text-xs font-normal text-muted-foreground ml-1">
                      {displayUnit}
                    </span>
                  </div>
                </div>
              </div>

              {/* فوتر کارت: نمایش اختلاف (فقط برای فیلدهای عددی) */}
              {card.diff !== undefined && (
                <div className="mt-4 pt-3 border-t border-border flex justify-between items-center">
                  <span className="text-xs text-muted-foreground font-medium">
                    اختلاف دو کاربر:
                  </span>
                  <div className="flex items-center gap-1.5 font-semibold text-sm">
                    <span
                      className={
                        card.diff > 0
                          ? "text-blue-500"
                          : card.diff < 0
                            ? "text-orange-500"
                            : "text-muted-foreground"
                      }
                    >
                      {displayDiff} {displayUnit}
                    </span>

                    {/* نمایش فلش جهت‌دار بر اساس مثبت یا منفی بودن اختلاف */}
                    {card.diff !== 0 &&
                      (card.diff > 0 ? (
                        <TrendingUp className="w-4 h-4 text-blue-500 shrink-0" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-orange-500 shrink-0" />
                      ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
