"use client";

import { useEffect, useState, useRef } from "react";
import {
  exportBarChartToExcel,
  exportBarChartToPDF,
} from "../../utils/exportBarChart";
import { printBarChart } from "../../utils/printBarChart";

import { Button } from "@/shared/components/ui/button";
import { Calendar, Download, RefreshCcw, Printer } from "lucide-react";

import { BarChartSkeleton } from "./skeletons/BarChartSkeleton";
import { PieChartSkeleton } from "./skeletons/PieChartSkeleton";
import BarChartCardClient from "./BarChart/BarChart.client";
import PieChartCardClient from "./PieChart/PieChart.client";

import { useDeviceCounts } from "../../hooks/useDeviceCounts";
import { mapDeviceCountsToPie } from "../../transformers/mapDeviceCountsToPie";
import { useWorkAggregates } from "../../hooks/useWorkAggregates";

import type { WorkRange } from "../../types";
import { RangeSelect } from "./filter/RangeSelect";
import { ChartFilters } from "../../hooks/useOverviewFilters";

const RANGE_STORAGE_KEY = "analytics.workCharts.range";

const WORK_RANGES = [
  "current_day",
  "current_month",
  "last_3_7days",
  "last_7_days",
  "last_30_days",
  "last_3_months",
  "last_6_months",
] as const;

function isWorkRange(value: unknown): value is WorkRange {
  return (
    typeof value === "string" &&
    (WORK_RANGES as readonly string[]).includes(value)
  );
}

function getInitialRange(): WorkRange {
  if (typeof window === "undefined") return "current_day";

  try {
    const saved = window.localStorage.getItem(RANGE_STORAGE_KEY);
    if (isWorkRange(saved)) return saved;
  } catch {
    // ignore
  }

  return "current_day";
}

export function WorkCharts() {
  const barChartRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState<WorkRange>(() => getInitialRange());

  useEffect(() => {
    try {
      window.localStorage.setItem(RANGE_STORAGE_KEY, range);
    } catch {
      // ignore
    }
  }, [range]);

  const {
    data: barData,
    isLoading: isLoadingBar,
    isFetching: isFetchingBar,
    refetch: refetchBar,
  } = useWorkAggregates(range);

  const {
    data: deviceCounts,
    isLoading: isLoadingPie,
    refetch: refetchPie,
    isFetching: isFetchingPie,
  } = useDeviceCounts();

  const pieData = deviceCounts ? mapDeviceCountsToPie(deviceCounts) : [];

  return (
    <div className="space-y-4">
      <div className="flex justify-start items-center gap-3">
        <RangeSelect value={range} onChange={setRange} />
        <ChartFilters range="daily" onRangeChange={() => {}} />
      </div>

      <div className="w-full p-2 bg-[#FAFBFE] rounded-b-xl">
        <div className="flex justify-between items-center w-[98%] mx-auto py-3 border-b border-slate-200 mb-2">
          <h3 className="text-sm font-bold text-[#595959]">میزان کارکرد</h3>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                refetchBar();
                refetchPie();
              }}
              disabled={isFetchingBar || isFetchingPie}
            >
              <RefreshCcw size={12} />
            </Button>

            <Button size="icon" variant="outline">
              <Calendar size={12} />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => printBarChart("bar-chart", "میزان کارکرد کاربران")}
            >
              <Printer size={12} />
            </Button>
            <div className="relative">
              <Button
                size="icon"
                variant="outline"
                onClick={() => setOpen((p) => !p)}
              >
                <Download size={12} />
              </Button>

              {open && (
                <div className="absolute left-0 mt-2 w-32 bg-white border rounded-xl shadow-md z-50">
                  <button
                    className="w-full px-3 py-2 text-sm hover:bg-gray-100 text-right"
                    onClick={() => {
                      if (barChartRef.current) {
                        exportBarChartToPDF(
                          barChartRef.current,
                          "میزان کارکرد کاربران"
                        );
                      }
                      setOpen(false);
                    }}
                  >
                    دانلود PDF
                  </button>

                  <button
                    className="w-full px-3 py-2 text-sm hover:bg-gray-100 text-right"
                    onClick={() => {
                      exportBarChartToExcel(
                        barData?.data ?? [],
                        "میزان کارکرد کاربران"
                      );
                      setOpen(false);
                    }}
                  >
                    دانلود Excel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {isLoadingBar ? (
            <BarChartSkeleton />
          ) : (
            <BarChartCardClient
              ref={barChartRef}
              data={barData?.data ?? []}
              aggregation={barData?.aggregation ?? "hourly"}
            />
          )}

          {isLoadingPie ? (
            <PieChartSkeleton />
          ) : (
            <PieChartCardClient data={pieData} />
          )}
        </div>
      </div>
    </div>
  );
}
