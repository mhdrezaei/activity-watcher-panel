import { apiClient } from "@/lib/axiosClient";
import { User } from "../types";

export const usersService = {
  getAll: async (): Promise<User[]> => {
    const res = await apiClient.get("/device");
    return res.data.results;
  },
};
