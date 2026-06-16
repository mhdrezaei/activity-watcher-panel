import { ChartCardSkeleton } from "./ChartCardSkeleton";

export function BarChartSkeleton() {
  // دیتای نمایشی برای ارتفاع ستون‌های کنار هم (فعال و عدم فعالیت)
  const mockHeights = [
    { active: 140, inactive: 90 },
    { active: 180, inactive: 120 },
    { active: 110, inactive: 60 },
    { active: 210, inactive: 140 },
    { active: 160, inactive: 100 },
    { active: 190, inactive: 150 },
    { active: 220, inactive: 180 },
  ];

  return (
    <ChartCardSkeleton>
      {/* Container با انیمیشن Pulse تیلویند */}
      <div className="flex flex-col w-full h-[400px] animate-pulse">
        {/* Header: Legend & Toolbox */}
        <div className="flex justify-between items-start mb-8">
          {/* Legend */}
          <div className="flex gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted-foreground/20 dark:bg-muted" />
                <div className="h-3 w-16 bg-muted-foreground/20 dark:bg-muted rounded" />
              </div>
            ))}
          </div>

          {/* Toolbox Icons */}
          <div className="flex gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-4 h-4 rounded bg-muted-foreground/20 dark:bg-muted"
              />
            ))}
          </div>
        </div>

        {/* Chart Body */}
        <div className="flex flex-1 gap-4">
          {/* Y-axis Labels */}
          <div className="flex flex-col justify-between py-2 w-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-2.5 w-full bg-muted-foreground/20 dark:bg-muted rounded"
              />
            ))}
          </div>

          {/* Main Chart Area */}
          <div className="relative flex-1 flex flex-col justify-end">
            {/* Grid Lines (Horizontal) */}
            <div className="absolute inset-0 flex flex-col justify-between py-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="w-full h-[1px] bg-muted-foreground/10 dark:bg-muted/40"
                />
              ))}
            </div>

            {/* Bars and X-axis Labels */}
            <div className="relative flex justify-around items-end h-full border-b border-muted-foreground/20 dark:border-muted/50 pb-2">
              {mockHeights.map((h, i) => (
                <div key={i} className="flex flex-col items-center gap-4">
                  {/* Grouped Bars */}
                  <div className="flex items-end gap-1">
                    {/* Active Bar Skeleton (Indigo tinted) */}
                    <div
                      className="w-4 md:w-6 bg-indigo-500/20 dark:bg-indigo-500/10 rounded-t-sm"
                      style={{ height: `${h.active}px` }}
                    />
                    {/* Inactive Bar Skeleton (Red tinted) */}
                    <div
                      className="w-4 md:w-6 bg-red-500/20 dark:bg-red-500/10 rounded-t-sm"
                      style={{ height: `${h.inactive}px` }}
                    />
                  </div>

                  {/* X-axis Label */}
                  <div className="h-2 w-12 bg-muted-foreground/20 dark:bg-muted rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ChartCardSkeleton>
  );
}
