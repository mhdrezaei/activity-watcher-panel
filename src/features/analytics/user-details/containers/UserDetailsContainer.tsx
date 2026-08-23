"use client";

import { useState } from "react";
import { UserDetailsPanel } from "../components/UserDetailsPanel";
import { UserList } from "../components/UserList/UserList";
import { useUserSelection } from "../hooks/useUserSelection";

export function UserDetailsContainer() {
  const [roleId, setRoleId] = useState<number | "all">("all");

  const {
    users,
    isLoadingUsers,
    selectedUserId,
    selectUser,
    search,
    setSearch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useUserSelection(roleId);
  return (
    // 👇 در موبایل زیر هم و در دسکتاپ کنار هم قرار می‌گیرند
    <div className="flex flex-col lg:flex-row gap-4 w-full">
      <UserList
        roleId={roleId}
        onRoleChange={setRoleId}
        users={users}
        selectedId={selectedUserId}
        onSelect={selectUser}
        search={search}
        onSearch={setSearch}
        isLoading={isLoadingUsers}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />

      {!selectedUserId ? <div /> : <UserDetailsPanel userId={selectedUserId} />}
    </div>
  );
}
