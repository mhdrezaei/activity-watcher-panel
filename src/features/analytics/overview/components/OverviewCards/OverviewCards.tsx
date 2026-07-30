// src/features/analytics/overview/components/OverviewCards/OverviewCards.tsx
"use client";

import { useState } from "react";
import { AnimatedStatValue } from "@/shared/components/ui/animated-number/AnimatedStatValue";
import { DateTimeBox } from "@/shared/components/widgets/DateTimeBox";
import { X } from "lucide-react"; // ایمپورت آیکون ضربدر برای بستن مودال

interface StatItem {
  label: string;
  value?: number;
  icon?: React.ReactNode;
  loading?: boolean;
  users?: string[]; // لیست اسامی اضافه شد
  isClickable?: boolean; // شرط کلیک‌پذیری اضافه شد
}

interface OverviewCardsProps {
  stats?: StatItem[];
  isLoading?: boolean;
}

export function OverviewCards({ stats, isLoading }: OverviewCardsProps) {
  // استیت برای مدیریت مودال
  const [modalData, setModalData] = useState<{
    label: string;
    users: string[];
  } | null>(null);

  return (
    <>
      <div className="w-full flex flex-col lg:flex-row items-center justify-between bg-accent border border-border rounded-2xl p-4 lg:p-5 gap-4">
        <div className="w-full flex items-center justify-center lg:justify-start flex-wrap lg:flex-nowrap gap-4 md:gap-6">
          {stats?.map((item, i) => (
            <div
              key={i}
              onClick={() => {
                if (item.isClickable) {
                  setModalData({ label: item.label, users: item.users || [] });
                }
              }}
              className={`flex items-center gap-2 lg:gap-3 pr-0 lg:pr-4 border-none lg:border-solid lg:border-r border-border first:border-none 
                ${item.isClickable ? "cursor-pointer hover:opacity-75 transition-opacity" : ""}
              `}
            >
              <div
                title={item.label}
                className="flex shrink-0 items-center justify-center bg-card p-2 rounded-md"
              >
                {item.icon}
              </div>

              <span className="hidden md:block text-gray-500 text-sm whitespace-nowrap">
                {item.label}
              </span>
              <span className="text-primary text-sm font-bold whitespace-nowrap">
                <AnimatedStatValue
                  value={item.value}
                  suffix=" نفر"
                  isLoading={isLoading}
                />
              </span>
            </div>
          ))}
        </div>

        {/* جلوگیری از فشرده شدن کامپوننت تاریخ در دسکتاپ */}
        <div className="shrink-0 w-full lg:w-auto flex justify-center">
          <DateTimeBox />
        </div>
      </div>

      {/* مودال نمایش لیست کاربران */}
      {modalData && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => setModalData(null)}
        >
          <div
            className="bg-card text-card-foreground border border-border w-full max-w-md rounded-2xl shadow-lg flex flex-col max-h-[80vh]"
            onClick={(e) => e.stopPropagation()} // جلوگیری از بسته شدن هنگام کلیک روی خود مودال
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-bold text-lg">لیست {modalData.label}</h3>
              <button
                onClick={() => setModalData(null)}
                className="p-1.5 hover:bg-accent rounded-md cursor-pointer transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 overflow-y-auto">
              {modalData.users.length > 0 ? (
                <ul className="space-y-2">
                  {modalData.users.map((user, idx) => (
                    <li
                      key={idx}
                      className="bg-accent px-3 py-2 rounded-lg text-sm border border-border"
                    >
                      {user}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center text-muted-foreground text-sm py-8">
                  کاربری در این وضعیت یافت نشد.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
