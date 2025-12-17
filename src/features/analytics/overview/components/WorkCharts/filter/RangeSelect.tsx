"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select/select";
import type { WorkRange } from "../../../types";

const RANGE_OPTIONS: { value: WorkRange; label: string }[] = [
  { value: "current_day", label: "امروز" },
  { value: "current_month", label: "ماه جاری" },
  { value: "last_3_days", label: "۳ روز اخیر" },
  { value: "last_7_days", label: "۷ روز اخیر" },
  { value: "last_30_days", label: "۳۰ روز اخیر" },
  { value: "last_3_months", label: "۳ ماه اخیر" },
  { value: "last_6_months", label: "۶ ماه اخیر" },
];

type Props = {
  value: WorkRange;
  onChange: (value: WorkRange) => void;
};

export function RangeSelect({ value, onChange }: Props) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-40">
        <SelectValue placeholder="بازه زمانی" />
      </SelectTrigger>

      <SelectContent className="bg-white">
        {RANGE_OPTIONS.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
