// src/features/analytics/overview/components/DevicePerformance/DevicePerformanceSkeleton.tsx
import React from "react";

export function DevicePerformanceSkeleton() {
  return (
    <div className="w-full h-[450px] flex flex-col pt-6 pb-2 px-2 animate-pulse">
      {/* بخش اصلی شامل محور Y و خطوط Grid */}
      <div className="flex-1 flex flex-col justify-between relative pl-10 pr-24">
        {/* خطوط پس‌زمینه (Grid Lines) */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between w-full relative z-0"
          >
            {/* لیبل‌های محور Y (سمت چپ) */}
            <div className="absolute -left-10 w-6 h-2.5 bg-muted rounded-full"></div>
            {/* خط افقی */}
            <div className="h-px w-full bg-border/40"></div>
          </div>
        ))}

        {/* گرافیک شبیه‌سازی خطوط نمودار با SVG */}
        <div className="absolute inset-0 left-10 right-24 pointer-events-none z-10 flex items-center">
          <svg
            className="w-full h-[85%] opacity-20"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* خط ۱ */}
            <path className="text-primary" d="M 0 90 C 20 80, 40 10, 100 15" />
            {/* خط ۲ */}
            <path
              className="text-muted-foreground"
              d="M 0 85 C 30 85, 50 40, 100 35"
            />
            {/* خط ۳ */}
            <path
              className="text-foreground"
              d="M 0 95 C 40 90, 60 60, 100 45"
            />
          </svg>
        </div>

        {/* شبیه‌سازی لیبل‌های انتهای نمودار (End Labels) مطابق تصویر */}
        <div className="absolute top-[10%] -right-2 flex items-center gap-2">
          <div className="w-3 h-px bg-primary/20"></div>
          <div className="w-16 h-2.5 bg-muted rounded-full"></div>
        </div>
        <div className="absolute top-[30%] -right-2 flex items-center gap-2">
          <div className="w-3 h-px bg-muted-foreground/20"></div>
          <div className="w-20 h-2.5 bg-muted rounded-full"></div>
        </div>
        <div className="absolute top-[45%] -right-2 flex items-center gap-2">
          <div className="w-3 h-px bg-foreground/20"></div>
          <div className="w-12 h-2.5 bg-muted rounded-full"></div>
        </div>
      </div>

      {/* محور X (زمان) */}
      <div className="flex justify-between items-center w-full pl-10 pr-24 mt-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-10 h-2.5 bg-muted rounded-full"></div>
        ))}
      </div>
    </div>
  );
}
