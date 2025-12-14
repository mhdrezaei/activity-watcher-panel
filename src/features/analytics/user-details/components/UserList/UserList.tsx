import { Input } from "@/shared/components/ui/input";
import { User } from "../../types";

export function UserList({
  users,
  selectedId,
  onSelect,
  search,
  onSearch,
}: {
  users: User[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  search: string;
  onSearch: (v: string) => void;
}) {
  return (
    <div className="w-[320px] bg-white rounded-2xl border p-3 flex flex-col gap-3">
      <h3 className="font-semibold">لیست کاربران</h3>

      <Input
        placeholder="جستجو کاربر..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />

      <div className="flex flex-col gap-2 overflow-y-auto">
        {users.map((u) => (
          <button
            key={u.id}
            onClick={() => onSelect(u.id)}
            className={`flex items-center justify-between rounded-md p-3 text-right transition
              ${selectedId === u.id ? "bg-primary/10 border border-primary" : "hover:bg-muted"}`}
          >
            <div>
              <div className="font-medium">{u.name}</div>
              <div className="text-xs text-muted-foreground">{u.device}</div>
            </div>

            <span
              className={`text-xs ${
                u.status === "active" ? "text-green-600" : "text-gray-400"
              }`}
            >
              {u.status === "active" ? "آنلاین" : "AFK"}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
