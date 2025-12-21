import { ColumnDef } from "@tanstack/react-table";
import { UserTableRow } from "../../types";
import { Badge } from "@/shared/components/ui/badge";

export const usersTableColumns: ColumnDef<UserTableRow>[] = [
  {
    accessorKey: "name",
    header: "نام",
  },
  {
    accessorKey: "hostname",
    header: "دستگاه",
  },
  {
    accessorKey: "status",
    header: "وضعیت",
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return (
        <Badge variant={value === "active" ? "default" : "secondary"}>
          {value === "active" ? "فعال" : "غیرفعال"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "تاریخ ایجاد",
  },
];
