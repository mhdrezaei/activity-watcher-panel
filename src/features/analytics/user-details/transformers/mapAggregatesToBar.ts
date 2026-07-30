import type { UserWorkAggregatesResponse } from "../types";

export type BarChartDatum = {
  day: string;
  فعال: number;
  عدم_فعالیت: number;
};

export type BarChartResult = {
  aggregation: UserWorkAggregatesResponse["aggregation"];
  data: BarChartDatum[];
};

export function mapAggregatesToBar(
  response: UserWorkAggregatesResponse,
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

  if (aggregation === "hourly") {
    // جایگزینی getHours با Intl برای اعمال دقیق تایم‌زون ایران (خروجی عدد انگلیسی دو رقمی مثل قبل)
    return new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Tehran",
      hour: "2-digit",
      hour12: false,
    }).format(d);
  }

  if (aggregation === "daily") {
    return d.toLocaleDateString("fa-IR", {
      timeZone: "Asia/Tehran",
      month: "short",
      day: "numeric",
    });
  }

  if (aggregation === "monthly") {
    return d.toLocaleDateString("fa-IR", {
      timeZone: "Asia/Tehran",
      month: "short",
      year: "numeric",
    });
  }

  return "";
}
