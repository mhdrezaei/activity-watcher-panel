import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { usersService } from "../api/usersService";
import type { PaginatedUsersResponse } from "../api/types";

const PAGE_SIZE = 10;

// 👇 تغییر: دریافت roleId به عنوان پارامتر دوم
export function useUserPicker(search: string, roleId: number | "all") {
  return useInfiniteQuery<
    PaginatedUsersResponse,
    Error,
    InfiniteData<PaginatedUsersResponse, number>,
    ["user-picker", string, number | "all"], // 👇 تغییر: اضافه شدن تایپ roleId به آرایه QueryKey
    number
  >({
    queryKey: ["user-picker", search, roleId], // 👇 تغییر: اضافه شدن roleId به کلید
    initialPageParam: 0,

    queryFn: ({ pageParam }) =>
      usersService.getAll({
        limit: PAGE_SIZE,
        offset: pageParam,
        search: search || undefined,
        // 👇 تغییر: ارسال نقش به API. اگر all بود undefined می‌فرستیم تا فیلتر نشود
        role: roleId === "all" ? undefined : roleId,
      }),

    getNextPageParam: (lastPage, pages) => {
      const loaded = pages.length * PAGE_SIZE;
      return loaded < lastPage.count ? loaded : undefined;
    },

    staleTime: 60_000,
  });
}
