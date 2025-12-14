import { User, UserDetails } from "../types";

export const fakeUsers: User[] = [
  {
    id: "1",
    name: "پیمان شفیعی",
    device: "LAPTOP-ETQPBSF",
    status: "afk",
  },
  {
    id: "2",
    name: "علی رازی",
    device: "LAPTOP-ETQPBSF",
    status: "active",
  },
  {
    id: "3",
    name: "محسن معتقد",
    device: "LAPTOP-ETQPBSF",
    status: "active",
  },
];

export const fakeUserDetails: Record<string, UserDetails> = {
  "1": {
    userId: "1",
    presence: "AFK",
    currentApp: "FireFox.exe",
    activeTimeMinutes: 185,
    afkTimeMinutes: 40,
  },
  "2": {
    userId: "2",
    presence: "حاضر",
    currentApp: "photoshop.exe",
    activeTimeMinutes: 220,
    afkTimeMinutes: 10,
  },
};
