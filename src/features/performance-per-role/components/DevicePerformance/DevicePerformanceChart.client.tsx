// src/features/analytics/overview/components/DevicePerformance/DevicePerformanceChart.client.tsx
"use client";

import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import type { EChartsOption } from "echarts";

interface DevicePerformanceChartProps {
  option: EChartsOption;
  height?: number | string;
  loading?: boolean;
}

export default function DevicePerformanceChartClient({
  option,
  height = 450,
  loading = false,
}: DevicePerformanceChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    chartInstance.current = echarts.init(chartRef.current);

    const handleResize = () => chartInstance.current?.resize();
    
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(chartRef.current);

    return () => {
      resizeObserver.disconnect();
      chartInstance.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (!chartInstance.current || !option) return;

    const updateChartTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");

      const legendTextColor = isDark ? "#e4e4e7" : "#3f3f46";
      const legendInactiveColor = isDark ? "#52525b" : "#a1a1aa";
      const axisTextColor = isDark ? "#a1a1aa" : "#71717a";

      const themedOption = {
        ...option,
        legend: {
          ...(option.legend as Record<string, unknown>),
          inactiveColor: legendInactiveColor,
          textStyle: {
            ...((option.legend as Record<string, unknown>)?.textStyle as Record<
              string,
              unknown
            >),
            color: legendTextColor,
          },
        },
        xAxis: {
          ...(option.xAxis as Record<string, unknown>),
          axisLabel: {
            ...((option.xAxis as Record<string, unknown>)?.axisLabel as Record<
              string,
              unknown
            >),
            color: axisTextColor,
          },
        },
        yAxis: {
          ...(option.yAxis as Record<string, unknown>),
          axisLabel: {
            ...((option.yAxis as Record<string, unknown>)?.axisLabel as Record<
              string,
              unknown
            >),
            color: axisTextColor,
          },
          nameTextStyle: {
            ...((option.yAxis as Record<string, unknown>)
              ?.nameTextStyle as Record<string, unknown>),
            color: axisTextColor,
          },
        },
        series: Array.isArray(option.series) 
          ? option.series.map((s: any) => ({
              ...s,
              endLabel: s.endLabel ? {
                ...s.endLabel,
                color: isDark ? "#e5e7eb" : "inherit"
              } : undefined
            }))
          : option.series,
      };

      chartInstance.current?.setOption(themedOption, { notMerge: true });
    };

    updateChartTheme();

    const observer = new MutationObserver(() => updateChartTheme());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [option]);

  useEffect(() => {
    if (!chartInstance.current) return;

    if (loading) {
      const isDark = document.documentElement.classList.contains("dark");
      chartInstance.current.showLoading("default", {
        text: "در حال بروزرسانی...",
        color: "#3b82f6",
        textColor: isDark ? "#999" : "#555",
        maskColor: isDark ? "rgba(0, 0, 0, 0.4)" : "rgba(255, 255, 255, 0.6)",
        zlevel: 0,
        fontFamily: "inherit",
      });
    } else {
      chartInstance.current.hideLoading();
    }
  }, [loading]);

  return <div ref={chartRef} style={{ width: "100%", height }} />;
}
