export interface DeviceCountsResponse {
  afk_count: number;
  present_count: number;
  fully_working: number;
  total_devices: number;
}

export interface OverviewStat {
  key: "total" | "present" | "active" | "afk";
  label: string;
  value: number;
}
export interface DeviceCountsResponse {
  afk_count: number;
  present_count: number;
  present_devices: string[];
  fully_working_devices: string[];
  afk_devices: string[];
  fully_working: number;
  total_devices: number;
}

export type OverviewStatKey = "total" | "present" | "active" | "afk";

export interface OverviewStat {
  key: OverviewStatKey;
  label: string;
  value: number;
}
export type PieSlice = {
  id: string;
  label: string;
  value: number;
  color: string;
};

export interface Role {
  id: number;
  name: string;
  description: string;
  device_count: number;
}

import { WorkRange } from "@/shared/types/types";

export interface LeaderboardUser {
  device_name: string;
  role: string;
  working_min: number;
  inactive_min: number;
  total_min: number;
  active_pct: number;
}

export interface LeaderboardResponse {
  range: WorkRange;
  rank_by: string;
  limit: number;
  min_minutes: number;
  from: string;
  to: string;
  ranked: number;
  top: LeaderboardUser[];
  bottom: LeaderboardUser[];
}

export interface LeaderboardParams {
  range: WorkRange;
  group_by?: string;
  roles?: string;
  rank_by?: string;
  limit?: number;
  min_minutes?: number;
}
