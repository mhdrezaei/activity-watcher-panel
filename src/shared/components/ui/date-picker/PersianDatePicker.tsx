"use client";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { CalendarDays } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/lib/utils/shadcn";

interface PersianDatePickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  className?: string;
}

export function PersianDatePicker({
  value,
  onChange,
  className,
}: PersianDatePickerProps) {
  return (
    <DatePicker
      calendar={persian}
      locale={persian_fa}
      value={value}
      onChange={(date) => onChange?.(date?.toDate() ?? null)}
      calendarPosition="bottom-right"
      render={(value, openCalendar) => (
        <Button
          variant="outline"
          className={cn(
            "flex items-center gap-2 text-muted-foreground",
            className
          )}
          onClick={openCalendar}
        >
          <CalendarDays className="w-4 h-4" />
          {value || "انتخاب تاریخ"}
        </Button>
      )}
    />
  );
}
