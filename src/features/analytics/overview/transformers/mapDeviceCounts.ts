import { DeviceCountsResponse, OverviewStat } from "../types";

export function mapDeviceCounts(data: DeviceCountsResponse): OverviewStat[] {
  return [
    {
      key: "total",
      label: "تعداد کل کاربران",
      value: data.total_devices,
    },
    {
      key: "present",
      label: "تعداد کاربران حاضر",
      value: data.present_count,
    },
    {
      key: "active",
      label: "تعداد کاربران فعال",
      value: data.fully_working,
    },
    {
      key: "afk",
      label: "تعداد کاربران AFK",
      value: data.afk_count,
    },
  ];
}
