export function workStatsToBarData(
  stats: {
    date: string;
    activeMinutes: number;
    afkMinutes: number;
  }[]
) {
  return stats.map((item) => ({
    day: item.date,
    فعال: item.activeMinutes,
    عدم_فعالیت: item.afkMinutes,
  }));
}
