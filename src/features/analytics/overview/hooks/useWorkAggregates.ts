// src/features/analytics/overview/hooks/useWorkAggregates.ts
import { useQuery } from "@tanstack/react-query";
import { getWorkAggregates } from "../api/workAggregatesService";
import { mapAggregatesToBar } from "../transformers/mapAggregatesToBar";
import type { WorkRange } from "../types";

export function useWorkAggregates(range: WorkRange, roleId?: number) {
  return useQuery({
    queryKey: ["work-aggregates", range, roleId],
    queryFn: () => getWorkAggregates(range, roleId),
    select: mapAggregatesToBar,
    placeholderData: (prev) => prev,
    staleTime: 60_000,
  });
}
