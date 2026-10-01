import { useQuery } from "@tanstack/react-query";
import { getLeaderboard } from "../api/getLeaderboard";
import { LeaderboardParams } from "../types";

export function useLeaderboard(params: LeaderboardParams) {
  return useQuery({
    queryKey: ["leaderboard", params],
    queryFn: () => getLeaderboard(params),
  });
}
