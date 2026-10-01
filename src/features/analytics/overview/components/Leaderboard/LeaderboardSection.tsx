"use client";

import { useState } from "react";
import { RangeSelect } from "../WorkCharts/filter/RangeSelect";
import { RoleSelect } from "@/shared/components/ui/select-role/RoleSelect";
import { WorkRange } from "@/shared/types/types";
import { useLeaderboard } from "../../hooks/useLeaderboard";
import { LeaderboardList } from "./LeaderboardList";
import { LeaderboardChart } from "./LeaderboardChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs/Tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select/select";
import { Input } from "@/shared/components/ui/input/Input";
import { RefreshCcw, LayoutList, BarChart3 } from "lucide-react";
import { Button } from "@/shared/components/ui/button/Button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/components/ui/tooltip/Tooltip";

const RANK_BY_OPTIONS = [
  { value: "working", label: "بیشترین زمان کارکرد" },
  { value: "active_pct", label: "بیشترین درصد فعالیت (تمرکز)" },
];

export function LeaderboardSection() {
  const [range, setRange] = useState<WorkRange>("current_day");
  const [roleId, setRoleId] = useState<number | "all">("all");
  const [rankBy, setRankBy] = useState<string>("working");
  const [limit, setLimit] = useState<number>(5);
  const [minMinutes, setMinMinutes] = useState<number>(1);
  const [viewMode, setViewMode] = useState<"list" | "chart">("list");

  const { data, isLoading, isFetching, refetch } = useLeaderboard({
    range,
    rank_by: rankBy,
    limit,
    min_minutes: minMinutes,
    ...(roleId !== "all" && { group_by: "role", roles: String(roleId) }),
  });

  return (
    <div className="bg-accent rounded-xl p-4 shadow-sm border border-border mt-6 text-right" dir="rtl">
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-sm font-bold text-card-foreground">کاربران برتر و ضعیف</h3>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              className="cursor-pointer"
              size="icon"
              variant="outline"
              onClick={() => {
                refetch();
              }}
              disabled={isFetching}
            >
              <RefreshCcw size={14} className={isFetching ? "animate-spin" : ""} />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <RangeSelect value={range} onChange={setRange} />
          <RoleSelect value={roleId} onChange={setRoleId} />

          <div className="flex items-center gap-2 bg-card border rounded-md px-2 h-9 text-sm">
            <span className="text-muted-foreground whitespace-nowrap text-xs">معیار برترین‌ها:</span>
            <Select value={rankBy} onValueChange={setRankBy}>
              <SelectTrigger className="w-[180px] h-7 px-1 border-none bg-transparent shadow-none focus:ring-0 focus-visible:ring-0 outline-none">
                <SelectValue placeholder="مرتب سازی بر اساس" />
              </SelectTrigger>
              <SelectContent>
                {RANK_BY_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 bg-card border rounded-md px-2 h-9 text-sm cursor-help">
                  <span className="text-muted-foreground whitespace-nowrap text-xs">تعداد نمایش:</span>
                  <Input
                    type="number"
                    min={1}
                    max={20}
                    value={limit}
                    onChange={(e) => {
                      let v = parseInt(e.target.value);
                      if (isNaN(v)) v = 1;
                      if (v > 20) v = 20;
                      setLimit(v);
                    }}
                    onBlur={(e) => {
                      if (limit < 1) setLimit(1);
                    }}
                    className="w-16 h-7 px-1 border-none bg-transparent shadow-none focus-visible:ring-0 text-center"
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>تعداد باید بین ۱ تا ۲۰ باشد.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="flex items-center gap-2 bg-card border rounded-md px-2 h-9 text-sm">
            <span className="text-muted-foreground whitespace-nowrap text-xs">حداقل زمان (دقیقه):</span>
            <Input
              type="number"
              min={0}
              value={minMinutes}
              onChange={(e) => setMinMinutes(Number(e.target.value) || 0)}
              className="w-16 h-7 px-1 border-none bg-transparent shadow-none focus-visible:ring-0 text-center"
            />
          </div>
        </div>
      </div>

      <Tabs value={viewMode} onValueChange={(val) => setViewMode(val as "list" | "chart")} className="w-full" dir="rtl">
        <div className="flex justify-end mb-4 text-right">
          <TabsList className="grid w-[200px] grid-cols-2 bg-black/5 dark:bg-black/40 p-1 rounded-lg border border-black/5 dark:border-white/10 shadow-inner">
            <TabsTrigger value="list" className="flex gap-2 text-xs data-[state=active]:shadow-sm data-[state=active]:dark:bg-white/10 data-[state=active]:dark:text-white">
              <LayoutList size={14} /> لیست
            </TabsTrigger>
            <TabsTrigger value="chart" className="flex gap-2 text-xs data-[state=active]:shadow-sm data-[state=active]:dark:bg-white/10 data-[state=active]:dark:text-white">
              <BarChart3 size={14} /> نمودار
            </TabsTrigger>
          </TabsList>
        </div>

        <div className={`min-h-[400px] transition-all duration-300 ${isFetching && !isLoading ? "opacity-50 pointer-events-none" : ""}`}>
          {isLoading ? (
            <div className="flex items-center justify-center h-[300px] text-muted-foreground">در حال بارگذاری...</div>
          ) : !data || (data.top.length === 0 && data.bottom.length === 0) ? (
            <div className="flex items-center justify-center h-[300px] text-muted-foreground">اطلاعاتی یافت نشد.</div>
          ) : (
            <>
              <TabsContent value="list" className="mt-0">
                <LeaderboardList data={data} rankBy={rankBy} />
              </TabsContent>
              <TabsContent value="chart" className="mt-0">
                <LeaderboardChart data={data} rankBy={rankBy} />
              </TabsContent>
            </>
          )}
        </div>
      </Tabs>
    </div>
  );
}
