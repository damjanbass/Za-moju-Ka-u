"use client";

import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAppStore } from "@/lib/store/use-app-store";
import { dueCount } from "@/lib/srs";
import { getWordOfTheDay } from "@/lib/data";
import { useSerbianText } from "@/components/script-toggle";
import { speak } from "@/lib/audio";
import { Flame, Star, BookOpen, RotateCcw, Volume2, ChevronRight, Zap } from "lucide-react";

function WordOfTheDayCard() {
  const word = getWordOfTheDay();
  const serbianText = useSerbianText(word.serbianLatin, word.serbianCyrillic);
  const exampleSr = useSerbianText(word.exampleSentenceSr, word.exampleSentenceSrCyrillic);

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
          <Star className="h-4 w-4 text-amber-500" />
          Palabra del día
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <p className="text-3xl font-bold text-primary mb-1">{serbianText}</p>
            <p className="text-lg text-foreground font-medium">{word.spanish}</p>
          </div>
          <button
            onClick={() => speak(word.serbianLatin)}
            className="shrink-0 rounded-full bg-primary/10 p-2.5 text-primary hover:bg-primary/20 transition-colors"
            aria-label={`Escuchar pronunciación de ${word.serbianLatin}`}
          >
            <Volume2 className="h-5 w-5" />
          </button>
        </div>
        <div className="rounded-lg bg-muted/60 px-4 py-3 mb-2">
          <p className="text-sm font-medium">{exampleSr}</p>
          <p className="text-xs text-muted-foreground mt-1 italic">{word.exampleSentenceEs}</p>
        </div>
        {word.notesForSpanishSpeaker && (
          <p className="text-xs text-muted-foreground mt-2 flex gap-1.5">
            <span className="shrink-0">💡</span>
            <span>{word.notesForSpanishSpeaker}</span>
          </p>
        )}
        <div className="flex items-center gap-2 mt-3">
          <Badge variant="outline" className="text-[10px]">{word.partOfSpeech}</Badge>
          <Badge variant="outline" className="text-[10px]">Rango #{word.frequencyRank}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const progress = useAppStore((s) => s.progress);
  const srsCards = useAppStore((s) => s.srs);
  const preferences = useAppStore((s) => s.preferences);
  const due = dueCount(srsCards);

  // CEFR level based on XP (rough approximation)
  const cefrLevel = progress.xp < 100 ? "A1" : progress.xp < 300 ? "A2" : progress.xp < 700 ? "B1" : "B2";
  const xpToNext = progress.xp < 100 ? 100 : progress.xp < 300 ? 300 : progress.xp < 700 ? 700 : 1500;
  const xpPrev = progress.xp < 100 ? 0 : progress.xp < 300 ? 100 : progress.xp < 700 ? 300 : 700;
  const levelProgress = ((progress.xp - xpPrev) / (xpToNext - xpPrev)) * 100;

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl px-4 py-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold mb-1">
            ¡{preferences.onboardingComplete ? "Bienvenida de vuelta" : "Bienvenida"}! 👋
          </h1>
          <p className="text-muted-foreground">
            Tu progreso en serbio, paso a paso.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center">
              <Flame className="h-8 w-8 text-orange-500 mb-2" />
              <p className="text-2xl font-bold">{progress.streak}</p>
              <p className="text-xs text-muted-foreground">días seguidos</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center">
              <Zap className="h-8 w-8 text-amber-500 mb-2" />
              <p className="text-2xl font-bold">{progress.xp}</p>
              <p className="text-xs text-muted-foreground">XP ganados</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center">
              <RotateCcw className="h-8 w-8 text-primary mb-2" />
              <p className="text-2xl font-bold">{due}</p>
              <p className="text-xs text-muted-foreground">repasos pendientes</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center">
              <BookOpen className="h-8 w-8 text-secondary mb-2" />
              <p className="text-2xl font-bold">{progress.completedLessons.length}</p>
              <p className="text-xs text-muted-foreground">lecciones hechas</p>
            </CardContent>
          </Card>
        </div>

        {/* CEFR progress */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-muted-foreground">Nivel actual</p>
                <p className="text-2xl font-bold text-primary">{cefrLevel}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Siguiente</p>
                <p className="text-lg font-semibold">{xpToNext - progress.xp} XP</p>
              </div>
            </div>
            <Progress value={Math.min(levelProgress, 100)} className="h-3" />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>A1</span><span>A2</span><span>B1</span><span>B2</span>
            </div>
          </CardContent>
        </Card>

        {/* Main CTAs */}
        <div className="grid md:grid-cols-2 gap-4">
          <Button asChild size="lg" className="h-16 text-base">
            <Link href="/learn">
              <BookOpen className="h-5 w-5" />
              Continuar lección
              <ChevronRight className="h-4 w-4 ml-auto" />
            </Link>
          </Button>

          {due > 0 ? (
            <Button asChild size="lg" variant="secondary" className="h-16 text-base">
              <Link href="/review">
                <RotateCcw className="h-5 w-5" />
                Repasar ahora ({due})
                <ChevronRight className="h-4 w-4 ml-auto" />
              </Link>
            </Button>
          ) : (
            <Card className="h-16 flex items-center px-5 border-dashed">
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <RotateCcw className="h-4 w-4" />
                ¡Todo al día! Vuelve mañana para repasar.
              </p>
            </Card>
          )}
        </div>

        {/* Word of the day */}
        <WordOfTheDayCard />

        {/* Quick links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { href: "/alphabet", label: "Abeceda", emoji: "🔤" },
            { href: "/conversation", label: "Conversar", emoji: "💬" },
            { href: "/stories", label: "Historias", emoji: "📖" },
          ].map(({ href, label, emoji }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-xl border bg-card p-4 text-sm font-medium hover:bg-muted transition-colors"
            >
              <span className="text-xl">{emoji}</span>
              {label}
              <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground" />
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
