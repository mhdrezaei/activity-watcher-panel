import apiClient from "@/lib/axiosClient";
import { WorkRange } from "@/shared/types/types";

export interface WorkAggregateItem {
  date: string;
  total_duration: number;
  working_duration: number;
  inactive_duration: number;
}

export interface WorkAggregatesResponse {
  range: WorkRange;
  aggregation: "hourly" | "daily" | "weekly" | "monthly";
  data: WorkAggregateItem[];
}

export async function getWorkAggregates(range: WorkRange, roleId?: number) {
  const res = await apiClient.get<WorkAggregatesResponse>(
    `/aggregates/current-day-works/`,
    { params: { range, role: roleId } },
  );

  return res.data;
}
