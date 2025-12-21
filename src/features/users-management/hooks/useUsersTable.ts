/* eslint-disable react-hooks/incompatible-library */
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  PaginationState,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { UserTableRow } from "../types";
import { usersTableColumns } from "../components/UsersTable/columns";

const PAGE_SIZE_KEY = "users.table.pageSize";
const PAGE_INDEX_KEY = "users.table.pageIndex";

function getInitialPagination(): PaginationState {
  if (typeof window === "undefined") {
    return { pageIndex: 0, pageSize: 2 };
  }

  const pageSize = Number(localStorage.getItem(PAGE_SIZE_KEY)) || 2;
  const pageIndex = Number(localStorage.getItem(PAGE_INDEX_KEY)) || 0;

  return { pageIndex, pageSize };
}

export function useUsersTable(data: UserTableRow[]) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] =
    useState<PaginationState>(getInitialPagination);

  // 🔹 persist pagination
  useEffect(() => {
    localStorage.setItem(PAGE_SIZE_KEY, String(pagination.pageSize));
    localStorage.setItem(PAGE_INDEX_KEY, String(pagination.pageIndex));
  }, [pagination]);

  const table = useReactTable({
    data,
    columns: usersTableColumns,

    state: {
      sorting,
      globalFilter,
      pagination,
    },

    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    // 👇 Pagination client-side
    getPaginationRowModel: getPaginationRowModel(),
  });

  return {
    table,
    globalFilter,
    setGlobalFilter,
  };
}
