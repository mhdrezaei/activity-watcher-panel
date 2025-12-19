"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/shared/components/ui/dialog/dialog";
import { Button } from "@/shared/components/ui/button";

type Props = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function ConfirmLogoutModal({ open, onCancel, onConfirm }: Props) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>خروج از حساب کاربری</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          آیا مطمئن هستید که می‌خواهید از حساب کاربری خود خارج شوید؟
        </p>

        <DialogFooter className="mt-4 flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            انصراف
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            خروج
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
