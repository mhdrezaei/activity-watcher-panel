"use client";

import { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";
import type { PieSlice } from "@/features/analytics/overview/types";

export default function PieChartCardClient({ data }: { data: PieSlice[] }) {
  const option: EChartsOption = useMemo(() => {
    const chartData = data.map((item) => ({
      name: item.id || item.label,
      value: item.value,
      itemStyle: {
        color: item.color,
        borderRadius: 5,
        borderWidth: 2,
      },
    }));
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

    return {
      tooltip: {
        trigger: "item",
        formatter: "{b} : <b>{c}</b> ({d}%)",
        backgroundColor: "var(--watcher-primary-50)",
        borderColor: "hsl(var(--border))",
        textStyle: { fontFamily: mainFont },
      },
      legend: {
        orient: "horizontal",
        left: "center",
        top: "top",
        itemGap: 15,
        textStyle: {
          fontFamily: mainFont,
          color: "hsl(var(--muted-foreground))",
          fontSize: 12,
          fontStyle: "normal",
          fontWeight: "bold",
        },
      },
      toolbox: {
        show: true,
        top: 0,
        right: 0,
        itemSize: 16,
        itemGap: 10,
        iconStyle: { borderColor: mutedColor },
        tooltip: {
          show: true,
          formatter(params) {
            const tooltips: Record<string, string> = {
              dataView: "نمایش داده",
              restore: "بازنشانی",
              saveAsImage: "ذخیره عکس",
            };
            return tooltips[params.name] || params.title;
          },
        },
        feature: {
          dataView: {
            show: true,
            readOnly: false,
            lang: ["نمایش داده", "بستن", "بروزرسانی"],
          },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      series: [
        {
          name: "آمار",
          type: "pie",
          radius: ["40%", "70%"],
          center: ["50%", "55%"],
          minAngle: 15,
          emphasis: {
            label: {
              show: true,
              fontSize: 14,
              fontWeight: "bold",
              fontFamily: mainFont,
            },
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
          label: {
            show: true,
            position: "outside",
            fontStyle: "normal",
            fontFamily: mainFont,
            fontSize: 12,
            fontWeight: "bold",
            formatter: "{b}\n{d}%",
            lineHeight: 24,
          },
          labelLine: {
            show: true,
            length: 25,
            length2: 20,
            smooth: false,
          },
          data: chartData,
        },
      ],
    };
  }, [data]);

  return (
    <div className="bg-card text-accent-foreground rounded-2xl p-4 flex flex-col gap-4 w-full h-[450px]">
      <ReactECharts
        opts={{ height: 430, width: "auto" }}
        style={{ height: "100%", width: "100%" }}
        option={option}
        notMerge={true}
      />
    </div>
  );
}
