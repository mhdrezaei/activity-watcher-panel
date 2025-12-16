"use client";

import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Button } from "@/shared/components/ui/button";
import { RotateCcw } from "lucide-react";
import { PersianRangePicker } from "@/shared/components/ui/date-picker";
import { useState } from "react";

export type ChartRange = "daily" | "weekly" | "monthly";

interface ChartFiltersProps {
  range: ChartRange;
  onRangeChange: (range: ChartRange) => void;
  onDateChange?: (date: Date | null) => void;
  onRefresh?: () => void;
}

export function ChartFilters({
  range,
  onRangeChange,
  onRefresh,
}: ChartFiltersProps) {
  const [rangeDate, setRangeDate] = useState<[Date, Date] | null>(null);
  return (
    <div className="flex flex-row-reverse items-center justify-end gap-3 w-full">
      {/* Left actions */}
      <div className="flex flex-row-reverse items-center gap-4">
        {/* Refresh */}
        <Button
          variant="outline"
          size="icon"
          onClick={onRefresh}
          className="rounded-full bg-white"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>

        {/* Date picker trigger (placeholder فعلاً) */}
        <PersianRangePicker
          value={rangeDate}
          onChange={(range) => setRangeDate(range)}
        />
      </div>

      {/* Tabs */}
      <Tabs value={range} onValueChange={(v) => onRangeChange(v as ChartRange)}>
        <TabsList className="bg-muted p-1 rounded-full">
          <TabsTrigger
            value="daily"
            className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow"
          >
            روزانه
          </TabsTrigger>

          <TabsTrigger
            value="weekly"
            className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow"
          >
            هفتگی
          </TabsTrigger>

          <TabsTrigger
            value="monthly"
            className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow"
          >
            ماهانه
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
