"use client";

import { UsersTable } from "../components/UsersTable/UsersTable";
import { useUsersQuery } from "../hooks/useUsersQuery";
import { useUsersTable } from "../hooks/useUsersTable";
import { Input } from "@/shared/components/ui/input";

export function UsersManagementContainer() {
  const { data = [], isLoading } = useUsersQuery();
  const table = useUsersTable(data);

  const filtered = data.filter((u) => u.name.includes(table.globalFilter));

  return (
    <div className="space-y-4">
      <div className="w-full bg-white rounded-2xl shadow p-4 border border-gray-100">
        مدیریت کاربران
      </div>

      <div className="w-full space-y-4 bg-white rounded-2xl shadow p-4 border border-gray-100">
        <Input
          placeholder="جستجو کاربر..."
          value={table.globalFilter}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />

        {isLoading ? (
          <div className="w-full text-center py-10 animate-pulse">
            در حال بارگذاری...
          </div>
        ) : (
          <UsersTable data={filtered} />
        )}
      </div>
    </div>
  );
}
