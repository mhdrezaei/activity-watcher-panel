"use client";
import { UserDetailsPanel } from "../components/UserDetailsPanel";
import { UserList } from "../components/UserList/UserList";
import { useUserSelection } from "../hooks/useUserSelection";

export function UserDetailsContainer() {
  const { users, selectedUser, userDetails, selectUser, search, setSearch } =
    useUserSelection();

  return (
    <div className="flex gap-4 w-full">
      <UserList
        users={users}
        selectedId={selectedUser?.id ?? null}
        onSelect={selectUser}
        search={search}
        onSearch={setSearch}
      />
      <UserDetailsPanel user={selectedUser} details={userDetails} />
    </div>
  );
}
