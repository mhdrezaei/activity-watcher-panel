"use client";

import { useState, useMemo } from "react";
import { useWorksPerRole } from "../hooks/useWorksPerRole";
import { mapRolesComparisonToChart } from "../transformers/mapRolesComparisonToChart";
import RolesComparisonChartClient from "./RolesComparisonChart.client";

import { Button } from "@/shared/components/ui/button/Button";
import { Activity, Clock, RefreshCcw, Briefcase } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select/select";

import { WorkRange } from "@/shared/types/types";
import { RangeSelect } from "@/shared/components/widgets/RangeSelect";
import { RolesComparisonSkeleton } from "./RolesComparisonSkeleton";

export function RolesComparisonSection() {
  const [range, setRange] = useState<WorkRange>("current_day");
  const [metric, setMetric] = useState<string>("working");
  const [normalize, setNormalize] = useState<string>("per_device");
  const [denominator, setDenominator] = useState<string>("roster");

  const { data, isLoading, isFetching, refetch } = useWorksPerRole({
    range,
    metric,
    normalize,
    denominator,
  });

  const chartOption = useMemo(() => mapRolesComparisonToChart(data, normalize), [data, normalize]);

  return (
    <div className="w-full p-4 bg-accent rounded-xl border border-border shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border pb-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Briefcase className="text-primary" size={18} />
          </div>
          <h3 className="text-base font-bold text-card-foreground">
            مقایسه کارکرد نقش‌ها
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-background border border-border rounded-lg p-1">
            <Button
              variant={metric === "working" ? "default" : "ghost"}
              size="sm"
              className="text-xs h-7"
              onClick={() => setMetric("working")}
              disabled={normalize === "utilization"}
            >
              <Activity size={14} className="mr-1" /> در حال کار
            </Button>
            <Button
              variant={metric === "inactive" ? "default" : "ghost"}
              size="sm"
              className="text-xs h-7"
              onClick={() => setMetric("inactive")}
              disabled={normalize === "utilization"}
            >
              <Clock size={14} className="mr-1" /> بیکار
            </Button>
          </div>

          <div className="h-6 w-px bg-border hidden md:block"></div>

          <div className="flex items-center gap-2 bg-background border border-border rounded-lg px-2 h-9 text-sm">
            <span className="text-muted-foreground whitespace-nowrap text-xs">مبنای محاسبه:</span>
            <Select value={denominator} onValueChange={setDenominator}>
              <SelectTrigger className="w-[150px] h-7 px-1 border-none bg-transparent shadow-none focus:ring-0 outline-none text-xs">
                <SelectValue placeholder="انتخاب مبنا" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="roster">کل دستگاه‌های نقش</SelectItem>
                <SelectItem value="reporting">فقط دستگاه‌های فعال</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 bg-background border border-border rounded-lg px-2 h-9 text-sm">
            <span className="text-muted-foreground whitespace-nowrap text-xs">نحوه محاسبه:</span>
            <Select value={normalize} onValueChange={setNormalize}>
              <SelectTrigger className="w-[140px] h-7 px-1 border-none bg-transparent shadow-none focus:ring-0 outline-none text-xs">
                <SelectValue placeholder="انتخاب نوع محاسبه" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="per_device">سرانه (دقیقه)</SelectItem>
                <SelectItem value="utilization">بهره‌وری (درصد)</SelectItem>
                <SelectItem value="raw">مجموع خام (دقیقه)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <RangeSelect value={range} onChange={setRange} />

          <Button
            size="icon"
            variant="outline"
            onClick={() => refetch()}
            disabled={isFetching}
            className="cursor-pointer h-9 w-9 bg-background"
            title="بروزرسانی نمودار"
          >
            <RefreshCcw
              size={14}
              className={isFetching ? "animate-spin" : ""}
            />
          </Button>
        </div>
      </div>

      <div className="bg-card py-4 rounded-md w-full min-h-[450px]">
        {isLoading ? (
          <RolesComparisonSkeleton />
        ) : data?.series?.length === 0 ? (
          <div className="flex items-center justify-center h-[450px] text-muted-foreground">
            داده‌ای برای نمایش در این بازه زمانی وجود ندارد.
          </div>
        ) : (
          <RolesComparisonChartClient
            option={chartOption}
            loading={isFetching}
          />
        )}
      </div>
    </div>
  );
}
