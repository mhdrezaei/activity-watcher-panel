"use client";

import { flexRender } from "@tanstack/react-table";
import { useUsersTable } from "../../hooks/useUsersTable";
import { UserTableRow } from "../../types";
import { UsersTablePagination } from "./UsersTablePagination";

type Props = {
  data: UserTableRow[];
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

export function UsersTable({
  data,
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
}: Props) {
  const { table } = useUsersTable(data);

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border bg-white">
        <table className="w-full border-collapse">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((h) => (
                  <th
                    key={h.id}
                    title={`مرتب سازی بر اساس ${flexRender(
                      h.column.columnDef.header,
                      h.getContext()
                    )}`}
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

      <UsersTablePagination
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
}
