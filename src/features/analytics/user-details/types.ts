export type UserStatus = "active" | "afk" | "offline";

export interface User {
  id: string;
  name: string;
  device: string;
  status: UserStatus;
}

export interface UserDetails {
  userId: string;
  presence: "حاضر" | "AFK";
  currentApp: string;
  activeTimeMinutes: number;
  afkTimeMinutes: number;
}
