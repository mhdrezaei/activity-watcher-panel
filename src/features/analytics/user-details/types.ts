/* ======================================================
   User – Domain Models (UI / App Layer)
====================================================== */

/** User */
export interface User {
  id: string;
  name: string;
  hostname: string;
  active: boolean;
  created: string;
  updated: string;
}

/** User status in UI */
export type UserStatus = "active" | "afk" | "offline";

/** User item for list display */
export interface UserListItem {
  id: string;
  name: string;
  device: string;
  status: UserStatus;
}

/** Application usage (Top Apps) */
export interface AppUsage {
  app: string;
  total_minutes: number;
}

/** Time-based item for work statistics chart */
export interface WorkStat {
  date: string; // label (hour / day / month)
  activeMinutes: number; // active time
  afkMinutes: number; // inactive time
}

/** Full user details (UI) */
export interface UserDetails {
  userId: string;

  /** Presence status */
  presence: "حاضر" | "AFK";

  /** Currently active application */
  currentApp: string;

  /** Total time values */
  activeTimeMinutes: number;
  afkTimeMinutes: number;

  /** Most used applications */
  topApps: AppUsage[];

  /** Chart data */
  workStats: WorkStat[];
  workStatsAggregation: WorkAggregation;
}

/* ======================================================
   Work / Analytics
====================================================== */

/** Time ranges */
export type WorkRange =
  | "current_day"
  | "current_month"
  | "last_3_days"
  | "last_7_days"
  | "last_30_days"
  | "last_3_months"
  | "last_6_months";

/** Data aggregation type */
export type WorkAggregation = "hourly" | "daily" | "weekly" | "monthly";

/* ======================================================
   API – Backend Responses
====================================================== */

/** User from device API */
export interface UserApiResponse {
  id: string;
  name: string;
  hostname: string;
  active: boolean;
  created: string;
  updated: string;
}

/** Current user status */
export interface UserCurrentStatusResponse {
  afk_status: "not-afk" | "AFK" | "ACTIVE";
  window_status: string;
  presence_status: string;
}

/** Top Apps response */
export interface TopAppsResponse {
  device: string;
  details: AppUsage[];
}

/** User work item from API */
export interface UserWorkAggregateItem {
  date: string;
  total_duration: number;
  working_duration: number;
  inactive_duration: number;
}

/** User work aggregates response */
export interface UserWorkAggregatesResponse {
  range: WorkRange;
  aggregation: WorkAggregation;
  data: UserWorkAggregateItem[];
}
