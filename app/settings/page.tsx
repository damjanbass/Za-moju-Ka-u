"use client";

import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useAppStore, type DailyGoal } from "@/lib/store/use-app-store";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const minuteOptions: { value: DailyGoal; label: string }[] = [
  { value: 5, label: "5 min" },
  { value: 10, label: "10 min" },
  { value: 20, label: "20 min" },
  { value: 30, label: "30 min" },
];

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const {
    preferences,
    setScript,
    setSound,
    setDailyGoal,
    setAudioSpeed,
  } = useAppStore();

  function handleClearData() {
    if (window.confirm("¿Segura? Esto borrará todo tu progreso, racha y palabras aprendidas.")) {
      localStorage.removeItem("katica-app-store");
      window.location.reload();
    }
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Ajustes</h1>
          <p className="text-muted-foreground text-sm">
            Idioma de la interfaz: Español (fijo)
          </p>
        </div>

        {/* Script */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Alfabeto por defecto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-3">
              <Button
                variant={preferences.script === "latin" ? "default" : "outline"}
                onClick={() => { setScript("latin"); toast.success("Cambio a latinica"); }}
                className="flex-1"
              >
                Latinica (Abc)
              </Button>
              <Button
                variant={preferences.script === "cyrillic" ? "default" : "outline"}
                onClick={() => { setScript("cyrillic"); toast.success("Cambio a ćirilica"); }}
                className="flex-1"
              >
                Ćirilica (Абв)
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Cambia entre los dos sistemas de escritura. También puedes alternar con el botón
              Az/Аз del menú lateral.
            </p>
          </CardContent>
        </Card>

        {/* Theme */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Tema visual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              {(["light", "dark", "system"] as const).map((t) => (
                <Button
                  key={t}
                  variant={theme === t ? "default" : "outline"}
                  onClick={() => setTheme(t)}
                  className="flex-1 capitalize"
                >
                  {t === "light" ? "Claro" : t === "dark" ? "Oscuro" : "Sistema"}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Daily goal */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Meta diaria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 flex-wrap">
              {minuteOptions.map(({ value, label }) => (
                <Button
                  key={value}
                  variant={preferences.dailyGoal === value ? "default" : "outline"}
                  onClick={() => { setDailyGoal(value); toast.success(`Meta: ${value} minutos/día`); }}
                  className="flex-1"
                >
                  {label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Audio speed */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Velocidad del audio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground w-10">0.5×</span>
              <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.1"
                value={preferences.audioSpeed}
                onChange={(e) => setAudioSpeed(parseFloat(e.target.value))}
                className="flex-1 accent-primary"
              />
              <span className="text-sm font-medium w-10 text-right">{preferences.audioSpeed}×</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Velocidad actual: {preferences.audioSpeed}× — empieza despacio y ve aumentando.
            </p>
          </CardContent>
        </Card>

        {/* Sound effects */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Efectos de sonido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Sonidos de ejercicio</p>
                <p className="text-xs text-muted-foreground">Ding en aciertos, bum en fallos</p>
              </div>
              <Switch
                checked={preferences.sound}
                onCheckedChange={(v) => { setSound(v); toast.success(v ? "Sonido activado" : "Sonido desactivado"); }}
                aria-label="Activar o desactivar efectos de sonido"
              />
            </div>
          </CardContent>
        </Card>

        {/* Danger zone */}
        <Card className="border-destructive/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-destructive">Zona peligrosa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Esto borrará todo tu progreso, incluyendo XP, racha, palabras aprendidas y el historial SRS.
              No se puede deshacer.
            </p>
            <Button variant="destructive" size="sm" onClick={handleClearData}>
              Borrar todo el progreso
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
