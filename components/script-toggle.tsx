"use client";

import { useAppStore } from "@/lib/store/use-app-store";
import { cn } from "@/lib/utils";

interface ScriptToggleProps {
  className?: string;
}

export function ScriptToggle({ className }: ScriptToggleProps) {
  const script = useAppStore((s) => s.preferences.script);
  const setScript = useAppStore((s) => s.setScript);

  return (
    <button
      onClick={() => setScript(script === "latin" ? "cyrillic" : "latin")}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border border-input bg-background px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      aria-label={script === "latin" ? "Cambiar a ćirilica" : "Cambiar a latinica"}
      title={script === "latin" ? "Cambiar a cirílico" : "Cambiar a latino"}
    >
      {script === "latin" ? (
        <>
          <span className="text-muted-foreground">Az</span>
          <span className="text-border">→</span>
          <span className="text-primary font-bold">Аз</span>
        </>
      ) : (
        <>
          <span className="text-primary font-bold">Аз</span>
          <span className="text-border">→</span>
          <span className="text-muted-foreground">Az</span>
        </>
      )}
    </button>
  );
}

// Hook for consuming the current script in any component
export function useSerbianText(latin: string, cyrillic: string): string {
  const script = useAppStore((s) => s.preferences.script);
  return script === "cyrillic" ? cyrillic : latin;
}
