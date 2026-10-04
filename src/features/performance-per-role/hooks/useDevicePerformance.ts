// src/features/analytics/overview/hooks/useDevicePerformance.ts
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axiosClient";
import type { DevicePerformanceResponse, PerformanceMetric } from "../types";
import { WorkRange } from "@/shared/types/types";

const fetchDevicePerformance = async (
  range: WorkRange,
  roleId: number | "all",
  metric: PerformanceMetric,
): Promise<DevicePerformanceResponse> => {
  const params = new URLSearchParams({
    range,
    metric,
  });

  if (roleId !== "all") {
    params.append("role", roleId.toString());
  }

  const { data } = await apiClient.get<DevicePerformanceResponse>(
    "/aggregates/works-per-device/",
    { params },
  );

  return data;
};

export const useDevicePerformance = (
  range: WorkRange,
  roleId: number | "all",
  metric: PerformanceMetric,
) => {
  return useQuery({
    queryKey: ["analytics", "works-per-device", range, roleId, metric],
    queryFn: () => fetchDevicePerformance(range, roleId, metric),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
};
