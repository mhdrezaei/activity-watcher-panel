"use client";

import { useState } from "react";
import { Switch } from "@/shared/components/ui/switch";
import { Button } from "@/shared/components/ui/button/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/components/ui/dialog/Dialog";
import { toast } from "sonner";
import { useToggleUserActive } from "../../hooks/useToggleUserActive";

type Props = {
  id: string;
  active: boolean;
};

export function ActiveToggleCell({ id, active }: Props) {
  const [open, setOpen] = useState(false);
  const [nextValue, setNextValue] = useState(active);

  const mutation = useToggleUserActive();

  const handleConfirm = () => {
    mutation.mutate(
      { id, active: nextValue },
      {
        onSuccess: () => {
          toast.success(nextValue ? "کاربر فعال شد" : "کاربر غیرفعال شد");
          setOpen(false);
        },
        onError: () => {
          toast.error("خطا در انجام عملیات");
          setOpen(false);
        },
      }
    );
  };

  return (
    <>
      {/* Switch اصلی */}
      <Switch
        checked={active}
        disabled={mutation.isPending}
        onCheckedChange={(checked) => {
          setNextValue(checked);
          setOpen(true);
        }}
      />

      {/* Modal تأیید */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="shadow shadow-accent-foreground/20">
          <DialogHeader>
            <DialogTitle className="text-start">
              {nextValue ? "فعال‌سازی کاربر" : "غیرفعال‌سازی کاربر"}
            </DialogTitle>
          </DialogHeader>

          <p className="text-sm text-muted-foreground">
            آیا مطمئن هستید که می‌خواهید این کاربر را{" "}
            {nextValue ? "فعال" : "غیرفعال"} کنید؟
          </p>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => setOpen(false)}
              disabled={mutation.isPending}
            >
              انصراف
            </Button>

            <Button
              className="cursor-pointer"
              variant={nextValue ? "default" : "destructive"}
              onClick={handleConfirm}
            >
              {mutation.isPending ? "در حال انجام ..." : "تایید"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
