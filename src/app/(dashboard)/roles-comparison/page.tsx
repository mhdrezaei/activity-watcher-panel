import { Metadata } from "next";
import { RolesComparisonSection } from "@/features/roles-comparison/components/RolesComparisonSection";

export const metadata: Metadata = {
  title: "مقایسه نقش‌ها | آکو واچ",
  description: "مقایسه کارکرد نقش‌ها در سیستم",
};

export default function RolesComparisonPage() {
  return (
    <div className="flex flex-col gap-6 w-full h-full p-4">

      <RolesComparisonSection />
    </div>
  );
}
