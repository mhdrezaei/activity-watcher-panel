import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersService } from "../api/users.service";
import { toast } from "sonner";

export function useToggleUserActive() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, active }: { id: string; active: boolean }) =>
      usersService.toggleActive(id, active),

    onSuccess: () => {
      toast.success("وضعیت کاربر با موفقیت بروزرسانی شد");

      // 👇 invalidate تمام صفحات / سرچ‌ها
      queryClient.invalidateQueries({
        queryKey: ["users-management"],
      });
    },

    onError: () => {
      toast.error("خطا در بروزرسانی وضعیت کاربر");
    },
  });
}
