// src/features/compare/components/CompareChart.tsx
import ReactECharts from "echarts-for-react";
import dayjs from "dayjs";
import jalaliday from "jalaliday";
import { CompareResponse } from "../types";

dayjs.extend(jalaliday);

export default function CompareChart({ data }: { data: CompareResponse }) {
  const { a, b } = data.devices;
  const isDaily = data.aggregation === "daily";

  const mainFont =
    typeof document !== "undefined"
      ? getComputedStyle(document.documentElement).getPropertyValue(
          "--font-iran-sans",
        ) || "sans-serif"
      : "sans-serif";
  const xAxisData = a.timeseries.map((item) => {
    const dateObj = dayjs(item.date).calendar("jalali").locale("fa");
    return isDaily ? dateObj.format("MM/DD") : dateObj.format("HH:mm");
  });

  const generateChartOptions = (
    metricKey:
      | "working_duration"
      | "inactive_duration"
      | "total_duration"
      | "active_pct",
    title: string,
    yAxisName: string,
    isPercentage: boolean = false,
  ) => {
    const seriesA = a.timeseries.map((item) => item[metricKey]);
    const seriesB = b.timeseries.map((item) => item[metricKey]);

    return {
      title: {
        text: title,
        left: "center",
        top: 0,
        textStyle: { fontSize: 15, fontFamily: mainFont, color: "#334155" },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        textStyle: { fontFamily: mainFont },
        valueFormatter: (value: number) =>
          isPercentage ? `${value}%` : `${value} دقیقه`,
      },
      legend: {
        data: [a.name, b.name],
        bottom: 0,
        textStyle: { fontFamily: mainFont },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "15%",
        top: "15%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: xAxisData,
        axisLine: { lineStyle: { color: "#cbd5e1" } },
        axisLabel: {
          fontFamily: mainFont,
          rotate: isDaily ? 45 : 0,
          hideOverlap: true,
        },
      },
      yAxis: {
        type: "value",
        name: yAxisName,
        nameTextStyle: { fontFamily: mainFont, padding: [0, 0, 10, 0] },
        splitLine: { lineStyle: { type: "dashed", color: "#e2e8f0" } },
        axisLabel: {
          fontFamily: mainFont,
          formatter: isPercentage ? "{value}%" : "{value}",
        },
        max: isPercentage ? 100 : undefined,
      },
      series: [
        {
          name: a.name,
          type: "bar",
          data: seriesA,
          itemStyle: { color: "#3b82f6", borderRadius: [4, 4, 0, 0] },
        },
        {
          name: b.name,
          type: "bar",
          data: seriesB,
          itemStyle: { color: "#f97316", borderRadius: [4, 4, 0, 0] }, // نارنجی برای کاربر دوم
        },
      ],
    };
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 gap-y-12 mt-4">
      <div className="w-full">
        <ReactECharts
          option={generateChartOptions(
            "working_duration",
            "میزان کارکرد مفید (Working)",
            "دقیقه",
          )}
          style={{ height: 350, width: "100%" }}
        />
      </div>

      <div className="w-full">
        <ReactECharts
          option={generateChartOptions(
            "active_pct",
            "درصد فعالیت (Active %)",
            "درصد (%)",
            true,
          )}
          style={{ height: 350, width: "100%" }}
        />
      </div>

      {/* 3. نمودار عدم فعالیت */}
      <div className="w-full">
        <ReactECharts
          option={generateChartOptions(
            "inactive_duration",
            "زمان عدم فعالیت (Inactive)",
            "دقیقه",
          )}
          style={{ height: 350, width: "100%" }}
        />
      </div>

      {/* 4. نمودار کل زمان */}
      <div className="w-full">
        <ReactECharts
          option={generateChartOptions(
            "total_duration",
            "مجموع زمان حضور (Total)",
            "دقیقه",
          )}
          style={{ height: 350, width: "100%" }}
        />
      </div>
    </div>
  );
}
