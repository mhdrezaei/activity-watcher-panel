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
