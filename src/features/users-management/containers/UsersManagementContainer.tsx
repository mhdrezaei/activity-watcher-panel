"use client";

import { useState } from "react";
import { UsersTable } from "../components/UsersTable/UsersTable";
import { useUsersQuery } from "../hooks/useUsersQuery";
import { Input } from "@/shared/components/ui/input/Input";
import { RoleSelect } from "@/shared/components/ui/select-role/RoleSelect";

export function UsersManagementContainer() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  // استیت مربوط به فیلتر نقش
  const [roleId, setRoleId] = useState<number | "all">("all");

  const { data, isLoading } = useUsersQuery({
    page,
    pageSize,
    search,
    roleId, // ارسال نقش انتخاب شده به هوک
  });

  return (
    <div className="space-y-4">
      <div className="w-full bg-card text-card-foreground rounded-2xl shadow p-4 border border-border">
        مدیریت کاربران
      </div>

      <div className="w-full space-y-4 bg-card text-card-foreground rounded-2xl shadow p-4 border border-border">
        {/* جستجو و فیلتر نقش در یک ردیف قرار گرفتند */}
        <div className="flex items-center gap-3">
          <Input
            placeholder="جستجو کاربر..."
            value={search}
            onChange={(e) => {
              setPage(0); // ریست کردن صفحه هنگام جستجو
              setSearch(e.target.value);
            }}
            className="max-w-sm text-card-foreground bg-card border-card-foreground p-2"
          />

          <RoleSelect
            value={roleId}
            onChange={(val) => {
              setPage(0); // ریست کردن صفحه هنگام تغییر فیلتر
              setRoleId(val);
            }}
          />
        </div>

        {isLoading ? (
          <div className="w-full text-center py-10 animate-pulse">
            در حال بارگذاری...
          </div>
        ) : (
          <UsersTable
            data={data?.rows ?? []}
            page={page}
            pageSize={pageSize}
            total={data?.total ?? 0}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        )}
      </div>
    </div>
  );
}
