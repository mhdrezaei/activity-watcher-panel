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

export type WorkRange =
  | "current_day"
  | "current_month"
  | "last_3_days"
  | "last_7_days"
  | "last_30_days"
  | "last_3_months"
  | "last_6_months";
