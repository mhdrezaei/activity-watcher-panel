"use client";

import { useQuery } from "@tanstack/react-query";
import { getDeviceCounts } from "../api/getDeviceCounts";

export function useDeviceCounts() {
  return useQuery({
    queryKey: ["device-counts"],
    queryFn: getDeviceCounts,

    staleTime: 60_000,
    refetchInterval: 60_000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    retry: 1,
  });
}
