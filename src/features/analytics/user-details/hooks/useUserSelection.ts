"use client";
import { useMemo, useState } from "react";
import { fakeUsers, fakeUserDetails } from "../data/fakeUsers";
import { useDebounce } from "@/shared/hooks/useDebounce";

export function useUserSelection() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(
    fakeUsers[0]?.id ?? null
  );
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  const filteredUsers = useMemo(() => {
    if (!debouncedSearch) return fakeUsers;

    return fakeUsers.filter((u) => u.name.includes(debouncedSearch));
  }, [debouncedSearch]);

  const selectedUser =
    filteredUsers.find((u) => u.id === selectedUserId) ?? null;

  const userDetails = selectedUserId ? fakeUserDetails[selectedUserId] : null;

  return {
    users: filteredUsers,
    selectedUser,
    userDetails,
    search,
    setSearch,
    selectUser: setSelectedUserId,
  };
}
