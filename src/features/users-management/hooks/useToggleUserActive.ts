import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersService } from "../api/users.service";
import { User } from "@/features/analytics/user-details/types";

export function useToggleUserActive() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, active }: { id: string; active: boolean }) =>
      usersService.toggleActive(id, active),

    // ✅ realtime update
    onSuccess: (_, variables) => {
      queryClient.setQueryData<User[]>(["users-management"], (old) => {
        if (!old) return old;

        return old.map((u) =>
          u.id === variables.id ? { ...u, active: variables.active } : u
        );
      });
    },
  });
}
