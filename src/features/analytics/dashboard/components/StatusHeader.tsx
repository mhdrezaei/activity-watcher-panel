"use client";

import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs/Tabs";
import { AnalyticsTab, StatusHeaderProps } from "../types";

export function StatusHeader({ value, onChange }: StatusHeaderProps) {
  return (
    <div className="w-full bg-card text-card-foreground rounded-2xl shadow p-4 border border-border">
      {/* Title */}

      {/* Tabs (only controlling, no content inside) */}
      <Tabs
        value={value}
        onValueChange={(v) => onChange(v as AnalyticsTab)}
        className=" flex-row-reverse justify-start items-center gap-5"
      >
        <h2 className="font-bold text-lg">نمایش وضعیت</h2>
        <TabsList className="bg-muted p-1 rounded-xl flex gap-2">
          <TabsTrigger
            value="general"
            className="text-card-foreground data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-xl"
          >
            وضعیت کلی
          </TabsTrigger>

          <TabsTrigger
            value="users"
            className="text-card-foreground data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-xl"
          >
            به تفکیک کاربران
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
