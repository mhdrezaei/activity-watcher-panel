// src/features/analytics/user-details/transformers/mapCurrentStatusToStatusList.ts

import { Laptop, Monitor, UserCheck } from "lucide-react";
import { StatusItem, StatusFooter } from "@/shared/components/status-list";
import { UserCurrentStatusResponse } from "../types";
const PRESENCE_STATUS_FA: Record<string, string> = {
  present: "حاضر",
  away: "غایب",
  talking: "در حال مکالمه",
  "webcam not connected": "عدم اتصال وب‌کم",
  "No data available": "دیتا ناموجود",
};

const AFK_STATUS_FA: Record<string, string> = {
  afk: "AFK",
  "not-afk": "فعال",
  "No data available": "دیتا ناموجود",
};

export function mapCurrentStatusToStatusList(
  status: UserCurrentStatusResponse
): {
  items: StatusItem[];
  footer: StatusFooter;
} {
  const presenceLabel = PRESENCE_STATUS_FA[status.presence_status] ?? "—";

  const afkLabel = AFK_STATUS_FA[status.afk_status] ?? "—";

  const notAfk = status.afk_status === "not-afk";
  return {
    items: [
      {
        id: "presence",
        label: presenceLabel,
        description: "وضعیت حضور پشت سیستم",
        status: notAfk ? "success" : "neutral",
        icon: UserCheck,
      },
      {
        id: "afk",
        label: afkLabel,
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
      title:
        status.window_status === "No data available"
          ? "دیتا ناموجود"
          : status.window_status || "—",
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
