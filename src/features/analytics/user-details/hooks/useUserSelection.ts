import { useState, useMemo } from "react";
import { useUserPicker } from "./useUserPicker";

// 👇 تغییر: دریافت roleId به عنوان پارامتر ورودی
export function useUserSelection(roleId: number | "all") {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // 👇 تغییر: ارسال roleId به هوک useUserPicker
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useUserPicker(search, roleId);

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
