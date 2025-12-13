import { useEffect, useState } from "react";
import {
  barData,
  pieData,
} from "@/app/(dashboard)/dashboard/components/GeneralStatusWorkCharts/chartData";

export function useGeneralStatusData() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // شبیه‌سازی API call
    const t = setTimeout(() => {
      setIsLoading(false);
    }, 3200);

    return () => clearTimeout(t);
  }, []);

  return {
    isLoading,
    barData,
    pieData,
  };
}
