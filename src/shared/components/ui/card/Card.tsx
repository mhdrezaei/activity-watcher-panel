import { forwardRef } from "react";
import { cn } from "@/lib/utils/shadcn";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, ...props }, ref) => (
    <div
      className={cn("rounded-2xl border bg-card shadow-sm", className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  ),
);
Card.displayName = "Card";
