import { Card, CardHeader, CardContent } from "@/shared/components/ui/card";
import { Settings } from "lucide-react";
import { StatusList } from "@/shared/components/status-list";
import { UserDetails } from "../../types";
import { mapUserDetailsToStatusList } from "../../../transformers/mapUserDetailsToStatusList";

type Props = {
  details: UserDetails;
};

export default function CurrentUserStatus({ details }: Props) {
  const { items, footer } = mapUserDetailsToStatusList(details);

  return (
    <Card className="bg-[#FAFAFA]">
      <CardHeader
        title="وضعیت فعلی"
        actions={<Settings className="w-4 h-4 text-muted-foreground" />}
      />
      <CardContent>
        <StatusList items={items} footer={footer} />
      </CardContent>
    </Card>
  );
}
