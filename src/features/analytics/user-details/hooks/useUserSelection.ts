import { useState, useMemo } from "react";
import { useUserPicker } from "./useUserPicker";

export function useUserSelection() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useUserPicker(search);

  // ✅ data از نوع InfiniteData است
  const users = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((page) => page.results);
  }, [data]);

  return {
    users,
    isLoadingUsers: isLoading,
    selectedUserId,
    selectUser: setSelectedUserId,
    search,
    setSearch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
