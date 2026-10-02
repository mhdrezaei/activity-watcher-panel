import apiClient from "@/lib/axiosClient";
import { WorksPerRoleResponse, WorksPerRoleParams } from "../types";

export async function getWorksPerRole(params: WorksPerRoleParams) {
  const res = await apiClient.get<WorksPerRoleResponse>(
    `/aggregates/works-per-role/`,
    { params },
  );

  return res.data;
}
