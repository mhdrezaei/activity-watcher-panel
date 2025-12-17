import type { DeviceCountsResponse, PieSlice } from "../types";

export function mapDeviceCountsToPie(data: DeviceCountsResponse): PieSlice[] {
  return [
    {
      id: "AFK",
      label: "کاربران AFK",
      value: data.afk_count,
      color: "#C5CEFF",
    },
    {
      id: "فعال",
      label: "کاربران فعال",
      value: data.fully_working,
      color: "#818cf8",
    },
    {
      id: "حاضر",
      label: "کاربران حاضر",
      value: data.present_count,
      color: "#22c55e",
    },
  ];
}
