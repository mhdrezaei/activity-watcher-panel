// src/features/compare/api/useCompare.ts
import { useQuery, useMutation } from "@tanstack/react-query";
import { Device, ComparePayload, CompareResponse } from "../types";
import { apiClient } from "@/lib/axiosClient";

export const useDevices = () => {
  return useQuery({
    queryKey: ["devices"],
    queryFn: async () => {
      const { data } = await apiClient.get<{ results: Device[] }>(
        "/device/?limit=100",
      );
      return data.results;
    },
  });
};

export const useCompareMutation = () => {
  return useMutation({
    mutationFn: async (payload: ComparePayload) => {
      const { data } = await apiClient.post<CompareResponse>(
        "/analyze/compare/",
        payload,
      );
      return data;
    },
  });
};
