"use client";

import { useEffect, useRef } from "react";
import { Input } from "@/shared/components/ui/input/Input";
import { User2 } from "lucide-react";
import { UserListSkeleton } from "../skeletons/UserListSkeleton";
import type { User } from "../../types";

// 👇 تغییر: ایمپورت کامپوننت انتخاب نقش (مسیر ایمپورت را در صورت نیاز بر اساس پوشه‌بندی خود تنظیم کنید)
import { RoleSelect } from "@/shared/components/ui/select-role/RoleSelect";

type Props = {
  users: User[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  search: string;
  onSearch: (v: string) => void;
  isLoading: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  // 👇 تغییر: اضافه شدن پراپ‌های مربوط به فیلتر نقش
  roleId: number | "all";
  onRoleChange: (id: number | "all") => void;
};

export function UserList({
  users,
  selectedId,
  onSelect,
  search,
  onSearch,
  isLoading,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  roleId,
  onRoleChange,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      if (
        el.scrollTop + el.clientHeight >= el.scrollHeight - 40 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <div className="w-full lg:min-w-96 lg:w-96 shrink-0 bg-card text-card-foreground rounded-2xl border p-3 flex flex-col gap-3 max-h-[300px] lg:max-h-[650px] transition-all">
      <h3 className="font-semibold px-2 hidden lg:block">لیست کاربران</h3>

      {/* 👇 تغییر: قرار گرفتن جستجو و فیلتر نقش در یک ردیف */}
      <div className="flex items-center gap-2">
        <Input
          placeholder="جستجو کاربر..."
          className="border-border p-2 flex-1"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
        <RoleSelect value={roleId} onChange={onRoleChange} />
      </div>

      <div
        ref={containerRef}
        className="flex flex-col gap-2 overflow-y-auto custom-scrollbar flex-1 pl-2"
      >
        {isLoading && users.length === 0 ? (
          <UserListSkeleton />
        ) : (
          users.map((u) => (
            <button
              key={u.id}
              onClick={() => onSelect(u.id)}
              className={`flex items-center gap-3 rounded-md p-3 transition
                ${
                  selectedId === u.id
                    ? "border border-primary bg-primary/5"
                    : "hover:bg-muted"
                }`}
            >
              <div className="p-2 bg-[#F2F4FC] rounded-md shrink-0">
                <User2 size={16} color="#5340EB" />
              </div>

              <div className="flex flex-col items-start gap-1 overflow-hidden">
                <div
                  className={`text-sm font-medium truncate w-full text-right ${
                    selectedId === u.id ? "text-primary" : ""
                  }`}
                >
                  {u.name}
                </div>

                <div className="text-xs text-gray-400 truncate w-full text-right">
                  دستگاه : {u.hostname}
                </div>
              </div>
            </button>
          ))
        )}

        {isFetchingNextPage && <UserListSkeleton />}
      </div>
    </div>
  );
}
