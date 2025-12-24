import { cn } from "@/lib/utils/shadcn";
import { StatusItem } from "./types";
import { useThemeStore } from "@/store/theme.store";

export function StatusListItem({ item }: { item: StatusItem }) {
  const { theme } = useThemeStore();
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
      <div className="flex rtl:flex-row-reverse items-center gap-3 text-muted-foreground">
        <span className=" text-sm">{item.description}</span>
        <Icon
          color={theme === "light" ? "#262626" : "#aaa"}
          className="w-5 h-5"
        />
      </div>
    </div>
  );
}
