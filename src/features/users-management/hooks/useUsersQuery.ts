import { useQuery } from "@tanstack/react-query";
import { usersService } from "../api/users.service";
import { mapUsersToTable } from "../transformers/mapUsersToTable";

type Params = {
  page: number;
  pageSize: number;
  search: string;
  roleId?: number | "all"; // اضافه شدن تایپ نقش
};

export function useUsersQuery({ page, pageSize, search, roleId }: Params) {
  const offset = page * pageSize;

  return useQuery({
    // اضافه شدن roleId به آرایه queryKey برای رفرش شدن دیتا هنگام تغییر فیلتر
    queryKey: ["users-management", page, pageSize, search, roleId],
    queryFn: () =>
      usersService.getUsers({
        limit: pageSize,
        offset,
        search: search || undefined,
        role: roleId === "all" ? undefined : roleId, // ارسال به سرویس
      }),
    select: (res) => ({
      rows: mapUsersToTable(res.results),
      total: res.count,
    }),
    placeholderData: (prev) => prev,
    staleTime: 60_000,
  });
}
