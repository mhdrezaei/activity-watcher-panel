"use client";

import { useState } from "react";
import { StatusHeader } from "./components/StatusHeader";
import { StatusContent } from "./components/StatusContent";

export default function DashboardPage() {
  const [tab, setTab] = useState("general");

  return (
    <div className="space-y-6">
      {/* Header with tabs */}
      <StatusHeader value={tab} onChange={setTab} />

      {/* Content under the header */}
      <StatusContent currentTab={tab} />
    </div>
  );
}
