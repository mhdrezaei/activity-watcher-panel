export function UserListSkeleton() {
  const rows = [
    { line1: "w-2/6", line2: "w-4/6" },
    { line1: "w-2/6", line2: "w-4/6" },
    { line1: "w-2/6", line2: "w-4/6" },
    { line1: "w-2/6", line2: "w-4/6" },
    { line1: "w-2/6", line2: "w-4/6" },
    { line1: "w-2/6", line2: "w-4/6" },
    { line1: "w-2/6", line2: "w-4/6" },
  ];

  return (
    <div className="w-full px-4 mt-2 space-y-6 animate-pulse">
      {rows.map((row, index) => (
        <div
          key={index}
          className="w-full h-11 flex justify-start items-center gap-4"
        >
          <div className="w-9 h-9 rounded-xl dark:bg-muted bg-muted-foreground/40" />
          <div className="w-full flex flex-col justify-start items-start gap-2">
            <div
              className={`h-3 dark:bg-muted bg-muted-foreground/40 rounded ${row.line1}`}
            />
            <div
              className={`h-3 dark:bg-muted bg-muted-foreground/40 rounded ${row.line2}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
