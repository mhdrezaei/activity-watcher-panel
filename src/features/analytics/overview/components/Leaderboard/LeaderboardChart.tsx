import ReactECharts from "echarts-for-react";
import { LeaderboardResponse, LeaderboardUser } from "../../types";
import { Trophy, TrendingDown } from "lucide-react";
import { useThemeStore } from "@/store/theme.store";

interface Props {
  data: LeaderboardResponse;
  rankBy: string;
}

export function LeaderboardChart({ data, rankBy }: Props) {
  const theme = useThemeStore((s) => s.theme);
  const isDark = theme === "dark";

  const mainFont =
    typeof document !== "undefined"
      ? getComputedStyle(document.documentElement).getPropertyValue("--font-iran-sans") || "sans-serif"
      : "sans-serif";

  const getChartOption = (users: LeaderboardUser[], isTop: boolean) => {
    // Reverse array to show rank 1 at the top of a horizontal bar chart
    const chartData = [...users].reverse();
    
    const names = chartData.map((u) => u.device_name);
    const values = chartData.map((u) => (rankBy === "active_pct" ? u.active_pct : Math.round(u.working_min)));
    const color = isTop ? (isDark ? "#34d399" : "#10b981") : (isDark ? "#fb7185" : "#f43f5e"); // emerald vs rose

    return {
      backgroundColor: "transparent",
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        textStyle: { fontFamily: mainFont },
        formatter: (params: any) => {
          const item = chartData[params[0].dataIndex];
          const val = params[0].value;
          const suffix = rankBy === "active_pct" ? "%" : " دقیقه";
          const subtextColor = isDark ? "#9ca3af" : "#666";
          const textColor = isDark ? "#f3f4f6" : "#000";
          return `
            <div style="direction: rtl; text-align: right; font-family: ${mainFont}; color: ${textColor};">
              <div style="font-weight: bold; margin-bottom: 4px;">${item.device_name}</div>
              <div style="font-size: 12px; color: ${subtextColor};">نقش: ${item.role || "بدون نقش"}</div>
              <div style="margin-top: 4px;">
                <span style="display:inline-block;margin-left:4px;border-radius:10px;width:10px;height:10px;background-color:${params[0].color};"></span>
                مقدار: <b>${val}${suffix}</b>
              </div>
            </div>
          `;
        },
      },
      grid: {
        left: "2%",
        right: "8%",
        bottom: "0%",
        top: "5%",
        containLabel: true,
      },
      xAxis: {
        type: "value",
        boundaryGap: [0, 0.05],
        splitLine: {
          lineStyle: {
            color: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
            type: "dashed"
          }
        },
        axisLabel: {
          color: isDark ? "#d1d5db" : "#4b5563",
          fontFamily: mainFont
        }
      },
      yAxis: {
        type: "category",
        data: names,
        axisLabel: {
          color: isDark ? "#d1d5db" : "#1f2937",
          fontFamily: mainFont,
          fontWeight: "bold",
          formatter: (value: string) => {
            return value.length > 15 ? value.substring(0, 15) + '...' : value;
          }
        },
        axisLine: { show: false },
        axisTick: { show: false }
      },
      series: [
        {
          name: rankBy === "active_pct" ? "درصد فعالیت" : "زمان کارکرد",
          type: "bar",
          data: values,
          itemStyle: {
            color: color,
            borderRadius: [0, 4, 4, 0]
          },
          barWidth: 16,
          label: {
            show: true,
            position: "right",
            color: isDark ? "#ffffff" : "#111827",
            fontFamily: mainFont,
            fontWeight: "bold",
            formatter: `{c}${rankBy === "active_pct" ? "%" : ""}`
          }
        }
      ]
    };
  };

  const topHeight = Math.max(320, data.top.length * 35);
  const bottomHeight = Math.max(320, data.bottom.length * 35);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full animate-in fade-in duration-500 text-right" dir="rtl">
      <div className="flex flex-col gap-4 bg-card dark:bg-card/60 p-4 rounded-xl border border-emerald-500/20 dark:border-emerald-500/20">
        <div className="flex items-center justify-start gap-2 mb-2">
          <div className="bg-emerald-100 dark:bg-emerald-500/10 p-2 rounded-lg shrink-0">
            <Trophy className="text-emerald-600 dark:text-emerald-500" size={20} />
          </div>
          <h4 className="font-bold text-foreground">نمودار برترین‌ها</h4>
        </div>
        <div className="w-full transition-all duration-300" style={{ height: topHeight }}>
          {data.top.length > 0 ? (
            <ReactECharts option={getChartOption(data.top, true)} style={{ height: "100%", width: "100%" }} />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">داده‌ای یافت نشد</div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 bg-card dark:bg-card/60 p-4 rounded-xl border border-rose-500/20 dark:border-rose-500/20">
        <div className="flex items-center justify-start gap-2 mb-2">
          <div className="bg-rose-100 dark:bg-rose-500/10 p-2 rounded-lg shrink-0">
            <TrendingDown className="text-rose-600 dark:text-rose-500" size={20} />
          </div>
          <h4 className="font-bold text-foreground">نمودار ضعیف‌ترین‌ها</h4>
        </div>
        <div className="w-full transition-all duration-300" style={{ height: bottomHeight }}>
          {data.bottom.length > 0 ? (
            <ReactECharts option={getChartOption(data.bottom, false)} style={{ height: "100%", width: "100%" }} />
          ) : (
             <div className="flex h-full items-center justify-center text-sm text-muted-foreground">داده‌ای یافت نشد</div>
          )}
        </div>
      </div>
    </div>
  );
}
