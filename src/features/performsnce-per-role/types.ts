import { WorkRange } from "@/shared/types/types";

export type PerformanceMetric = "working" | "inactive";

export interface DevicePerformanceSeries {
  device_name: string;
  data: number[];
  total_min: number;
}

export interface DevicePerformanceResponse {
  range: WorkRange;
  aggregation: string;
  metric: PerformanceMetric;
  role: number | null;
  from: string;
  to: string;
  labels: string[];
  series: DevicePerformanceSeries[];
}
