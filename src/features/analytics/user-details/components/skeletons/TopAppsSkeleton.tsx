export function TopAppsSkeleton() {
  return (
    <div className="px-4 py-2 space-y-4 animate-pulse">
      <div className="h-14 dark:bg-muted bg-muted-foreground/40 rounded-4xl w-full" />
      <div className="h-14 dark:bg-muted bg-muted-foreground/40 rounded-4xl w-2/3" />
      <div className="h-14 dark:bg-muted bg-muted-foreground/40 rounded-4xl w-1/3 " />
      <div className="h-14 dark:bg-muted bg-muted-foreground/40 rounded-4xl w-1/5 " />
    </div>
  );
}
