import type { AppUsage } from "../types";
import type { TopAppsResponse } from "../types";

export function mapTopApps(data: TopAppsResponse): AppUsage[] {
  if (!Array.isArray(data)) return [];

  return data.map((item) => ({
    app: item.window,
    total_minutes: Math.round(item.duration),
  }));
}
