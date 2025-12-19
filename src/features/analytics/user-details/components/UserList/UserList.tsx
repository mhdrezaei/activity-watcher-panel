import { Input } from "@/shared/components/ui/input";
import { User } from "../../types";
import { User2 } from "lucide-react";
import { UserListSkeleton } from "../skeletons/UserListSkeleton";

export function UserList({
  users,
  selectedId,
  onSelect,
  search,
  onSearch,
  isLoading,
}: {
  users: User[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  search: string;
  onSearch: (v: string) => void;
  isLoading: boolean;
}) {
  console.log(isLoading, "loading");
  console.log(users, "loading");
  return (
    <div className="min-w-96 min-h-96 bg-white rounded-2xl border p-3 flex flex-col gap-3">
      <h3 className="font-semibold">لیست کاربران</h3>

      <Input
        placeholder="جستجو کاربر..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />

      <div className="flex flex-col gap-2 overflow-y-auto">
        {isLoading || users.length === 0 ? (
          <UserListSkeleton />
        ) : (
          users.map((u) => (
            <button
              key={u.id}
              onClick={() => onSelect(u.id)}
              className={`flex items-center justify-start gap-3 rounded-md p-3 text-right transition
              ${selectedId === u.id ? " border border-primary" : "hover:bg-muted"}`}
            >
              <div className="p-2  bg-[#F2F4FC] rounded-md">
                <User2 size={16} color="#5340EB" />
              </div>
              <div className="flex flex-col justify-start items-start gap-2 ">
                <div
                  className={`text-sm font-medium ${selectedId === u.id ? "text-primary" : ""}`}
                >
                  {u.name}
                </div>
                <div className="flex justify-start items-center gap-2">
                  <div className="text-xs text-gray-400">
                    دستگاه : {u.hostname}
                  </div>
                  <div
                    className={`text-xs mr-auto ${
                      u.active ? "text-green-600" : "text-gray-400"
                    }`}
                  >
                    <span className="text-gray-400">وضعیت : </span>
                    {u.active ? "آنلاین" : "AFK"}
                  </div>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
