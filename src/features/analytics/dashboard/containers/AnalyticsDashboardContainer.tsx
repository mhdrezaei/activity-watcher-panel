"use client";

import { useEffect, useState } from "react";
import { StatusHeader } from "../components/StatusHeader";
import { StatusContent } from "../components/StatusContent";
import type { AnalyticsTab } from "../types";

const TAB_STORAGE_KEY = "analytics.dashboard.tab";

function getInitialTab(): AnalyticsTab {
  if (typeof window === "undefined") return "general";

  try {
    const saved = localStorage.getItem(TAB_STORAGE_KEY);
    if (saved === "general" || saved === "users") {
      return saved;
    }
  } catch {
    // ignore storage errors
  }

  return "general";
}

export function AnalyticsDashboardContainer() {
  const [tab, setTab] = useState<AnalyticsTab>(() => getInitialTab());

  useEffect(() => {
    try {
      localStorage.setItem(TAB_STORAGE_KEY, tab);
    } catch {
      // ignore
    }
  }, [tab]);

  return (
    <div className="space-y-6">
      <StatusHeader value={tab} onChange={setTab} />
      <StatusContent currentTab={tab} />
    </div>
  );
}
