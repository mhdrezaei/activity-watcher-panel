import { apiClient } from "@/lib/axiosClient";
import type { UserApiResponse, PaginatedResponse } from "./types";
import { UpdateUserPayload } from "./types";

type GetUsersParams = {
  limit: number;
  offset: number;
  search?: string;
};

export const usersService = {
  getUsers: async (
    params: GetUsersParams
  ): Promise<PaginatedResponse<UserApiResponse>> => {
    const res = await apiClient.get("/device/", {
      params,
    });
    return res.data;
  },

  toggleActive: async (id: string, active: boolean) => {
    const res = await apiClient.patch(`/device/toggle/${id}/`, { active });
    return res.data as { active: boolean };
  },

  updateUser: async (payload: UpdateUserPayload) => {
    const { id, ...data } = payload;
    const res = await apiClient.patch(`/device/update/${id}/`, data);
    return res.data;
  },
};
