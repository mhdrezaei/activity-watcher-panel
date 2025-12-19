import { Card, CardHeader, CardContent } from "@/shared/components/ui/card";
import { Settings } from "lucide-react";
import { AppUsageList } from "./AppUsageList";
import { useUserTopApps } from "../../../hooks/useUserTopApps";
import { TopAppsSkeleton } from "../../skeletons/TopAppsSkeleton";

export function TopAppsCard({ userId }: { userId: string }) {
  const { data, isLoading } = useUserTopApps(userId);
  return (
    <Card className="bg-[#f3f6ff]">
      <CardHeader
        title="پر استفاده‌ترین برنامه‌ها"
        actions={<Settings className="w-4 h-4 text-muted-foreground" />}
      />
      {isLoading && !data ? (
        <TopAppsSkeleton />
      ) : (
        <CardContent>
          <AppUsageList items={data!.details!} />
        </CardContent>
      )}
    </Card>
  );
}
