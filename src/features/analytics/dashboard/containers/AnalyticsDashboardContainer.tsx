"use client";

import { useState } from "react";
import { StatusHeader } from "../components/StatusHeader";
import { StatusContent } from "../components/StatusContent";

export function AnalyticsDashboardContainer() {
  const [tab, setTab] = useState<"general" | "users">("general");

  return (
    <div className="space-y-6">
      <StatusHeader value={tab} onChange={setTab} />
      <StatusContent currentTab={tab} />
    </div>
  );
}
