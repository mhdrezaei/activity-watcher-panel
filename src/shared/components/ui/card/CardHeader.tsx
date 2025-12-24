import { cn } from "@/lib/utils/shadcn";

type CardHeaderProps = {
  title: string;
  actions?: React.ReactNode;
  className?: string;
};

export function CardHeader({ title, actions, className }: CardHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 py-3 border-b border-card",
        className
      )}
    >
      <h3 className="font-semibold text-sm text-card-foreground">{title}</h3>

      {actions && (
        <div className="flex bg-card p-1 rounded-md items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}
