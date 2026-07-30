// src/features/compare/components/CompareDashboard.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CompareHeader from "./CompareHeader";
import SummaryCards from "./SummaryCards";
import CompareChart from "./CompareChart";
import ActionButtons from "./ActionButtons";
import { useCompareMutation } from "../api/useCompare";
import { ComparePayload } from "../types";

export function CompareDashboard() {
  const [params, setParams] = useState<ComparePayload>({
    device_a: "",
    device_b: "",
    range_key: "last_7_days",
  });

  const {
    mutate: fetchCompare,
    data: compareData,
    isPending,
  } = useCompareMutation();

  const handleCompare = () => {
    if (params.device_a && params.device_b) {
      fetchCompare(params);
    }
  };

  return (
    <div className="p-6  mx-auto space-y-6">
      <CompareHeader
        params={params}
        setParams={setParams}
        onCompare={handleCompare}
        isLoading={isPending}
      />

      {/* Preloader / Skeleton */}
      {isPending && (
        <div className="animate-pulse space-y-6">
          {/* اسکلتون دکمه‌های بالای صفحه */}
          <div className="flex flex-wrap items-center justify-end gap-3 mb-6">
            <div className="h-9 w-32 bg-muted rounded-md"></div>
            <div className="h-9 w-32 bg-muted rounded-md"></div>
            <div className="h-9 w-32 bg-muted rounded-md"></div>
          </div>

          <div className="space-y-6 p-4 rounded-xl bg-background">
            <div className="space-y-4">
              <div className="flex justify-end">
                <div className="h-8 w-28 bg-muted rounded-lg"></div>
              </div>

              {/* شبکه ۶ تایی کارت‌ها */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-card p-5 rounded-2xl border border-border flex flex-col justify-between h-[180px]"
                  >
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-5 h-5 bg-muted rounded-full"></div>
                      <div className="h-4 w-24 bg-muted rounded"></div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="h-3 w-20 bg-muted rounded"></div>
                        <div className="h-4 w-12 bg-muted rounded"></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="h-3 w-20 bg-muted rounded"></div>
                        <div className="h-4 w-12 bg-muted rounded"></div>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-border flex justify-between items-center">
                      <div className="h-3 w-24 bg-muted rounded"></div>
                      <div className="h-4 w-16 bg-muted rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* اسکلتون بخش نمودارها */}
            <div className="bg-card p-6 rounded-2xl border border-border">
              <div className="h-6 w-48 bg-muted rounded mb-6"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 gap-y-12">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-full h-[350px] bg-muted rounded-xl"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!isPending && compareData && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <ActionButtons data={compareData} />
          <div
            id="compare-dashboard-content"
            className="space-y-6 p-4 rounded-xl bg-background"
          >
            <SummaryCards data={compareData} />
            <div className="bg-card text-card-foreground p-6 rounded-2xl shadow-sm border border-border">
              <h3 className="text-lg font-semibold mb-6 text-foreground">
                روند کارکرد (تایم‌لاین)
              </h3>
              <CompareChart data={compareData} />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
