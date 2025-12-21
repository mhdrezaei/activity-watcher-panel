import { formatToJalali } from "@/lib/utils/date";
import type { UserApiResponse } from "../api/types";
import { UserTableRow } from "../types";

export function mapUsersToTable(data: UserApiResponse[]): UserTableRow[] {
  return data.map((u) => ({
    id: u.id,
    name: u.name,
    hostname: u.hostname,
    status: u.active ? "active" : "inactive",
    createdAt: formatToJalali(u.created),
    updatedAt: formatToJalali(u.updated),
  }));
}
