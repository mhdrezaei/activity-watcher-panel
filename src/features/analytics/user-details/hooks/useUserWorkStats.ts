import { useQuery } from "@tanstack/react-query";
import { userStatusService } from "../api";
import type { WorkRange, UserWorkAggregatesResponse } from "../types";

export function useUserWorkStats(userId: string, range: WorkRange) {
  return useQuery<UserWorkAggregatesResponse>({
    queryKey: ["user-work-stats", userId, range],
    queryFn: () => userStatusService.getWorkAggregates(userId, range),
    enabled: !!userId,
    staleTime: 60_000,
  });
}
