import { useState } from "react";
import { useUsers } from "./useUsers";

export function useUserSelection() {
  const { data: users = [], isLoading } = useUsers();

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((u) => u.name.includes(search));

  return {
    users: filteredUsers,
    isLoadingUsers: isLoading,
    selectedUserId,
    selectUser: setSelectedUserId,
    search,
    setSearch,
  };
}
