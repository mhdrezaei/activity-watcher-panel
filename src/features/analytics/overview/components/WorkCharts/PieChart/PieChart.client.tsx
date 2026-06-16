"use client";

import { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";
import type { PieSlice } from "@/features/analytics/overview/types";

export default function PieChartCardClient({ data }: { data: PieSlice[] }) {
  const option: EChartsOption = useMemo(() => {
    // تبدیل دیتای Nivo به فرمت قابل فهم برای ECharts
    const chartData = data.map((item) => ({
      name: item.id || item.label, // بسته به ساختار دقیق دیتای شما
      value: item.value,
      itemStyle: {
        color: item.color, // حفظ رنگ اصلی از دیتا
        borderRadius: 5, // معادل cornerRadius={5} در Nivo
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
    const textColor = isDark ? "#f8fafc" : "#0f172a"; // معادل foreground
    const mutedColor = isDark ? "#94a3b8" : "#64748b"; // معادل muted-foreground
    const borderColor = isDark
      ? "rgba(255, 255, 255, 0.15)"
      : "rgba(0, 0, 0, 0.15)";

    return {
      tooltip: {
        trigger: "item",
        // نمایش نام، مقدار و درصد در تولتیپ
        formatter: "{b} : <b>{c}</b> ({d}%)",
        backgroundColor: "var(--watcher-primary-50)",
        borderColor: "hsl(var(--border))",
        textStyle: { fontFamily: mainFont },
      },
      legend: {
        // تنظیمات Legend مشابه فایل هدف
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
          radius: ["40%", "70%"], // معادل innerRadius={0.5} نیوو
          center: ["50%", "55%"],
          minAngle: 15, // جلوگیری از محو شدن مقادیر خیلی کوچک
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
            // color: "hsl(var(--foreground))",
            // نمایش نام و درصد کنار هم در بیرون چارت
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
