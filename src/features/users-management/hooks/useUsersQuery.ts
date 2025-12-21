import { useQuery } from "@tanstack/react-query";
import { usersService } from "../api/users.service";
import { mapUsersToTable } from "../transformers/mapUsersToTable";

export function useUsersQuery() {
  return useQuery({
    queryKey: ["users-management"],
    queryFn: usersService.getUsers,
    select: mapUsersToTable,
    staleTime: 60_000,
  });
}
