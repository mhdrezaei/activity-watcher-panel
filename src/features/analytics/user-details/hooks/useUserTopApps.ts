import { useQuery } from "@tanstack/react-query";
import { userStatusService } from "../api";
import type { TopAppsResponse } from "../types";

export function useUserTopApps(userId: string) {
  return useQuery<TopAppsResponse>({
    queryKey: ["user-top-apps", userId],
    queryFn: () => userStatusService.getTopApps(userId),
    enabled: !!userId,
    staleTime: 60_000,
  });
}
