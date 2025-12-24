import { ChartCardSkeleton } from "./ChartCardSkeleton";

export function BarChartSkeleton() {
  return (
    <ChartCardSkeleton>
      {/* Legend */}
      <div className="flex gap-4 mb-4">
        {[1, 2].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full dark:bg-muted bg-muted-foreground/40" />
            <div className="h-3 w-16 dark:bg-muted bg-muted-foreground/40 rounded" />
          </div>
        ))}
      </div>

      {/* Chart Area */}
      <div className="flex items-end justify-around h-[260px] px-8">
        {[140, 160, 120, 180, 160, 190, 215].map((h, i) => (
          <div
            key={i}
            className="w-8 dark:bg-muted bg-muted-foreground/40 rounded-lg"
            style={{ height: `${h}px` }}
          />
        ))}
      </div>

      {/* X axis */}
      <div className="flex justify-around mt-4 px-8">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="h-3 w-8 dark:bg-muted bg-muted-foreground/40 rounded"
          />
        ))}
      </div>
    </ChartCardSkeleton>
  );
}
