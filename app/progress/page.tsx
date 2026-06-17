"use client";

import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAppStore } from "@/lib/store/use-app-store";
import { dueCount } from "@/lib/srs";
import { Flame, Zap, BookOpen, RotateCcw, Target } from "lucide-react";

export default function ProgressPage() {
  const progress = useAppStore((s) => s.progress);
  const srsCards = useAppStore((s) => s.srs);
  const preferences = useAppStore((s) => s.preferences);
  const due = dueCount(srsCards);

  const totalCards = Object.keys(srsCards).length;
  const masteredCards = Object.values(srsCards).filter((c) => c.interval >= 21).length;

  const cefrLevel = progress.xp < 100 ? "A1" : progress.xp < 300 ? "A2" : progress.xp < 700 ? "B1" : "B2";
  const xpToNext = progress.xp < 100 ? 100 : progress.xp < 300 ? 300 : progress.xp < 700 ? 700 : 1500;
  const xpPrev = progress.xp < 100 ? 0 : progress.xp < 300 ? 100 : progress.xp < 700 ? 300 : 700;
  const levelProgress = ((progress.xp - xpPrev) / (xpToNext - xpPrev)) * 100;

  const stats = [
    { icon: Flame, label: "Racha actual", value: `${progress.streak} días`, color: "text-orange-500" },
    { icon: Zap, label: "XP total", value: progress.xp.toString(), color: "text-amber-500" },
    { icon: BookOpen, label: "Lecciones completas", value: progress.completedLessons.length.toString(), color: "text-primary" },
    { icon: RotateCcw, label: "Pendientes de repaso", value: due.toString(), color: "text-secondary" },
    { icon: Target, label: "Palabras en SRS", value: totalCards.toString(), color: "text-green-600" },
    { icon: Target, label: "Palabras dominadas", value: masteredCards.toString(), color: "text-green-700" },
  ];

  const isEmpty = progress.xp === 0 && progress.completedLessons.length === 0;

  if (isEmpty) {
    return (
      <AppShell>
        <div className="mx-auto max-w-2xl px-4 py-16 text-center">
          <span className="text-6xl mb-4 block">📊</span>
          <h1 className="text-xl font-bold mb-2">Aún no hay estadísticas</h1>
          <p className="text-muted-foreground text-sm">
            Completa tu primera lección para ver aquí tu progreso, racha, precisión y palabras aprendidas.
          </p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl px-4 py-8 space-y-8">
        <div>
          <h1 className="text-2xl font-bold mb-1">Mi progreso</h1>
          <p className="text-muted-foreground text-sm">
            Meta diaria: {preferences.dailyGoal} minutos
          </p>
        </div>

        {/* CEFR */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center justify-between">
              Nivel MCER
              <Badge>{cefrLevel}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={Math.min(levelProgress, 100)} className="h-4 mb-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>A1</span><span>A2</span><span>B1</span><span>B2</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {xpToNext - progress.xp} XP para el siguiente nivel
            </p>
          </CardContent>
        </Card>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {stats.map(({ icon: Icon, label, value, color }) => (
            <Card key={label}>
              <CardContent className="p-4 flex items-center gap-3">
                <Icon className={`h-8 w-8 shrink-0 ${color}`} />
                <div>
                  <p className="text-xl font-bold">{value}</p>
                  <p className="text-xs text-muted-foreground leading-tight">{label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Heatmap placeholder */}
        <Card className="border-dashed">
          <CardContent className="p-6 text-center text-muted-foreground text-sm">
            <p className="mb-2">📅 Mapa de actividad — Fase 6</p>
            <p className="text-xs">El mapa de calor con tu actividad diaria estará disponible próximamente.</p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
