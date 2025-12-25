"use client";

import { Button } from "@/shared/components/ui/button/Button";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { RotateCcw } from "lucide-react";
import { PersianDatePicker } from "@/shared/components/ui/date-picker";
import { PeriodMode } from "../hooks/useUserDetailsFilters";

type Props = {
  period: PeriodMode;
  onPeriodChange: (p: PeriodMode) => void;
  onReset: () => void;
  onDateChange: (range: { from: Date | null; to: Date | null }) => void;
};

export function UserDetailsHeader({
  period,
  onPeriodChange,
  onReset,
  onDateChange,
}: Props) {
  return (
    <div className="flex items-center justify-between gap-4 bg-card text-card-foreground rounded-2xl border border-card-foreground p-4">
      {/* Title */}
      <h3 className="font-semibold text-base">جزئیات فعالیت</h3>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" onClick={onReset}>
          <RotateCcw className="w-4 h-4" />
        </Button>

        <PersianDatePicker onChange={onDateChange} />

        <Tabs
          value={period}
          onValueChange={(v) => onPeriodChange(v as PeriodMode)}
        >
          <TabsList>
            <TabsTrigger value="daily">روزانه</TabsTrigger>
            <TabsTrigger value="weekly">هفتگی</TabsTrigger>
            <TabsTrigger value="monthly">ماهانه</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
