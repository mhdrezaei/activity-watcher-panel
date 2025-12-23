import { apiClient } from "@/lib/axiosClient";
import type { PaginatedUsersResponse } from "./types";

type GetUsersParams = {
  limit: number;
  offset: number;
  search?: string;
};

export const usersService = {
  getAll: async (params: GetUsersParams): Promise<PaginatedUsersResponse> => {
    const res = await apiClient.get("/device/", {
      params,
    });

    return res.data;
  },
};
