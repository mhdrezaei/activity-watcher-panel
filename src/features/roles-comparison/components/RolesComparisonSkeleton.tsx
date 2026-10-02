import React from "react";

export function RolesComparisonSkeleton() {
  return (
    <div className="flex flex-col gap-4 w-full h-[450px] p-4 animate-pulse">
      {/* هدر اکشن‌ها (دکمه‌های انتخاب و غیره) */}
      <div className="flex flex-wrap items-center justify-end gap-3 mb-4">
        <div className="h-8 w-24 rounded-md bg-muted" />
        <div className="h-8 w-24 rounded-md bg-muted" />
        <div className="h-8 w-32 rounded-md bg-muted" />
      </div>

      {/* ناحیه نمودار */}
      <div className="flex-1 flex flex-col items-center justify-end gap-4 pb-4">
        {/* شبیه‌سازی خطوط محور Y */}
        <div className="w-full flex justify-between absolute h-[300px] flex-col-reverse px-12 pointer-events-none opacity-20">
          <div className="border-b border-dashed border-border w-full h-0"></div>
          <div className="border-b border-dashed border-border w-full h-0"></div>
          <div className="border-b border-dashed border-border w-full h-0"></div>
          <div className="border-b border-dashed border-border w-full h-0"></div>
          <div className="border-b border-dashed border-border w-full h-0"></div>
        </div>

        {/* شبیه‌سازی مسیر نمودار (Line) - فقط افکت کلی */}
        <div className="relative w-full h-full flex items-end justify-between px-10">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div
                className="w-2 rounded-t-full bg-primary/20"
                style={{
                  height: `${Math.random() * 80 + 20}%`,
                }}
              />
              <div className="w-8 h-3 bg-muted rounded-full" /> {/* لیبل محور X */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
