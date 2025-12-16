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
        "flex items-center justify-between px-4 py-3 border-b",
        className
      )}
    >
      <h3 className="font-semibold text-sm text-gray-700">{title}</h3>

      {actions && (
        <div className="flex bg-white p-1 rounded-md items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}
