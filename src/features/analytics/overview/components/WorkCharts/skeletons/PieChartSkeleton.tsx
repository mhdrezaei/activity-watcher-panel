import { ChartCardSkeleton } from "./ChartCardSkeleton";

export function PieChartSkeleton() {
  return (
    <ChartCardSkeleton>
      <div className="flex flex-col w-full h-[400px] animate-pulse">
        {/* Header: Legend & Toolbox */}
        <div className="flex justify-between items-start mb-8">
          {/* Spacer to keep legend perfectly centered (matches toolbox width) */}
          <div className="w-[68px]" />

          {/* Legend */}
          <div className="w-full flex flex-wrap justify-center items-center gap-4 md:gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted-foreground/20 dark:bg-muted" />
                <div className="h-3 w-12 md:w-16 bg-muted-foreground/20 dark:bg-muted rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Chart Body */}
        <div className="relative flex-1 flex items-center justify-center">
          {/* Donut Ring */}
          <div className="w-48 h-48 md:w-56 md:h-56 rounded-full border-[35px] md:border-[40px] border-muted-foreground/10 dark:border-muted/30" />

          {/* Simulated ECharts Outside Labels & Label Lines */}

          {/* Right Label */}
          <div className="absolute right-[5%] md:right-[15%] top-[40%] flex items-center">
            <div className="w-6 md:w-10 h-0.5 bg-muted-foreground/20 dark:bg-muted/60" />
            <div className="flex flex-col gap-2 ml-2">
              <div className="h-2.5 w-16 bg-muted-foreground/20 dark:bg-muted rounded" />
              <div className="h-2.5 w-8 bg-muted-foreground/20 dark:bg-muted rounded" />
            </div>
          </div>

          {/* Bottom Left Label */}
          <div className="absolute left-[5%] md:left-[15%] bottom-[25%] flex items-center flex-row-reverse">
            <div className="w-6 md:w-10 h-0.5 bg-muted-foreground/20 dark:bg-muted/60" />
            <div className="flex flex-col items-end gap-2 mr-2">
              <div className="h-2.5 w-14 bg-muted-foreground/20 dark:bg-muted rounded" />
              <div className="h-2.5 w-10 bg-muted-foreground/20 dark:bg-muted rounded" />
            </div>
          </div>

          {/* Top Left Label */}
          <div className="absolute left-[8%] md:left-[20%] top-[20%] flex items-center flex-row-reverse">
            <div className="w-4 md:w-6 h-0.5 bg-muted-foreground/20 dark:bg-muted/60" />
            <div className="flex flex-col items-end gap-2 mr-2">
              <div className="h-2.5 w-20 bg-muted-foreground/20 dark:bg-muted rounded" />
              <div className="h-2.5 w-12 bg-muted-foreground/20 dark:bg-muted rounded" />
            </div>
          </div>
        </div>
      </div>
    </ChartCardSkeleton>
  );
}
