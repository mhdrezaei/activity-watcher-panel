"use client";

import { forwardRef, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";
import { barData } from "../../../data/fakeOverviewData";

type TooltipPayload = {
  name: string;
  value?: number | string;
  color: string;
  seriesName: string;
};

type ToolboxTooltipPayload = {
  name: string;
  title: string;
};

const BarChartCardClient = forwardRef<
  HTMLDivElement,
  {
    data: typeof barData;
    aggregation: "hourly" | "daily" | "weekly" | "monthly";
    id?: string;
  }
>(function BarChart({ data, aggregation, id }, ref) {
  const option: EChartsOption = useMemo(() => {
    const categoryNames = data.map((item) => item.day);
    const activeData = data.map((item) => item["فعال"] || 0);
    const inactiveData = data.map((item) => item["عدم_فعالیت"] || 0);

    const isHourly = aggregation === "hourly";
    const yAxisLabel = isHourly ? "دقیقه" : "ساعت";

    const isDark =
      typeof document !== "undefined"
        ? document.documentElement.classList.contains("dark")
        : false;
    const mainFont =
      typeof document !== "undefined"
        ? getComputedStyle(document.documentElement).getPropertyValue(
            "--font-iran-sans",
          ) || "sans-serif"
        : "sans-serif";

    const mutedColor = isDark ? "#94a3b8" : "#64748b";
    const borderColor = isDark
      ? "rgba(255, 255, 255, 0.15)"
      : "rgba(0, 0, 0, 0.15)";

    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
          label: { show: true, fontFamily: mainFont },
        },
        backgroundColor: "var(--watcher-primary-50)",
        borderColor: "hsl(var(--border))",
        textStyle: { fontFamily: mainFont, color: mutedColor },
        formatter: (params: unknown) => {
          const payload = params as TooltipPayload[];
          if (!payload || !payload.length) return "";

          let html = `<div style="text-align: right; direction: rtl; font-family: ${mainFont}; padding: 4px;">`;
          html += `<div style="font-weight: bold; margin-bottom: 8px; ">${payload[0].name}</div>`;

          payload.forEach((p) => {
            const val = Number(p.value || 0);
            const h = Math.floor(val / 60);
            const m = val % 60;
            const hText = h > 0 ? `${h} ساعت` : "";
            const mText = m > 0 ? ` ${m} دقیقه` : "";
            const displayValue = (hText + mText).trim() || "0 دقیقه";

            html += `<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
              <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: ${p.color};"></span>
              <span >${p.seriesName}: </span>
              <span style="font-weight: 500;">${displayValue}</span>
            </div>`;
          });
          html += `</div>`;
          return html;
        },
      },
      legend: {
        data: ["فعال", "عدم_فعالیت"],
        itemGap: 15,
        bottom: 0,
        textStyle: {
          fontSize: 12,
          color: mutedColor,
          fontWeight: "bold",
          fontFamily: mainFont,
        },
      },
      toolbox: {
        show: true,
        top: -5,
        itemSize: 16,
        textStyle: { fontFamily: mainFont },
        itemGap: 10,
        iconStyle: { borderColor: mutedColor },
        tooltip: {
          show: true,
          formatter(params: unknown) {
            const p = params as ToolboxTooltipPayload;
            const tooltips: { [key: string]: string } = {
              dataView: "نمایش داده",
              magicType: "تغییر نوع نمودار",
              restore: "بازنشانی",
              saveAsImage: "ذخیره عکس",
            };
            return p.name === "magicType"
              ? tooltips[p.name]
              : tooltips[p.name] || p.title;
          },
        },
        feature: {
          dataView: {
            show: true,
            readOnly: true,
            title: "نمایش داده",
            lang: ["نمایش داده", "بستن", "بروزرسانی"],
            optionToContent: function (opt: unknown) {
              const options = opt as {
                xAxis: { data: string[] }[];
                series: { name: string; data: number[] }[];
              };
              const axisData = options.xAxis[0].data;
              const series = options.series;

              let table = `<table style="width:100%; text-align:center; direction:rtl; font-family:${mainFont}; border-collapse:collapse; font-size:14px; color:#0f172a;"><tbody><tr>`;
              table += `<td style="padding: 10px; border-bottom: 2px solid ${borderColor}; font-weight:bold;color:#0f172a;">دوره</td>`;

              series.forEach(function (serie) {
                table += `<td style="padding: 10px; border-bottom: 2px solid ${borderColor}; font-weight:bold;color:#0f172a;">${serie.name}</td>`;
              });
              table += `</tr>`;

              for (let i = 0, l = axisData.length; i < l; i++) {
                table += `<tr><td style="padding: 10px; border-bottom: 1px solid ${borderColor};color:#0f172a;">${axisData[i]}</td>`;
                for (let j = 0; j < series.length; j++) {
                  table += `<td style="padding: 10px; border-bottom: 1px solid ${borderColor};color:#0f172a;">${series[j].data[i] || 0}</td>`;
                }
                table += `</tr>`;
              }
              table += `</tbody></table>`;
              return table;
            },
          },
          magicType: {
            show: true,
            type: ["line", "bar"],
            title: { line: "خطی", bar: "میله‌ای" },
          },
          restore: { show: false, title: "بازنشانی" },
          saveAsImage: { show: true, title: "ذخیره عکس" },
        },
      },
      grid: {
        top: "12%",
        left: "3%",
        right: "4%",
        bottom: 80,
        containLabel: true,
      },
      dataZoom: [
        {
          show: true,
          start: 0,
          end: 100,
          bottom: 45,
          textStyle: { fontFamily: mainFont },
        },
        { type: "inside", start: 0, end: 100 },
      ],
      xAxis: [
        {
          type: "category",
          data: categoryNames,
          nameTextStyle: {
            fontSize: 12,
            color: mutedColor,
            fontWeight: "bold",
            fontFamily: mainFont,
          },
          axisLabel: {
            interval: 0,
            rotate: categoryNames.length > 5 ? 45 : 0,
            fontSize: 12,
            color: mutedColor,
            fontFamily: mainFont,
            formatter(value: string) {
              const maxLabelLength = 10;
              if (value.length > maxLabelLength) {
                return `${value.slice(0, maxLabelLength)}...`;
              }
              return value;
            },
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          name: `مقدار (${yAxisLabel})`,
          nameTextStyle: {
            fontSize: 12,
            color: mutedColor,
            fontWeight: "bold",
            fontFamily: mainFont,
          },
          axisLabel: {
            fontSize: 12,
            color: mutedColor,
            fontFamily: mainFont,
            show: true,
            formatter: (value: number) => {
              return isHourly ? `${value}` : `${Math.round(value / 60)}`;
            },
          },
          splitLine: {
            show: true,
            lineStyle: { color: borderColor, opacity: 0.5 },
          },
        },
      ],
      series: [
        {
          name: "فعال",
          type: "bar",
          data: activeData,
          itemStyle: { color: "#6366f1", borderRadius: [4, 4, 0, 0] },
          barMaxWidth: 60,
        },
        {
          name: "عدم_فعالیت",
          type: "bar",
          data: inactiveData,
          itemStyle: { color: "#f87171", borderRadius: [4, 4, 0, 0] },
          barMaxWidth: 60,
        },
      ],
    };
  }, [data, aggregation]);

  return (
    <div
      ref={ref}
      id={id || "bar-chart"}
      className="bg-card min-h-[420px] text-accent-foreground rounded-2xl p-4 flex flex-col gap-4 w-full"
    >
      <ReactECharts
        style={{ height: 420, width: "100%" }}
        option={option}
        notMerge={true}
      />
    </div>
  );
});

export default BarChartCardClient;
