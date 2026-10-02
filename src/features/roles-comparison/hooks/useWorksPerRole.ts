import { useQuery } from "@tanstack/react-query";
import { getWorksPerRole } from "../api/getWorksPerRole";
import { WorksPerRoleParams } from "../types";

export function useWorksPerRole(params: WorksPerRoleParams) {
  return useQuery({
    queryKey: ["works-per-role", params],
    queryFn: () => getWorksPerRole(params),
  });
}
