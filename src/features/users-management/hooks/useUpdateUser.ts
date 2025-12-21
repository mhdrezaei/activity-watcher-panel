import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersService } from "../api/users.service";
import { toast } from "sonner";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: usersService.updateUser,

    onSuccess: () => {
      toast.success("اطلاعات کاربر با موفقیت ویرایش شد");
      queryClient.invalidateQueries({ queryKey: ["users-management"] });
    },

    onError: () => {
      toast.error("خطا در ویرایش اطلاعات کاربر");
    },
  });
}
