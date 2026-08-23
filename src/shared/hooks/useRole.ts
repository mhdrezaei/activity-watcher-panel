// src/features/analytics/overview/hooks/useRoles.ts
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axiosClient";

export interface Role {
  id: number;
  name: string;
  description: string;
  device_count: number;
}
const getRoles = async (): Promise<Role[]> => {
  const response = await apiClient.get("/device/get-roles");
  return response.data?.data || [];
};

export function useRoles() {
  return useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
