import { ChartCardSkeleton } from "./ChartCardSkeleton";

export function BarChartSkeleton() {
  return (
    <ChartCardSkeleton>
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-8">
        <div className="w-28 h-8 dark:bg-muted bg-muted-foreground/40" />
        <div className="w-72 flex justify-center items-center gap-4">
          <div className="w-28 h-8 dark:bg-muted bg-muted-foreground/40" />
          <div className="w-8 h-8 rounded-full dark:bg-muted bg-muted-foreground/40"></div>
          <div className="w-8 h-8 rounded-full dark:bg-muted bg-muted-foreground/40"></div>
          <div className="w-8 h-8 rounded-full dark:bg-muted bg-muted-foreground/40"></div>
        </div>
      </div>
      {/* Legend */}
      <div className="flex gap-4">
        {[1, 2].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full dark:bg-muted bg-muted-foreground/40" />
            <div className="h-3 w-16 dark:bg-muted bg-muted-foreground/40 rounded" />
          </div>
        ))}
      </div>

      {/* Chart Area */}
      <div className="flex items-end justify-center gap-16 h-[220px] px-8">
        {[140, 160, 120, 180, 160, , 210, 130, 190, 215].map((h, i) => (
          <div
            key={i}
            className="w-8 dark:bg-muted bg-muted-foreground/40 rounded-lg"
            style={{ height: `${h}px` }}
          />
        ))}
      </div>

      {/* X axis */}
      <div className="flex justify-center gap-16 mt-4 px-8">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="h-3 w-8 dark:bg-muted bg-muted-foreground/40 rounded"
          />
        ))}
      </div>
    </ChartCardSkeleton>
  );
}
