import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { usersService } from "../api/usersService";
import type { PaginatedUsersResponse } from "../api/types";

const PAGE_SIZE = 10;

export function useUserPicker(search: string) {
  return useInfiniteQuery<
    PaginatedUsersResponse,
    Error,
    InfiniteData<PaginatedUsersResponse, number>,
    ["user-picker", string],
    number
  >({
    queryKey: ["user-picker", search],
    initialPageParam: 0,

    queryFn: ({ pageParam }) =>
      usersService.getAll({
        limit: PAGE_SIZE,
        offset: pageParam,
        search: search || undefined,
      }),

    getNextPageParam: (lastPage, pages) => {
      const loaded = pages.length * PAGE_SIZE;
      return loaded < lastPage.count ? loaded : undefined;
    },

    staleTime: 60_000,
  });
}
