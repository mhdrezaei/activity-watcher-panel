// src/features/analytics/overview/transformers/mapAggregatesToBar.ts
import type { WorkAggregatesResponse } from "../api/workAggregatesService";

export type BarChartDatum = {
  day: string;
  فعال: number;
  عدم_فعالیت: number;
};

export type BarChartResult = {
  aggregation: WorkAggregatesResponse["aggregation"];
  data: BarChartDatum[];
};

export function mapAggregatesToBar(
  response: WorkAggregatesResponse,
): BarChartResult {
  return {
    aggregation: response.aggregation,
    data: response.data.map((item) => ({
      day: formatLabel(item.date, response.aggregation),
      فعال: item.working_duration,
      عدم_فعالیت: item.inactive_duration,
    })),
  };
}

function formatLabel(date: string, aggregation: string) {
  const d = new Date(date);

  // هندل کردن دیتای نامعتبر (برای جلوگیری از کرش کردن نمودار)
  if (isNaN(d.getTime())) return date;

  if (aggregation === "hourly") {
    // جایگزینی getHours با Intl برای قفل کردن ساعت روی تهران
    return new Intl.DateTimeFormat("fa-IR", {
      timeZone: "Asia/Tehran",
      hour: "2-digit",
      hour12: false,
    }).format(d);
  }

  if (aggregation === "daily") {
    return d.toLocaleDateString("fa-IR", {
      timeZone: "Asia/Tehran", // قفل کردن روی تایم‌زون ایران
      month: "short",
      day: "numeric",
    });
  }

  if (aggregation === "monthly") {
    return d.toLocaleDateString("fa-IR", {
      timeZone: "Asia/Tehran", // قفل کردن روی تایم‌زون ایران
      month: "short",
      year: "numeric",
    });
  }

  return "";
}
