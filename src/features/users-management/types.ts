/* ============================
   UI / TABLE TYPES
============================ */

export type UserStatus = "active" | "inactive";

export interface UserTableRow {
  id: string;
  name: string;
  hostname: string;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}
