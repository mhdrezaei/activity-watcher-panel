import { DeviceCountsResponse, OverviewStat } from "../types";

export function mapDeviceCounts(data: DeviceCountsResponse): OverviewStat[] {
  return [
    {
      key: "total",
      label: " کل کاربران",
      value: data.total_devices,
    },
    {
      key: "present",
      label: " کاربران حاضر",
      value: data.present_count,
    },
    {
      key: "active",
      label: " کاربران فعال",
      value: data.fully_working,
    },
    {
      key: "afk",
      label: " کاربران AFK",
      value: data.afk_count,
    },
  ];
}
