// src/features/analytics/user-details/transformers/mapCurrentStatusToStatusList.ts

import { Laptop, Monitor, UserCheck } from "lucide-react";
import { StatusItem, StatusFooter } from "@/shared/components/status-list";
import { UserCurrentStatusResponse } from "../types";

export function mapCurrentStatusToStatusList(
  status: UserCurrentStatusResponse
): {
  items: StatusItem[];
  footer: StatusFooter;
} {
  const isAfk = status.afk_status !== "not-afk";

  return {
    items: [
      {
        id: "presence",
        label: isAfk ? "AFK" : "حاضر",
        description: "وضعیت حضور پشت سیستم",
        status: isAfk ? "neutral" : "success",
        icon: UserCheck,
      },
      {
        id: "afk",
        label: isAfk ? "AFK" : "فعال",
        description: "وضعیت استفاده از سیستم",
        status: "neutral",
        icon: Monitor,
      },
      {
        id: "app",
        label: "",
        description: "برنامه در حال استفاده",
        icon: Laptop,
      },
    ],
    footer: {
      title: status.window_status || "—",
      time: "",
    },
  };
}

// function minutesToText(minutes: number) {
//   const h = Math.floor(minutes / 60);
//   const m = minutes % 60;

//   if (h && m) return `${h} ساعت ${m} دقیقه`;
//   if (h) return `${h} ساعت`;
//   return `${m} دقیقه`;
// }
