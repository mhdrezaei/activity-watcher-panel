export type UserStatus = "active" | "afk" | "offline";

export interface User {
  id: string;
  name: string;
  device: string;
  status: UserStatus;
}

export type AppUsage = {
  app: string;
  minutes: number;
};

/** 👇 آیتم زمانی برای نمودار */
export type WorkStat = {
  date: string; // مثال: "1403/08/12"
  activeMinutes: number;
  afkMinutes: number;
};

export interface UserDetails {
  userId: string;
  presence: "حاضر" | "AFK";
  currentApp: string;

  /** Summary (برای کارت‌ها) */
  activeTimeMinutes: number;
  afkTimeMinutes: number;

  /** Top apps */
  topApps: AppUsage[];

  /** 👇 مخصوص BarChart (جدید) */
  workStats: WorkStat[];
}
