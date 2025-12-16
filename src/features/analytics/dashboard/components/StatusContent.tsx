import { AnalyticsOverview } from "@/features/analytics/overview";
import { UserDetails } from "@/features/analytics/user-details";
export function StatusContent({ currentTab }: { currentTab: string }) {
  return (
    <div className="mt-6">
      {currentTab === "general" && <AnalyticsOverview />}
      {currentTab === "users" && <UserDetails />}
    </div>
  );
}
