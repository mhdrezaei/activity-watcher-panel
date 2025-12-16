"use client";

import { useMemo, useState } from "react";
import { fakeUsers, fakeUserDetails } from "../data/fakeUsers";
import { useDebounce } from "@/shared/hooks/useDebounce";
import type { UserDetails } from "../types";

export function useUserSelection() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  const filteredUsers = useMemo(() => {
    if (!debouncedSearch) return fakeUsers;
    return fakeUsers.filter((u) => u.name.includes(debouncedSearch));
  }, [debouncedSearch]);

  const selectedUser =
    filteredUsers.find((u) => u.id === selectedUserId) ?? null;

  const userDetails: UserDetails | null = selectedUserId
    ? (fakeUserDetails.find((d) => d.userId === selectedUserId) ?? null)
    : null;

  return {
    users: filteredUsers,
    selectedUser,
    userDetails,
    search,
    setSearch,
    selectUser: setSelectedUserId,
  };
}
