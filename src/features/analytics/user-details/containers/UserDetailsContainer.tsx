"use client";

import { UserDetailsPanel } from "../components/UserDetailsPanel";
import { UserList } from "../components/UserList/UserList";
import { useUserSelection } from "../hooks/useUserSelection";

export function UserDetailsContainer() {
  const {
    users,
    isLoadingUsers,
    selectedUserId,
    selectUser,
    search,
    setSearch,
  } = useUserSelection();

  return (
    <div className="flex gap-4 w-full">
      <UserList
        users={users}
        selectedId={selectedUserId}
        onSelect={selectUser}
        search={search}
        onSearch={setSearch}
        isLoading={isLoadingUsers}
      />

      {!selectedUserId ? (
        <div></div>
      ) : (
        <UserDetailsPanel userId={selectedUserId} />
      )}
    </div>
  );
}
