import { useQuery } from "@tanstack/react-query";
import { getWorkAggregates } from "../api/workAggregatesService";
import { mapAggregatesToBar } from "../transformers/mapAggregatesToBar";
import type { WorkRange } from "../types";

export function useWorkAggregates(range: WorkRange) {
  return useQuery({
    queryKey: ["work-aggregates", range],
    queryFn: () => getWorkAggregates(range),
    select: mapAggregatesToBar,
    placeholderData: (prev) => prev,
    staleTime: 60_000,
  });
}
