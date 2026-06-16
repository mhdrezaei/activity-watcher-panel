"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog/dialog";
import { UserTableRow } from "../../types";
import { EditUserForm } from "./EditUserForm";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  user: UserTableRow;
};

export function EditUserDialog({ open, onOpenChange, user }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-start">ویرایش کاربر</DialogTitle>
        </DialogHeader>

        <EditUserForm user={user} onClose={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
