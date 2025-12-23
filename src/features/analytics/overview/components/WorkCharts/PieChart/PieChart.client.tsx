"use client";

import { ResponsivePie } from "@nivo/pie";
import type { PieSlice } from "@/features/analytics/overview/types";

export default function PieChartCardClient({ data }: { data: PieSlice[] }) {
  return (
    <div className="bg-white rounded-2xl p-4 flex flex-col gap-4 w-full h-[380px]">
      <ResponsivePie
        data={data}
        animate={true}
        margin={{ top: 50, right: 20, bottom: 20, left: 20 }}
        innerRadius={0.5}
        padAngle={4}
        cornerRadius={5}
        activeOuterRadiusOffset={8}
        colors={(d) => d.data.color}
        borderWidth={1}
        borderColor="#ffffff"
        enableArcLabels={false}
        arcLabelsSkipAngle={10}
        arcLinkLabelsTextOffset={30}
        arcLinkLabelsSkipAngle={20}
        legends={[
          {
            anchor: "top",
            direction: "row",
            translateY: -50,
            translateX: 60,
            itemWidth: 120,
            itemHeight: 20,
            symbolSize: 14,
            padding: { bottom: 20 },
            symbolShape: "circle",
            symbolSpacing: -20,
            itemTextColor: "#6b7280",
          },
        ]}
      />
    </div>
  );
}
