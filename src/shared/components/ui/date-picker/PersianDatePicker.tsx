"use client";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { CalendarDays } from "lucide-react";

import { Button } from "@/shared/components/ui/button/Button";
import { cn } from "@/lib/utils/shadcn";

/* ---------- Types ---------- */

export type DateRange = {
  from: Date | null;
  to: Date | null;
};

type PersianDatePickerProps = {
  value?: DateRange;
  onChange: (range: DateRange) => void;
  className?: string;
};

/* ---------- Component ---------- */

export function PersianDatePicker({
  value,
  onChange,
  className,
}: PersianDatePickerProps) {
  return (
    <DatePicker
      calendar={persian}
      locale={persian_fa}
      range
      value={value?.from && value?.to ? [value.from, value.to] : []}
      onChange={(dates) => {
        if (!Array.isArray(dates)) {
          onChange({ from: null, to: null });
          return;
        }

        const [from, to] = dates;

        onChange({
          from: from ? from.toDate() : null,
          to: to ? to.toDate() : null,
        });
      }}
      calendarPosition="bottom-right"
      render={(displayValue, openCalendar) => (
        <Button
          variant="outline"
          className={cn(
            "flex items-center gap-2 text-muted-foreground min-w-40",
            className
          )}
          onClick={openCalendar}
        >
          <CalendarDays className="w-4 h-4" />
          {displayValue || "انتخاب بازه تاریخ"}
        </Button>
      )}
    />
  );
}
