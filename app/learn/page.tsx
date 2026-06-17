"use client";

import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store/use-app-store";
import { units, grammarTopics } from "@/lib/data";
import { Lock, CheckCircle2, ChevronRight, PlayCircle, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LearnPage() {
  const { progress } = useAppStore();

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Árbol de aprendizaje</h1>
          <p className="text-muted-foreground text-sm">
            Completa las unidades en orden. Cada una desbloquea la siguiente.
          </p>
        </div>

        {units.map((unit) => {
          const isUnlocked = progress.unlockedUnits.includes(unit.id);
          const completedCount = unit.lessons.filter((l) =>
            progress.completedLessons.includes(l.id)
          ).length;
          const isFullyCompleted = completedCount === unit.lessons.length;

          return (
            <div key={unit.id} className="space-y-3">
              {/* Unit header */}
              <div className={cn(
                "flex items-center gap-3 rounded-xl p-4 border",
                isUnlocked ? "bg-card" : "bg-muted/50 opacity-60",
              )}>
                <div className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-xl text-2xl",
                  isUnlocked ? unit.color : "bg-muted",
                )}>
                  {isUnlocked ? unit.icon : <Lock className="h-5 w-5 text-muted-foreground" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h2 className="font-semibold truncate">{unit.title}</h2>
                    {isFullyCompleted && (
                      <Badge variant="success" className="shrink-0">Completada</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{unit.description}</p>
                </div>
                {!isUnlocked && (
                  <Badge variant="outline" className="shrink-0 text-xs">
                    {unit.requiredXp} XP
                  </Badge>
                )}
              </div>

              {/* Lessons */}
              {isUnlocked && (
                <div className="ml-4 space-y-2">
                  {unit.lessons.map((lesson, i) => {
                    const isCompleted = progress.completedLessons.includes(lesson.id);
                    const isPrevCompleted = i === 0 || progress.completedLessons.includes(unit.lessons[i - 1].id);
                    const isAvailable = isPrevCompleted;

                    return (
                      <div
                        key={lesson.id}
                        className={cn(
                          "flex items-center gap-3 rounded-xl border p-4 transition-all",
                          isCompleted ? "bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-900" :
                          isAvailable ? "bg-card hover:bg-muted/50" : "bg-muted/30 opacity-50",
                        )}
                      >
                        <div className="shrink-0">
                          {isCompleted ? (
                            <CheckCircle2 className="h-6 w-6 text-green-600" />
                          ) : (
                            <PlayCircle className={cn("h-6 w-6", isAvailable ? "text-primary" : "text-muted-foreground")} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{lesson.title}</p>
                          <p className="text-xs text-muted-foreground">{lesson.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[10px]">+{lesson.xpReward} XP</Badge>
                          {isAvailable && !isCompleted && (
                            <Button asChild size="sm" className="h-8">
                              <Link href={`/lesson/${lesson.id}`}>
                                Empezar <ChevronRight className="h-3 w-3" />
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Empty state hint */}
        <Card className="border-dashed">
          <CardContent className="p-6 text-center text-muted-foreground text-sm">
            <p className="mb-2">Más unidades próximamente</p>
            <p className="text-xs">Verbos, números, gramática de casos y mucho más.</p>
          </CardContent>
        </Card>

        {/* Grammar supplements */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-lg">Tarjetas de gramática</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Consultas de referencia sobre el sistema gramatical serbio. Úsalas como apoyo a las lecciones.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {grammarTopics.map((t) => (
              <Link
                key={t.id}
                href={`/grammar/${t.id}`}
                className="flex items-start gap-3 rounded-xl border bg-card p-4 text-sm hover:bg-muted transition-colors"
              >
                <span className="text-2xl shrink-0">{t.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className="font-semibold text-sm truncate">{t.title}</span>
                    <Badge variant="outline" className="text-[10px] shrink-0">{t.level}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-snug line-clamp-2">{t.subtitle}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
