"use client";

import { OverviewCards } from "../components/OverviewCards/OverviewCards";
import { WorkCharts } from "../components/WorkCharts";
import { useDeviceCounts } from "../hooks/useDeviceCounts";
import { mapDeviceCounts } from "../transformers/mapDeviceCounts";
import { STAT_ICONS } from "../constants/statIcons";
const PLACEHOLDER_STATS = [
  { key: "total", label: "تعداد کل کاربران" },
  { key: "present", label: "تعداد کاربران حاضر" },
  { key: "active", label: "تعداد کاربران فعال" },
  { key: "afk", label: "تعداد کاربران AFK" },
] as const;

export function OverviewContainer() {
  const { data, isLoading } = useDeviceCounts();

  const stats = data
    ? mapDeviceCounts(data).map((item) => ({
        ...item,
        icon: STAT_ICONS[item.key],
      }))
    : PLACEHOLDER_STATS.map((item) => ({
        ...item,
        value: undefined,
        icon: STAT_ICONS[item.key],
      }));

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-6">
      <OverviewCards stats={stats} isLoading={isLoading} />
      <WorkCharts />
    </div>
  );
}
