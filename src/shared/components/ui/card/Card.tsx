import { cn } from "@/lib/utils/shadcn";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn("rounded-2xl border bg-card shadow-sm", className)}>
      {children}
    </div>
  );
}
