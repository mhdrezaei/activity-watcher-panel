import { LucideIcon } from "lucide-react";

export type StatusItem = {
  id: string;
  label: string;
  description: string;
  status?: "success" | "neutral" | "warning";
  icon: LucideIcon;
};

export type StatusFooter = {
  title: string;
  time: string;
};
