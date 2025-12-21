import { apiClient } from "@/lib/axiosClient";
import type { UserApiResponse } from "./types";
import { UpdateUserPayload } from "./types";

export const usersService = {
  getUsers: async (): Promise<UserApiResponse[]> => {
    const res = await apiClient.get("/device/");
    return res.data;
  },
  toggleActive: async (id: string, active: boolean) => {
    const res = await apiClient.patch(`/device/toggle/${id}/`, {
      active,
    });
    return res.data as { active: boolean };
  },
  updateUser: async (payload: UpdateUserPayload) => {
    const { id, ...data } = payload;

    const res = await apiClient.patch(`/device/update/${id}/`, data);

    return res.data;
  },
};
