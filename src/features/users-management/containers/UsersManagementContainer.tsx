"use client";

import { useState } from "react";
import { UsersTable } from "../components/UsersTable/UsersTable";
import { useUsersQuery } from "../hooks/useUsersQuery";
import { Input } from "@/shared/components/ui/input/Input";

export function UsersManagementContainer() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useUsersQuery({
    page,
    pageSize,
    search,
  });

  return (
    <div className="space-y-4">
      <div className="w-full bg-card text-card-foreground rounded-2xl shadow p-4 border border-border">
        مدیریت کاربران
      </div>

      <div className="w-full space-y-4 bg-card text-card-foreground rounded-2xl shadow p-4 border border-border">
        <Input
          placeholder="جستجو کاربر..."
          value={search}
          onChange={(e) => {
            setPage(0); // reset page on search
            setSearch(e.target.value);
          }}
          className="max-w-sm text-card-foreground bg-card border-card-foreground p-2"
        />

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
