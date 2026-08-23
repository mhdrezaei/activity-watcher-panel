// src/features/users-management/components/UsersTable/columns.ts
import { ColumnDef } from "@tanstack/react-table";
import { UserTableRow } from "../../types";
import { Badge } from "@/shared/components/ui/badge/Badge";
import { ActiveToggleCell } from "./ActiveToggleCell";
import { EditUserCell } from "./EditUserCell";

export const usersTableColumns: ColumnDef<UserTableRow>[] = [
  {
    accessorKey: "name",
    header: "نام کاربر",
  },
  {
    accessorKey: "hostname",
    header: "نام سیستم",
  },
  {
    accessorKey: "role_name",
    header: "نقش",
  },
  {
    accessorKey: "status",
    header: "وضعیت",
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return (
        <Badge variant={value === "active" ? "default" : "destructive"}>
          {value === "active" ? "فعال" : "غیرفعال"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "تاریخ ایجاد",
    // 👇 تغییر کلیدی: ارسال کلاس‌های مخفی‌کننده برای موبایل
    meta: {
      className: "hidden md:table-cell",
    },
  },
  {
    id: "toggle",
    header: "فعال / غیرفعال",
    cell: ({ row }) => (
      <ActiveToggleCell
        id={row.original.id}
        active={row.original.status === "active"}
      />
    ),
  },
  {
    id: "edit",
    header: "",
    cell: ({ row }) => <EditUserCell user={row.original} />,
  },
];
