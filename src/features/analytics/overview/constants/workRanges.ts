import type { WorkRange } from "../types";

export const WORK_RANGES: { label: string; value: WorkRange }[] = [
  { label: "امروز", value: "current_day" },
  { label: "ماه جاری", value: "current_month" },
  { label: "۳ روز اخیر", value: "last_3_days" },
  { label: "۷ روز اخیر", value: "last_7_days" },
  { label: "۳۰ روز اخیر", value: "last_30_days" },
  { label: "۳ ماه اخیر", value: "last_3_months" },
  { label: "۶ ماه اخیر", value: "last_6_months" },
];
