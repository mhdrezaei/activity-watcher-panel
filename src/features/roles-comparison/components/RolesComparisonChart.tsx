"use client";

import ReactECharts from "echarts-for-react";
import { WorksPerRoleResponse } from "../../types";
import { useThemeStore } from "@/store/theme.store";
import { Users } from "lucide-react";
import dayjs from "@/lib/utils/dayjsSetup";

interface Props {
  data: WorksPerRoleResponse;
  normalize: string;
}

export function RolesComparisonChart({ data, normalize }: Props) {
  const theme = useThemeStore((s) => s.theme);
  const isDark = theme === "dark";

  const mainFont =
    typeof document !== "undefined"
      ? getComputedStyle(document.documentElement).getPropertyValue("--font-iran-sans") || "sans-serif"
      : "sans-serif";

  const getChartOption = () => {
    const isHourly = data.aggregation === "hourly";
    const suffix = normalize === "utilization" ? "%" : " دقیقه";

    const xAxisLabels = data.labels.map((timestamp) => {
      if (isHourly) {
        return dayjs(timestamp).format("HH:mm");
      }
      return dayjs(timestamp).calendar("jalali").format("MM/DD");
    });

    const series = data.series.map((item) => ({
      name: item.role,
      type: "line",
      smooth: true,
      data: item.data.map(v => Math.round(v)),
      symbolSize: 6,
      lineStyle: { width: 3 },
    }));

    const legendData = data.series.map(s => s.role);

    return {
      backgroundColor: "transparent",
      tooltip: {
        trigger: "axis",
        textStyle: { fontFamily: mainFont },
        formatter: (params: any) => {
          let html = `<div style="direction: rtl; text-align: right; font-family: ${mainFont};">`;
          html += `<div style="font-weight: bold; margin-bottom: 8px; color: ${isDark ? '#fff' : '#000'}">${params[0].axisValue}</div>`;
          params.forEach((param: any) => {
             html += `
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px; gap: 16px; color: ${isDark ? '#e5e7eb' : '#374151'}">
                <div style="display: flex; align-items: center; gap: 6px;">
                  <span style="display:inline-block; border-radius:50%; width:8px; height:8px; background-color:${param.color};"></span>
                  <span>${param.seriesName}:</span>
                </div>
                <b>${param.value}${suffix}</b>
              </div>
             `;
          });
          html += `</div>`;
          return html;
        },
      },
      legend: {
        data: legendData,
        bottom: 0,
        textStyle: {
          fontFamily: mainFont,
          color: isDark ? "#d1d5db" : "#374151",
        },
        type: "scroll",
      },
      grid: {
        left: "2%",
        right: "2%",
        bottom: "10%",
        top: "5%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: xAxisLabels,
        axisLabel: {
          color: isDark ? "#9ca3af" : "#6b7280",
          fontFamily: mainFont,
        },
        axisLine: {
          lineStyle: { color: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" },
        },
      },
      yAxis: {
        type: "value",
        axisLabel: {
          color: isDark ? "#9ca3af" : "#6b7280",
          fontFamily: mainFont,
          formatter: `{value}${normalize === "utilization" ? "%" : ""}`
        },
        splitLine: {
          lineStyle: {
            color: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
            type: "dashed",
          },
        },
      },
      series: series,
    };
  };

  return (
    <div className="flex flex-col gap-4 bg-card dark:bg-card/60 p-4 rounded-xl border border-border h-full">
      <div className="flex items-center justify-start gap-2 mb-2">
        <div className="bg-blue-100 dark:bg-blue-500/10 p-2 rounded-lg shrink-0">
          <Users className="text-blue-600 dark:text-blue-500" size={20} />
        </div>
        <h4 className="font-bold text-foreground">روند کارکرد نقش‌ها</h4>
      </div>
      <div className="h-[350px] w-full">
        <ReactECharts 
          option={getChartOption()} 
          style={{ height: "100%", width: "100%" }} 
          opts={{ renderer: 'svg' }}
        />
      </div>
    </div>
  );
}
