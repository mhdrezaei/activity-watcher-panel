"use client";

import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs/Tabs";

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
  // onRefresh,
}: ChartFiltersProps) {
  // cost [rangeDate, setRangeDate] = useState<[Date, Date] | null>(null);
  return (
    <div className="flex flex-row-reverse items-center justify-end gap-3">
      {/* Tabs */}
      <Tabs value={range} onValueChange={(v) => onRangeChange(v as ChartRange)}>
        <TabsList className="bg-muted p-1 rounded-full">
          <TabsTrigger
            value="daily"
            className="rounded-full data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow"
          >
            روزانه
          </TabsTrigger>

          <TabsTrigger
            value="weekly"
            className="rounded-full data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow"
          >
            هفتگی
          </TabsTrigger>

          <TabsTrigger
            value="monthly"
            className="rounded-full data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow"
          >
            ماهانه
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
