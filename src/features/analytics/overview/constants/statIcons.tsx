import {
  UsersIcon,
  ActiveUsersIcon,
  AfkUsersIcon,
  OnlineUsersIcon,
} from "@/shared/assets/icons";
import type { OverviewStatKey } from "../types";

export const STAT_ICONS: Record<OverviewStatKey, React.ReactNode> = {
  total: <UsersIcon color="#5953F6" active />,
  present: <OnlineUsersIcon color="#5953F6" />,
  active: <ActiveUsersIcon color="#5953F6" />,
  afk: <AfkUsersIcon color="#5953F6" />,
};
