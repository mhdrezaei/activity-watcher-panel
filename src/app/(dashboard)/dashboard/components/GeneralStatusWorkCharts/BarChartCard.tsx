import dynamic from "next/dynamic";

export const BarChartCard = dynamic(() => import("./BarChartCard.client"), {
  ssr: false,
});
