import { ChartCardSkeleton } from "./ChartCardSkeleton";

export function PieChartSkeleton() {
  return (
    <ChartCardSkeleton>
      {/* Legend */}
      <div className="flex justify-center gap-6 mt-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full dark:bg-muted bg-muted-foreground/40" />
            <div className="h-3 w-20 dark:bg-muted bg-muted-foreground/40 rounded" />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center h-[360px] relative">
        {/* Donut */}
        <div className="w-64 h-64 rounded-full border-50 dark:border-muted border-muted-foreground/40" />

        {/* Inner hole */}
        <div className="absolute w-24 h-24 rounded-full bg-card" />
      </div>
    </ChartCardSkeleton>
  );
}
