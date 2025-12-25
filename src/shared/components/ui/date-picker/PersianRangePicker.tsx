"use client";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { CalendarDays } from "lucide-react";
import { Button } from "@/shared/components/ui/button/Button";
import { cn } from "@/lib/utils/shadcn";

interface PersianRangePickerProps {
  value?: [Date, Date] | null;
  onChange?: (range: [Date, Date] | null) => void;
  className?: string;
}

export function PersianRangePicker({
  value,
  onChange,
  className,
}: PersianRangePickerProps) {
  return (
    <DatePicker
      range
      calendar={persian}
      locale={persian_fa}
      value={value ? value.map((d) => d) : undefined}
      onChange={(dates) => {
        if (!Array.isArray(dates) || dates.length !== 2) {
          onChange?.(null);
          return;
        }

        onChange?.([dates[0].toDate(), dates[1].toDate()]);
      }}
      calendarPosition="bottom-right"
      render={(value, openCalendar) => (
        <Button
          variant="outline"
          className={cn(
            "min-w-72 flex flex-row-reverse justify-between items-center gap-2 text-muted-foreground",
            className
          )}
          onClick={openCalendar}
        >
          <CalendarDays className="w-4 h-4" />
          {value || "انتخاب بازه تاریخ"}
        </Button>
      )}
    />
  );
}
