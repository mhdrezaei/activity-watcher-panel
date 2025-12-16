import { useState } from "react";

export type PeriodMode = "daily" | "weekly" | "monthly";

export function useUserDetailsFilters() {
  const [period, setPeriod] = useState<PeriodMode>("daily");
  const [dateRange, setDateRange] = useState<{
    from: Date | null;
    to: Date | null;
  }>({
    from: null,
    to: null,
  });

  function resetFilters() {
    setPeriod("daily");
    setDateRange({ from: null, to: null });
  }

  return {
    period,
    setPeriod,
    dateRange,
    setDateRange,
    resetFilters,
  };
}
