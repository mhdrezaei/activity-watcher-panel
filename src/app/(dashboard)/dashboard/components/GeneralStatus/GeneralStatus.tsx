import { GeneralStatusWorkCharts } from "../GeneralStatusWorkCharts";
import { GeneralStatusCards } from "./GeneralStatusCards";

export function GeneralStatus() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-6">
      {/* Cards Section */}
      <GeneralStatusCards />

      {/* دیگر بخش‌های وضعیت کلی بعداً اضافه می‌شود */}
      <div className="">
        <GeneralStatusWorkCharts />
      </div>
    </div>
  );
}
