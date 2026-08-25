// src/features/analytics/overview/transformers/mapDevicePerformanceToChart.ts
import type { EChartsOption, SeriesOption } from "echarts";
import type { DevicePerformanceResponse } from "../types";

export const mapDevicePerformanceToChart = (
  data?: DevicePerformanceResponse,
): EChartsOption => {
  if (!data || !data.series || data.series.length === 0) {
    return {};
  }

  const { labels, series } = data;

  const formattedLabels = labels.map((isoDate) => {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat("fa-IR", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  });

  const chartSeries: SeriesOption[] = series.map((s) => ({
    name: s.device_name,
    type: "line",
    data: s.data,
    showSymbol: false,
    smooth: true,
    emphasis: {
      focus: "series",
    },
    endLabel: {
      show: true,
      formatter: "{a}",
      distance: 10,
      fontFamily: "inherit",
    },
    labelLayout: {
      moveOverlap: "shiftY",
    },
    tooltip: {
      valueFormatter: (value) =>
        `${new Intl.NumberFormat("fa-IR").format(Number(value))} دقیقه`,
    },
  }));

  return {
    animationDuration: 2000,
    tooltip: {
      trigger: "axis",
      order: "valueDesc",
      textStyle: { fontFamily: "inherit" },
    },
    legend: {
      type: "scroll",
      top: 0,
      itemGap: 24,
      textStyle: { fontFamily: "inherit" },
    },
    grid: {
      left: "3%",
      right: "15%",
      bottom: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: formattedLabels,
      axisLabel: { fontFamily: "inherit" },
    },
    yAxis: {
      type: "value",
      name: "دقیقه",
      nameTextStyle: { fontFamily: "inherit" },
      axisLabel: {
        fontFamily: "inherit",
        formatter: (value: number) =>
          new Intl.NumberFormat("fa-IR").format(value),
      },
    },
    series: chartSeries,
  };
};
