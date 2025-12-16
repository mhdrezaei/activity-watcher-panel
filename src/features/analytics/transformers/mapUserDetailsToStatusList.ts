import { Monitor, UserCheck, Laptop } from "lucide-react";
import { UserDetails } from "../user-details/types";
import { StatusItem, StatusFooter } from "@/shared/components/status-list";

function minutesToText(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  if (h && m) return `${h} ساعت ${m} دقیقه`;
  if (h) return `${h} ساعت`;
  return `${m} دقیقه`;
}

export function mapUserDetailsToStatusList(details: UserDetails): {
  items: StatusItem[];
  footer: StatusFooter;
} {
  return {
    items: [
      {
        id: "presence",
        label: details.presence,
        description: "وضعیت حضور پشت سیستم",
        status: details.presence === "حاضر" ? "success" : "neutral",
        icon: UserCheck,
      },
      {
        id: "afk",
        label: "AFK",
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
      title: details.currentApp,
      time: minutesToText(details.activeTimeMinutes),
    },
  };
}
