"use client";

import { Button } from "@/shared/components/ui/button/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select/Select";

type Props = {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

export function UsersTablePagination({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
}: Props) {
  const pageCount = Math.ceil(total / pageSize);

  return (
    <div className="flex items-center justify-between gap-4 py-3">
      {/* Page size */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">تعداد در هر صفحه</span>

        <Select
          value={String(pageSize)}
          onValueChange={(v) => onPageSizeChange(Number(v))}
        >
          <SelectTrigger className="w-20 border-accent-foreground [&_svg:not([class*='text-'])]:text-accent-foreground">
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
          onClick={() => onPageChange(page - 1)}
          disabled={page === 0}
        >
          قبلی
        </Button>

        <span className="text-sm">
          صفحه {page + 1} از {pageCount}
        </span>

        <Button
          size="sm"
          variant="outline"
          onClick={() => onPageChange(page + 1)}
          disabled={page + 1 >= pageCount}
        >
          بعدی
        </Button>
      </div>
    </div>
  );
}
