import { ChartCardSkeleton } from "./ChartCardSkeleton";

export function PieChartSkeleton() {
  return (
    <ChartCardSkeleton>
      {/* Legend */}
      <div className="flex justify-center gap-6 mt-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-muted" />
            <div className="h-3 w-20 bg-muted rounded" />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center h-[360px] relative">
        {/* Donut */}
        <div className="w-64 h-64 rounded-full border-50 border-muted" />

        {/* Inner hole */}
        <div className="absolute w-24 h-24 rounded-full bg-white" />
      </div>
    </ChartCardSkeleton>
  );
}
