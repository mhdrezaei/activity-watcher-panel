// src/features/analytics/overview/containers/OverviewContainer.tsx
"use client";

import { OverviewCards } from "../components/OverviewCards/OverviewCards";
import { WorkCharts } from "../components/WorkCharts";
import { useDeviceCounts } from "../hooks/useDeviceCounts";
import { mapDeviceCounts } from "../transformers/mapDeviceCounts";
import { STAT_ICONS } from "../constants/statIcons";

const PLACEHOLDER_STATS = [
  { key: "total", label: " کل کاربران" },
  { key: "present", label: " کاربران حاضر" },
  { key: "active", label: " کاربران فعال" },
  { key: "afk", label: " کاربران AFK" },
] as const;

export function OverviewContainer() {
  const { data, isLoading } = useDeviceCounts();

  const stats = data
    ? mapDeviceCounts(data).map((item) => {
        // اختصاص دادن لیست کاربران به هر بخش بر اساس کلید
        let users: string[] = [];
        if (item.key === "present") users = data.present_devices || [];
        if (item.key === "active") users = data.fully_working_devices || [];
        if (item.key === "afk") users = data.afk_devices || [];

        return {
          ...item,
          icon: STAT_ICONS[item.key as keyof typeof STAT_ICONS],
          users, // ارسال آرایه کاربران
          isClickable: item.key !== "total", // فقط کل کاربران غیرقابل کلیک باشد
        };
      })
    : PLACEHOLDER_STATS.map((item) => ({
        ...item,
        value: undefined,
        icon: STAT_ICONS[item.key as keyof typeof STAT_ICONS],
        users: [],
        isClickable: item.key !== "total",
      }));

  return (
    <div className="bg-card rounded-2xl p-6 border border-border shadow-sm space-y-6">
      <OverviewCards stats={stats} isLoading={isLoading} />
      <WorkCharts />
    </div>
  );
}
