"use client";

import { Card, CardHeader, CardContent } from "@/shared/components/ui/card";
import { Settings } from "lucide-react";
import { StatusList } from "@/shared/components/status-list";

import { mapCurrentStatusToStatusList } from "../../../transformers/mapUserDetailsToStatusList";
import { UserCurrentStatusResponse } from "../../../types";
import { UserDetailsSkeleton } from "../../skeletons/UserDetailsSkeleton";

type Props = {
  data: UserCurrentStatusResponse;
  isLoading: boolean;
};

export default function CurrentUserStatus({ data, isLoading }: Props) {
  const { items, footer } = data
    ? mapCurrentStatusToStatusList(data)
    : { items: [], footer: { title: "", time: "" } };

  return (
    <Card className="bg-[#FAFAFA]">
      <CardHeader
        title="وضعیت فعلی"
        actions={<Settings className="w-4 h-4 text-muted-foreground" />}
      />
      <CardContent>
        {isLoading ? (
          <UserDetailsSkeleton />
        ) : (
          <StatusList items={items} footer={footer} />
        )}
      </CardContent>
    </Card>
  );
}
