import { useQuery } from "@tanstack/react-query";
import { userStatusService } from "../api";

export function useUserCurrentStatus(userId: string) {
  return useQuery({
    queryKey: ["user-current-status", userId],
    queryFn: () => userStatusService.getCurrentStatus(userId),
  });
}
