"use client";

import { useState } from "react";

import BarChartClient from "@/features/analytics/overview/components/WorkCharts/BarChart/BarChart.client";

import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Settings, Printer } from "lucide-react";

import { RangeSelect } from "@/features/analytics/overview/components/WorkCharts/filter/RangeSelect";
import type { WorkRange } from "@/features/analytics/overview/types";

import {
  exportBarChartToPDF,
  exportBarChartToExcel,
} from "@/lib/utils/exportBarChart";
import { printBarChart } from "@/lib/utils/printBarChart";

import Image from "next/image";
import { useUserWorkStats } from "../../../hooks/useUserWorkStats";
import { BarChartSkeleton } from "../../skeletons/BarChartSkeleton";
import { mapAggregatesToBar } from "../../../transformers/mapAggregatesToBar";

export function UserWorkChart({ userId }: { userId: string }) {
  const [range, setRange] = useState<WorkRange>("current_day");

  const { data, isLoading } = useUserWorkStats(userId, range);

  if (isLoading || !data) {
    return <BarChartSkeleton />;
  }

  const barData = mapAggregatesToBar(data);

  return (
    <Card className="bg-accent text-card-foreground">
      <CardHeader
        title="میزان کارکرد"
        actions={
          <div className="flex items-center gap-2">
            <RangeSelect value={range} onChange={setRange} />

            <Button
              size="icon"
              variant="outline"
              onClick={() =>
                exportBarChartToPDF(
                  document.getElementById("user-work-chart")!,
                  "میزان کارکرد کاربر"
                )
              }
            >
              <Image
                src="/images/export-pdf.png"
                alt="export-pdf"
                width={24}
                height={24}
              />
            </Button>

            <Button
              size="icon"
              variant="outline"
              onClick={() =>
                exportBarChartToExcel(barData.data, "میزان کارکرد کاربر")
              }
            >
              <Image
                src="/images/export-excel.png"
                alt="export-excel"
                width={24}
                height={24}
              />
            </Button>

            <Button
              size="icon"
              variant="outline"
              onClick={() =>
                printBarChart("user-work-chart", "میزان کارکرد کاربر")
              }
            >
              <Printer size={14} />
            </Button>

            <Settings className="w-4 h-4 text-muted-foreground" />
          </div>
        }
      />

      <CardContent>
        <BarChartClient
          id="user-work-chart"
          data={barData.data}
          aggregation={data.aggregation}
        />
      </CardContent>
    </Card>
  );
}
