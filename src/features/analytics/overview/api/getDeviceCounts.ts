import { DeviceCountsResponse } from "../types";
import { api } from "@/core/config/api"; // همون axios instance خودت

export async function getDeviceCounts(): Promise<DeviceCountsResponse> {
  const res = await api.get<DeviceCountsResponse>("device/counts/");
  return res.data;
}
