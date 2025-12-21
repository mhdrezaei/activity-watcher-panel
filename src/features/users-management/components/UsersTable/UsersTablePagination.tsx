"use client";

import { Table } from "@tanstack/react-table";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select/select";

export function UsersTablePagination<T>({ table }: { table: Table<T> }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      {/* Page size */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">تعداد در هر صفحه</span>

        <Select
          value={String(table.getState().pagination.pageSize)}
          onValueChange={(v) => table.setPageSize(Number(v))}
        >
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20, 50].map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          قبلی
        </Button>

        <span className="text-sm">
          صفحه {table.getState().pagination.pageIndex + 1} از{" "}
          {table.getPageCount()}
        </span>

        <Button
          size="sm"
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          بعدی
        </Button>
      </div>
    </div>
  );
}
