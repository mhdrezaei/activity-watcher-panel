// src/features/analytics/overview/components/WorkCharts/filter/RoleSelect.tsx
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select/select";
import { useRoles } from "../../../hooks/useRole";

type Props = {
  value: number | "all";
  onChange: (value: number | "all") => void;
};

export function RoleSelect({ value, onChange }: Props) {
  const { data: roles, isLoading } = useRoles();

  return (
    <Select
      value={value.toString()}
      onValueChange={(val) => onChange(val === "all" ? "all" : Number(val))}
      disabled={isLoading}
    >
      <SelectTrigger className="w-40 border-muted-foreground [&_svg:not([class*='text-'])]:text-card-foreground disabled:opacity-50">
        <SelectValue placeholder="انتخاب نقش" />
      </SelectTrigger>

      <SelectContent className="bg-accent">
        <SelectItem value="all">همه نقش‌ها</SelectItem>
        {roles?.map((role) => (
          <SelectItem key={role.id} value={role.id.toString()}>
            {role.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
