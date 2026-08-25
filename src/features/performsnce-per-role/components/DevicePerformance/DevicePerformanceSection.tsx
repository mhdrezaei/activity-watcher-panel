// src/features/analytics/overview/components/DevicePerformance/DevicePerformanceSection.tsx
"use client";

import { useState, useMemo } from "react";
import { useDevicePerformance } from "../../hooks/useDevicePerformance";
import { mapDevicePerformanceToChart } from "../../transformers/mapDevicePerformanceToChart";
import DevicePerformanceChartClient from "./DevicePerformanceChart.client";

import { RoleSelect } from "@/shared/components/ui/select-role/RoleSelect";
import { Button } from "@/shared/components/ui/button/Button";
import { Activity, Clock, PowerOff, RefreshCcw } from "lucide-react";

import type { PerformanceMetric } from "../../types";
import { WorkRange } from "@/shared/types/types";
import { RangeSelect } from "@/shared/components/widgets/RangeSelect";
import { DevicePerformanceSkeleton } from "./DevicePerformanceSkeleton";

export function DevicePerformanceSection() {
  const [range, setRange] = useState<WorkRange>("current_day");
  const [roleId, setRoleId] = useState<number | "all">(1);
  const [metric, setMetric] = useState<PerformanceMetric>("working");

  const { data, isLoading, isFetching, refetch } = useDevicePerformance(
    range,
    roleId,
    metric,
  );

  const chartOption = useMemo(() => mapDevicePerformanceToChart(data), [data]);

  return (
    <div className="w-full p-4 bg-accent rounded-xl border border-border shadow-sm mt-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border pb-4 mb-4">
        <h3 className="text-base font-bold text-card-foreground">
          روند عملکرد زمانی بر اساس نقش و دستگاه
        </h3>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-background border border-border rounded-lg p-1">
            <Button
              variant={metric === "working" ? "default" : "ghost"}
              size="sm"
              className="text-xs h-7"
              onClick={() => setMetric("working")}
            >
              <Activity size={14} className="mr-1" /> در حال کار
            </Button>
            {/* ۲. تغییر کلید به inactive */}
            <Button
              variant={metric === "inactive" ? "default" : "ghost"}
              size="sm"
              className="text-xs h-7"
              onClick={() => setMetric("inactive")}
            >
              <Clock size={14} className="mr-1" /> بیکار
            </Button>
          </div>

          <div className="h-6 w-px bg-border hidden md:block"></div>

          <RoleSelect value={roleId} onChange={setRoleId} />
          <RangeSelect value={range} onChange={setRange} />

          <Button
            size="icon"
            variant="outline"
            onClick={() => refetch()}
            disabled={isFetching}
            className="cursor-pointer h-9 w-9"
            title="بروزرسانی نمودار"
          >
            <RefreshCcw
              size={14}
              className={isFetching ? "animate-spin" : ""}
            />
          </Button>
        </div>
      </div>

      <div className="bg-card py-4  rounded-md w-full min-h-[450px]">
        {/* isLoading برای اولین لود (Skeleton) استفاده می‌شود */}
        {isLoading ? (
          <DevicePerformanceSkeleton />
        ) : data?.series?.length === 0 ? (
          <div className="flex items-center justify-center h-[450px] text-muted-foreground">
            داده‌ای برای نمایش در این بازه زمانی وجود ندارد.
          </div>
        ) : (
          /* ۳. پاس دادن isFetching برای نمایش اسپینر نرمال چارت در لودهای بعدی */
          <DevicePerformanceChartClient
            option={chartOption}
            loading={isFetching}
          />
        )}
      </div>
    </div>
  );
}
