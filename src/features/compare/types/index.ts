// src/features/compare/types/index.ts

export interface Device {
  id: string;
  name: string;
  hostname: string;
  active: boolean;
  role?: string | null;
}

export interface ComparePayload {
  device_a: string;
  device_b: string;
  range_key: "current_day" | "last_2_days" | "last_3_days" | "last_7_days";
}

export interface TimeSeriesData {
  date: string;
  total_duration: number;
  working_duration: number;
  inactive_duration: number;
  active_pct: number;
}

export interface DeviceStats {
  id: string;
  name: string;
  role: string | null;
  totals: {
    active_min: number;
    inactive_min: number;
    total_min: number;
    active_pct: number;
  };
  timeseries: TimeSeriesData[];
  top_urls: string;
  top_apps: string;
  invalid_urls: string;
  invalid_apps: string;
  longest_afk: {
    duration: string;
    period: string;
  };
}

export interface CompareResponse {
  range_key: string;
  aggregation: "hourly" | "daily" | string;
  start: string;
  end: string;
  devices: {
    a: DeviceStats;
    b: DeviceStats;
  };
  comparison: {
    active_diff_min: number;
    inactive_diff_min: number;
    total_diff_min: number;
    active_pct_diff: number;
    more_active: string;
  };
}
