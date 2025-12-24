export function UserDetailsSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="flex justify-start items-center gap-2">
          <div className="w-5 h-5 dark:bg-muted bg-muted-foreground/40 rounded-lg" />
          <div className="w-2/5 h-10 dark:bg-muted bg-muted-foreground/40 rounded-2xl" />
          <div className="w-8 h-6 dark:bg-muted bg-muted-foreground/40 rounded-2xl mr-auto" />
        </div>
      ))}
      <div className="w-full h-12 dark:bg-muted bg-muted-foreground/40 rounded-2xl" />
    </div>
  );
}
