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

export const fakeUserDetails: UserDetails[] = [
  {
    userId: "1",
    presence: "AFK",
    currentApp: "FireFox.exe",

    activeTimeMinutes: 185,
    afkTimeMinutes: 40,

    topApps: [
      { app: "FireFox.exe", minutes: 185 },
      { app: "photoshop.exe", minutes: 120 },
      { app: "chrome.exe", minutes: 90 },
      { app: "illustrator.exe", minutes: 45 },
    ],

    workStats: [
      { date: "1403/08/10", activeMinutes: 140, afkMinutes: 40 },
      { date: "1403/08/11", activeMinutes: 120, afkMinutes: 55 },
      { date: "1403/08/12", activeMinutes: 160, afkMinutes: 50 },
      { date: "1403/08/13", activeMinutes: 110, afkMinutes: 35 },
      { date: "1403/08/15", activeMinutes: 130, afkMinutes: 66 },
      { date: "1403/08/16", activeMinutes: 140, afkMinutes: 37 },
      { date: "1403/08/17", activeMinutes: 130, afkMinutes: 26 },
      { date: "1403/08/18", activeMinutes: 110, afkMinutes: 33 },
      { date: "1403/08/19", activeMinutes: 190, afkMinutes: 80 },
      { date: "1403/08/20", activeMinutes: 90, afkMinutes: 15 },
    ],
  },

  {
    userId: "2",
    presence: "حاضر",
    currentApp: "photoshop.exe",

    activeTimeMinutes: 420,
    afkTimeMinutes: 45,

    topApps: [
      { app: "photoshop.exe", minutes: 240 },
      { app: "chrome.exe", minutes: 120 },
      { app: "FireFox.exe", minutes: 60 },
    ],

    workStats: [
      { date: "1403/08/10", activeMinutes: 160, afkMinutes: 15 },
      { date: "1403/08/11", activeMinutes: 210, afkMinutes: 30 },
      { date: "1403/08/12", activeMinutes: 230, afkMinutes: 40 },
      { date: "1403/08/13", activeMinutes: 130, afkMinutes: 40 },
      { date: "1403/08/14", activeMinutes: 210, afkMinutes: 25 },
      { date: "1403/08/15", activeMinutes: 180, afkMinutes: 32 },
      { date: "1403/08/16", activeMinutes: 210, afkMinutes: 85 },
      { date: "1403/08/17", activeMinutes: 120, afkMinutes: 15 },
      { date: "1403/08/18", activeMinutes: 180, afkMinutes: 35 },
      { date: "1403/08/19", activeMinutes: 220, afkMinutes: 15 },
      { date: "1403/08/20", activeMinutes: 222, afkMinutes: 65 },
    ],
  },
  {
    userId: "3",
    presence: "حاضر",
    currentApp: "photoshop.exe",

    activeTimeMinutes: 420,
    afkTimeMinutes: 45,

    topApps: [
      { app: "photoshop.exe", minutes: 240 },
      { app: "chrome.exe", minutes: 160 },
      { app: "FireFox.exe", minutes: 20 },
      { app: "Exel.exe", minutes: 40 },
    ],

    workStats: [
      { date: "1403/08/10", activeMinutes: 160, afkMinutes: 15 },
      { date: "1403/08/11", activeMinutes: 210, afkMinutes: 30 },
      { date: "1403/08/12", activeMinutes: 230, afkMinutes: 40 },
      { date: "1403/08/13", activeMinutes: 130, afkMinutes: 40 },
      { date: "1403/08/14", activeMinutes: 210, afkMinutes: 25 },
      { date: "1403/08/15", activeMinutes: 180, afkMinutes: 32 },
      { date: "1403/08/16", activeMinutes: 210, afkMinutes: 25 },
      { date: "1403/08/17", activeMinutes: 250, afkMinutes: 15 },
      { date: "1403/08/18", activeMinutes: 120, afkMinutes: 85 },
      { date: "1403/08/19", activeMinutes: 120, afkMinutes: 85 },
      { date: "1403/08/20", activeMinutes: 120, afkMinutes: 85 },
      { date: "1403/08/21", activeMinutes: 120, afkMinutes: 85 },
      { date: "1403/08/22", activeMinutes: 120, afkMinutes: 85 },
      { date: "1403/08/23", activeMinutes: 120, afkMinutes: 85 },
      { date: "1403/08/24", activeMinutes: 120, afkMinutes: 85 },
    ],
  },
];
