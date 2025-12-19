// src/features/users/api/userStatusService.ts

import { apiClient } from "@/lib/axiosClient";
import type {
  UserCurrentStatusResponse,
  TopAppsResponse,
  UserWorkAggregatesResponse,
} from "../types";
import type { WorkRange } from "../types";

export const userStatusService = {
  /* ---------------- current user status ---------------- */
  getCurrentStatus: async (
    userId: string
  ): Promise<UserCurrentStatusResponse> => {
    const res = await apiClient.get(`/analyze/current-status/${userId}`);
    return res.data;
  },

  /* ---------------- Most used applications ---------------- */
  getTopApps: async (userId: string): Promise<TopAppsResponse> => {
    const res = await apiClient.get(
      `/analyze/apps/most-used-app-all/${userId}`
    );
    return res.data;
  },

  /* ---------------- User work data ---------------- */
  getWorkAggregates: async (
    userId: string,
    range: WorkRange
  ): Promise<UserWorkAggregatesResponse> => {
    const res = await apiClient.get(`/aggregates/current-day-works/${userId}`, {
      params: { range },
    });

    return res.data;
  },
};
