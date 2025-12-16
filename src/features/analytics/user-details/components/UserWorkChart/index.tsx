"use client";

import { workStatsToBarData } from "../../../transformers/workStatsToBarData";
import BarChartClient from "@/features/analytics/overview/components/WorkCharts/BarChart/BarChart.client";
import { UserDetails } from "../../types";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Settings } from "lucide-react";

export function UserWorkChart({ details }: { details: UserDetails }) {
  const data = workStatsToBarData(details.workStats);

  return (
    <Card className="bg-[#f3f6ff]">
      <CardHeader
        title="میزان کارکرد"
        actions={<Settings className="w-4 h-4 text-muted-foreground" />}
      />
      <CardContent>
        <BarChartClient data={data} />
      </CardContent>
    </Card>
  );
}
