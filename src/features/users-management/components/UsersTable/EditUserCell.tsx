"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { EditUserDialog } from "../EditUserDialog/EditUserDialog";
import { UserTableRow } from "../../types";

export function EditUserCell({ user }: { user: UserTableRow }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded hover:bg-gray-100"
      >
        <Pencil size={16} />
      </button>

      <EditUserDialog open={open} onOpenChange={setOpen} user={user} />
    </>
  );
}
