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
