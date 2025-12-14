import { OverviewCards } from "../components/OverviewCards";
import { WorkCharts } from "../components/WorkCharts";

export function OverviewContainer() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-6">
      {/* Cards Section */}
      <OverviewCards />

      {/* دیگر بخش‌های وضعیت کلی بعداً اضافه می‌شود */}
      <div className="">
        <WorkCharts />
      </div>
    </div>
  );
}
