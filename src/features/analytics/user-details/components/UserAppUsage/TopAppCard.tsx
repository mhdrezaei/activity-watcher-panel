import { Card, CardHeader, CardContent } from "@/shared/components/ui/card";
import { Settings } from "lucide-react";
import { AppUsageList } from "./AppUsageList";
import { UserDetails } from "../../types";

export function TopAppsCard({ details }: { details: UserDetails }) {
  return (
    <Card className="bg-[#f3f6ff]">
      <CardHeader
        title="پر استفاده‌ترین برنامه‌ها"
        actions={<Settings className="w-4 h-4 text-muted-foreground" />}
      />
      <CardContent>
        <AppUsageList items={details.topApps} />
      </CardContent>
    </Card>
  );
}
