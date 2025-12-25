"use client";

import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs/Tabs";

export function OverviewHeader({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="w-full bg-card rounded-2xl  p-4 border border-border">
      {/* Title */}

      {/* Tabs (only controlling, no content inside) */}
      <Tabs
        value={value}
        onValueChange={onChange}
        className=" flex-row-reverse justify-start items-center gap-5"
      >
        <h2 className="font-bold text-lg">نمایش وضعیت</h2>
        <TabsList className="bg-muted p-1 rounded-xl flex gap-2">
          <TabsTrigger
            value="general"
            className="data-[state=active]:bg-white data- data-[state=active]:shadow-sm rounded-xl"
          >
            وضعیت کلی
          </TabsTrigger>

          <TabsTrigger
            value="users"
            className="data-[state=active]:bg-white data- data-[state=active]:shadow-sm rounded-xl"
          >
            به تفکیک کاربران
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
