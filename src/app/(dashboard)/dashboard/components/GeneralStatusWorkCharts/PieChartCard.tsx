import dynamic from "next/dynamic";

export const PieChartCard = dynamic(() => import("./PieChartCard.client"), {
  ssr: false,
});
