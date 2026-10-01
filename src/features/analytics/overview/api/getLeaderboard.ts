import apiClient from "@/lib/axiosClient";
import { WorkRange } from "@/shared/types/types";
import { LeaderboardResponse, LeaderboardParams } from "../types";

export async function getLeaderboard(params: LeaderboardParams) {
  const res = await apiClient.get<LeaderboardResponse>(
    `/aggregates/leaderboard/`,
    { params },
  );

  return res.data;
}
