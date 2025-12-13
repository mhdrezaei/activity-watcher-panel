"use client";

import { useState } from "react";
import { ChartFilters, ChartRange } from "./ChartFilters";
import { PieChartCard } from "./PieChartCard";
import { BarChartCard } from "./BarChartCard";
import { Button } from "@/shared/components/ui/button";
import { Calendar, Download, RefreshCcw } from "lucide-react";
import { useGeneralStatusData } from "@/shared/hooks/useGeneralStatusData";
import { BarChartSkeleton } from "./components/skeletons/BarChartSkeleton";
import { PieChartSkeleton } from "./components/skeletons/PieChartSkeleton";
import BarChartCardClient from "./BarChartCard.client";
import PieChartCardClient from "./PieChartCard.client";

export function GeneralStatusWorkCharts() {
  const { isLoading, barData, pieData } = useGeneralStatusData();

  const [range, setRange] = useState<ChartRange>("weekly");

  return (
    <div className="space-y-4">
      <ChartFilters
        range={range}
        onRangeChange={setRange}
        onRefresh={() => {
          // بعداً: refetch API
          console.log("refresh charts");
        }}
        onDateChange={(date) => {
          console.log("selected date", date);
        }}
      />

      <div className="w-full p-2 bg-[#FAFBFE] rounded-b-xl flex flex-col justify-start items-start gap-2">
        <div className="flex justify-between items-center w-[98%] mx-auto py-3  border-b border-slate-200 mb-2">
          <h3 className="text-sm font-bold text-[#595959]">میزان کارکرد</h3>
          {/* Icons (Refresh + Date Picker + Export) */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="flex w-6 h-6 bg-white p-3 border border-dashed border-gray-500 rounded-sm hover:cursor-pointer hover:scale-105 hover:bg-gray-100"
              size="icon"
            >
              <RefreshCcw size={12} />
            </Button>

            <Button
              variant="outline"
              className="flex w-6 h-6 bg-white p-3 border border-dashed border-gray-500 rounded-sm hover:cursor-pointer hover:scale-105 hover:bg-gray-100"
              size="icon"
            >
              <Calendar size={12} />
            </Button>

            <Button
              variant="outline"
              className="flex w-6 h-6 bg-white p-3 border border-dashed border-gray-500 rounded-sm hover:cursor-pointer hover:scale-105 hover:bg-gray-100"
              size="icon"
            >
              <Download size={12} />
            </Button>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
          {isLoading ? (
            <BarChartSkeleton />
          ) : (
            <BarChartCardClient data={barData} />
          )}

          {isLoading ? (
            <PieChartSkeleton />
          ) : (
            <PieChartCardClient data={pieData} />
          )}
        </div>
      </div>
    </div>
  );
}
