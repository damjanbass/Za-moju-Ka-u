"use client";

import { useEffect } from "react";
import { useAppStore, loadFromStorage, saveToStorage } from "@/lib/store/use-app-store";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const _hydrate = useAppStore((s) => s._hydrate);

  useEffect(() => {
    // Load saved state from localStorage on first client render
    const saved = loadFromStorage();
    _hydrate(saved);

    // Subscribe to store changes and persist them
    const unsub = useAppStore.subscribe((state) => {
      if (state._hydrated) saveToStorage(state);
    });

    return unsub;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}
