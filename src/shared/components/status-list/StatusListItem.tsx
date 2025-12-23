import { cn } from "@/lib/utils/shadcn";
import { StatusItem } from "./types";

export function StatusListItem({ item }: { item: StatusItem }) {
  const { icon: Icon } = item;

  return (
    <div className="flex rtl:flex-row-reverse items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "font-medium",
            item.status === "success" && "text-green-600",
            item.status === "neutral" && "text-muted-foreground"
          )}
        >
          {item.label}
        </span>
      </div>

      {/* Right */}
      <div className="flex rtl:flex-row-reverse items-center gap-2 text-muted-foreground">
        <span className="text-black text-sm">{item.description}</span>
        <Icon color="#262626" className="w-5 h-5" />
      </div>
    </div>
  );
}
