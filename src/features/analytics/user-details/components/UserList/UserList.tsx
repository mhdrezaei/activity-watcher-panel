"use client";

import { useEffect, useRef } from "react";
import { Input } from "@/shared/components/ui/input";
import { User2 } from "lucide-react";
import { UserListSkeleton } from "../skeletons/UserListSkeleton";
import type { User } from "../../types";

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
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  // 👇 infinite scroll
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
    <div className="min-w-96 bg-white rounded-2xl border p-3 flex flex-col gap-3 max-h-[650px]">
      <h3 className="font-semibold">لیست کاربران</h3>

      <Input
        placeholder="جستجو کاربر..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />

      {/* 👇 ارتفاع ثابت + اسکرول داخلی */}
      <div
        ref={containerRef}
        className="flex flex-col gap-2 overflow-y-auto max-h-[650px]"
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
                    ? "border border-primary"
                    : "hover:bg-muted"
                }`}
            >
              <div className="p-2 bg-[#F2F4FC] rounded-md">
                <User2 size={16} color="#5340EB" />
              </div>

              <div className="flex flex-col items-start gap-1">
                <div
                  className={`text-sm font-medium ${
                    selectedId === u.id ? "text-primary" : ""
                  }`}
                >
                  {u.name}
                </div>

                <div className="text-xs text-gray-400">
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
