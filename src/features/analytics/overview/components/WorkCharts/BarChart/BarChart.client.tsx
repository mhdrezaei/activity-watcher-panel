"use client";
import { forwardRef } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { barData } from "../../../data/fakeOverviewData";
import VerticalLabels from "./VerticalLabels";
type NumericKeys<T> = {
  [K in keyof T]-?: Exclude<T[K], undefined> extends number ? K : never;
}[keyof T];

function getYAxisConfig<T extends Record<string, unknown>>(
  data: readonly T[],
  keys: readonly NumericKeys<T>[],
  aggregation: "hourly" | "daily" | "weekly" | "monthly"
): {
  ticks: number[];
  max: number;
  format: (v: number) => string;
  unitLabel: string;
} {
  const maxMinutes = Math.max(
    0,
    ...data.map((item) =>
      keys.reduce((sum, key) => sum + (Number(item[key]) ?? 0), 0)
    )
  );

  // helper: انتخاب step خوش‌عدد
  const pickStep = (raw: number, candidates: number[]) => {
    for (const c of candidates) if (c >= raw) return c;
    return candidates[candidates.length - 1];
  };

  // ---------------- HOURLY (minutes) ----------------
  if (aggregation === "hourly") {
    // حداقل 60 دقیقه برای ظاهر خوب حتی اگر همه صفر باشند
    const baseMax = Math.max(maxMinutes, 60);

    // می‌خوایم 5 فاصله داشته باشیم => step تقریبی
    const rawStep = Math.ceil(baseMax / 5);

    // step های خوش‌فرم (دقیقه)
    const step = pickStep(rawStep, [5, 10, 15, 20, 30, 45, 60, 90, 120]);

    const max = step * 5;
    const ticks = Array.from({ length: 6 }, (_, i) => i * step);

    return {
      max,
      ticks,
      format: (v) => `${v}`, // دقیقه
      unitLabel: "دقیقه",
    };
  }

  // ---------------- DAILY / WEEKLY / MONTHLY (hours) ----------------
  // حداقل 5 ساعت برای ظاهر خوب حتی اگر همه صفر باشند
  const baseHours = Math.max(Math.ceil(maxMinutes / 60), 5);

  const rawStepHours = Math.ceil(baseHours / 5);

  // step های خوش‌فرم (ساعت)
  const stepHours = pickStep(rawStepHours, [1, 2, 3, 4, 6, 8, 12, 24]);

  const max = stepHours * 5 * 60;
  const ticks = Array.from({ length: 6 }, (_, i) => i * stepHours * 60);

  return {
    max,
    ticks,
    format: (v) => `${Math.round(v / 60)}`, // ساعت
    unitLabel: "ساعت",
  };
}

const BarChartCardClient = forwardRef<
  HTMLDivElement,
  {
    data: typeof barData;
    aggregation: "hourly" | "daily" | "weekly" | "monthly";
  }
>(function BarChart({ data, aggregation }, ref) {
  const keys = ["فعال", "عدم_فعالیت"];
  const yAxis = getYAxisConfig(data, ["فعال", "عدم_فعالیت"], aggregation);
  return (
    <div
      ref={ref}
      id="bar-chart"
      className="bg-white rounded-2xl p-4 flex flex-col gap-4 w-full h-[380px]"
    >
      <ResponsiveBar
        data={data}
        theme={{
          text: { fontFamily: "var(--font-iran-sans)" },
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
            <div className="min-w-56 rounded-xl border bg-white px-3 py-2 shadow-md text-sm">
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
                {String(id)}: {h ? `${h} ساعت` : ""}
                {m ? ` ${m} دقیقه` : ""}
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
          format: yAxis.format,
          legend: yAxis.unitLabel,
          legendPosition: "middle",
          legendOffset: -32,
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
});
export default BarChartCardClient;
