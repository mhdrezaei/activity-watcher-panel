export function ChartCardSkeleton({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-accent rounded-2xl p-4 w-full h-[380px] animate-pulse">
      {children}
    </div>
  );
}
