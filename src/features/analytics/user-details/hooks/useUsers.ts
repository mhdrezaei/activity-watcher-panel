import { useQuery } from "@tanstack/react-query";
import { usersService } from "../api/usersService";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: usersService.getAll,
    staleTime: 60_000,
  });
}
