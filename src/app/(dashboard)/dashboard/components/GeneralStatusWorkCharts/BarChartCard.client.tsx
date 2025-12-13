"use client";

import { ResponsiveBar } from "@nivo/bar";
import { barData } from "./chartData";
import VerticalLabels from "./components/VerticalLabels";
type NumericKeys<T> = {
  [K in keyof T]-?: Exclude<T[K], undefined> extends number ? K : never;
}[keyof T];

function getYAxisConfig<T extends Record<string, unknown>>(
  data: readonly T[],
  keys: readonly NumericKeys<T>[]
): { ticks: number[]; max: number } {
  // بیشترین مقدار stacked (دقیقه)
  const maxMinutes = Math.max(
    ...data.map((item) =>
      keys.reduce((sum, key) => sum + (Number(item[key]) ?? 0), 0)
    )
  );

  // تبدیل به ساعت
  const maxHours = Math.ceil(maxMinutes / 60);

  // تقسیم بر 5
  const stepHours = Math.ceil(maxHours / 5);

  // حداکثر نهایی محور (ساعت)
  const maxAxisHours = stepHours * 5;

  // ساخت ticks (بر حسب دقیقه چون داده دقیقه است)
  const ticks: number[] = [];
  for (let i = 0; i <= maxAxisHours; i += stepHours) {
    ticks.push(i * 60);
  }

  return {
    ticks,
    max: maxAxisHours * 60,
  };
}

export default function BarChartCardClient() {
  const keys = ["فعال", "عدم_فعالیت"];
  const yAxis = getYAxisConfig(barData, ["فعال", "عدم_فعالیت"]);

  return (
    <div className="bg-white rounded-2xl p-4 flex flex-col gap-4 w-full h-[380px]">
      <ResponsiveBar
        data={barData}
        theme={{
          grid: {
            line: {
              stroke: "#bfc3d1", // رنگ شبیه تصویر
              strokeWidth: 1,
              strokeDasharray: "6 6", // 👈 خط‌چین افقی
            },
          },
          axis: {
            domain: {
              line: {
                stroke: "#e5e7eb",
                strokeWidth: 1,
              },
            },
          },
        }}
        enableGridX={false}
        enableGridY={true}
        keys={keys}
        indexBy="day"
        groupMode="stacked"
        layout="vertical"
        /* ---------- Animation ---------- */
        animate
        motionConfig="gentle"
        /* ---------- Style ---------- */
        padding={0.4}
        colors={["#6366f1", "#f87171"]}
        colorBy="id"
        borderRadius={2}
        enableLabel={false}
        /* ---------- Tooltip ---------- */
        tooltip={({ id, value, color, indexValue }) => {
          const total = Number(value ?? 0);
          const h = Math.floor(total / 60);
          const m = total % 60;

          return (
            <div className="rounded-xl border bg-white px-3 py-2 shadow-md text-sm">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: color }}
                />
                <span className="text-muted-foreground">
                  {String(indexValue)}
                </span>
              </div>

              <div className="mt-1 font-medium">
                {String(id)}: {h} ساعت{m ? ` ${m} دقیقه` : ""}
              </div>
            </div>
          );
        }}
        /* ---------- Grid & Axis ---------- */
        valueScale={{ type: "linear", max: yAxis.max }}
        // maxValue={yAxis.max}
        gridYValues={yAxis.ticks}
        margin={{ top: 50, right: 20, bottom: 40, left: 40 }}
        axisBottom={{
          tickSize: 0,
          tickPadding: 12,
        }}
        axisLeft={{
          tickSize: 1,
          tickPadding: 20,
          tickValues: yAxis.ticks,
          format: (v) => Math.round(Number(v) / 60),
        }}
        /* ---------- Legend ---------- */
        legends={[
          {
            dataFrom: "keys",
            anchor: "top-right",
            direction: "row",
            translateY: -50,
            translateX: 80,
            itemsSpacing: 8,
            itemWidth: 100,
            itemHeight: 20,
            symbolSize: 14,
            symbolShape: "circle",
            symbolSpacing: -20,
            itemTextColor: "#6b7280",
          },
        ]}
        /* ---------- Custom Layers ---------- */
        layers={["grid", "axes", "bars", VerticalLabels, "markers", "legends"]}
        role="application"
      />
    </div>
  );
}
