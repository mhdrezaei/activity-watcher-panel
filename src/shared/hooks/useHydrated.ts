"use client";

import { useSyncExternalStore } from "react";

export function useHydrated() {
  const hydrated = useSyncExternalStore(
    // subscribe: اینجا hydration تغییر نمی‌کند پس null
    () => () => {},
    // client snapshot → همیشه true
    () => true,
    // server snapshot → همیشه false
    () => false
  );

  return hydrated;
}
