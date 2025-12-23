import { useQuery } from "@tanstack/react-query";
import { usersService } from "../api/users.service";
import { mapUsersToTable } from "../transformers/mapUsersToTable";

type Params = {
  page: number;
  pageSize: number;
  search: string;
};

export function useUsersQuery({ page, pageSize, search }: Params) {
  const offset = page * pageSize;

  return useQuery({
    queryKey: ["users-management", page, pageSize, search],
    queryFn: () =>
      usersService.getUsers({
        limit: pageSize,
        offset,
        search: search || undefined,
      }),
    select: (res) => ({
      rows: mapUsersToTable(res.results),
      total: res.count,
    }),
    placeholderData: (prev) => prev,
    staleTime: 60_000,
  });
}
