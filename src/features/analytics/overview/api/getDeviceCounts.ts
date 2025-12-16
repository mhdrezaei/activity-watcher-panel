import { DeviceCountsResponse } from "../types";
import { apiClient } from "@/lib/axiosClient"; // همون axios instance خودت

export async function getDeviceCounts(): Promise<DeviceCountsResponse> {
  const res = await apiClient.get<DeviceCountsResponse>("device/counts/");
  return res.data;
}
