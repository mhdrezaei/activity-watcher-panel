// src/features/users-management/components/UsersTable/UsersTable.tsx
"use client";

import { flexRender } from "@tanstack/react-table";
import { useUsersTable } from "../../hooks/useUsersTable";
import { UserTableRow } from "../../types";
import { UsersTablePagination } from "./UsersTablePagination";

export function UsersTable({ data }: { data: UserTableRow[] }) {
  const { table } = useUsersTable(data);

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border bg-white">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((h) => (
                  <th
                    key={h.id}
                    title={`مرتب سازی بر اساس ${flexRender(h.column.columnDef.header, h.getContext())}`}
                    className="p-3 text-right text-sm text-primary hover:bg-primary/10 border-b cursor-pointer"
                    onClick={h.column.getToggleSortingHandler()}
                  >
                    {flexRender(h.column.columnDef.header, h.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b hover:bg-primary/10">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-3 text-gray-700">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <UsersTablePagination table={table} />
    </div>
  );
}
