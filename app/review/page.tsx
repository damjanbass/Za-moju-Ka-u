"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AppShell } from "@/components/layout/app-shell";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store/use-app-store";
import { dueTodayCards, grade } from "@/lib/srs";
import { getVocabById } from "@/lib/data";
import { speak } from "@/lib/audio";
import type { SrsCard, SrsQuality } from "@/lib/data/types";
import {
  X, Volume2, ChevronRight, CheckCircle2, RotateCcw, BookOpen, Brain,
} from "lucide-react";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── Rating buttons config ────────────────────────────────────────────────────

const RATING_STYLES: Record<SrsQuality, { label: string; className: string }> = {
  again: {
    label: "Otra vez",
    className:
      "border-red-300 hover:bg-red-50 text-red-700 dark:border-red-700 dark:hover:bg-red-950/30 dark:text-red-400",
  },
  hard: {
    label: "Difícil",
    className:
      "border-orange-300 hover:bg-orange-50 text-orange-700 dark:border-orange-700 dark:hover:bg-orange-950/30 dark:text-orange-400",
  },
  good: {
    label: "Bien",
    className:
      "border-green-400 hover:bg-green-50 text-green-700 dark:border-green-600 dark:hover:bg-green-950/30 dark:text-green-400",
  },
  easy: {
    label: "Fácil",
    className:
      "border-blue-400 hover:bg-blue-50 text-blue-700 dark:border-blue-600 dark:hover:bg-blue-950/30 dark:text-blue-400",
  },
};

const QUALITIES: SrsQuality[] = ["again", "hard", "good", "easy"];

// ─── Flashcard component ──────────────────────────────────────────────────────

function Flashcard({
  card,
  script,
  flipped,
  onFlip,
  onRate,
}: {
  card: SrsCard;
  script: "latin" | "cyrillic";
  flipped: boolean;
  onFlip: () => void;
  onRate: (q: SrsQuality) => void;
}) {
  const vocab = getVocabById(card.vocabItemId);

  if (!vocab) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground mb-4">Palabra no encontrada.</p>
        <Button onClick={() => onRate("again")}>Siguiente →</Button>
      </div>
    );
  }

  const srpWord = script === "cyrillic" ? vocab.serbianCyrillic : vocab.serbianLatin;
  const srpExample =
    script === "cyrillic" ? vocab.exampleSentenceSrCyrillic : vocab.exampleSentenceSr;

  return (
    <div className="w-full">
      {/* Card */}
      <div className="rounded-2xl border-2 bg-card shadow-sm mb-5 overflow-hidden">
        {/* Front: Serbian word */}
        <div className="px-8 py-10 text-center border-b border-border">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Serbio</p>
          <p className="text-5xl font-bold mb-5">{srpWord}</p>
          <button
            onClick={() => speak(vocab.serbianLatin)}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2 text-primary text-sm hover:bg-primary/20 transition-colors"
          >
            <Volume2 className="h-4 w-4" /> Escuchar
          </button>
        </div>

        {/* Back: revealed answer */}
        {flipped && (
          <div className="px-8 py-8 space-y-4">
            <div className="text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Español</p>
              <p className="text-3xl font-bold text-primary">{vocab.spanish}</p>
            </div>

            {vocab.exampleSentenceSr && (
              <div className="rounded-xl bg-muted/50 px-5 py-4 space-y-1">
                <p className="text-sm font-medium">{srpExample}</p>
                <p className="text-xs text-muted-foreground">{vocab.exampleSentenceEs}</p>
              </div>
            )}

            {vocab.notesForSpanishSpeaker && (
              <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 px-4 py-3">
                <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                  💡 {vocab.notesForSpanishSpeaker}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action area */}
      {!flipped ? (
        <Button onClick={onFlip} size="lg" className="w-full">
          Ver respuesta <ChevronRight className="h-4 w-4" />
        </Button>
      ) : (
        <div>
          <p className="text-xs text-muted-foreground text-center mb-3">¿Cómo te fue?</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {QUALITIES.map((q) => {
              const graded = grade(card, q);
              const { label, className } = RATING_STYLES[q];
              const intervalLabel =
                q === "again"
                  ? "< 1 día"
                  : `${graded.interval} día${graded.interval !== 1 ? "s" : ""}`;
              return (
                <button
                  key={q}
                  onClick={() => onRate(q)}
                  className={cn(
                    "rounded-xl border-2 px-3 py-4 text-sm font-medium transition-all flex flex-col items-center gap-1",
                    className,
                  )}
                >
                  <span>{label}</span>
                  <span className="text-[11px] opacity-60 font-normal">{intervalLabel}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Completion screen ────────────────────────────────────────────────────────

function CompletionScreen({
  totalReviewed,
  againCount,
  onContinue,
}: {
  totalReviewed: number;
  againCount: number;
  onContinue: () => void;
}) {
  useEffect(() => {
    import("canvas-confetti").then(({ default: confetti }) => {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-background">
      <div className="text-7xl mb-6">{againCount === 0 ? "🏆" : "✅"}</div>
      <h1 className="text-3xl font-bold mb-2">¡Sesión completada!</h1>
      <p className="text-muted-foreground mb-10">Has terminado el repaso de hoy.</p>
      <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
        <div className="rounded-2xl bg-green-100 dark:bg-green-900/30 px-8 py-5 flex items-center gap-3">
          <BookOpen className="h-7 w-7 text-green-600" />
          <div className="text-left">
            <p className="text-2xl font-bold text-green-700 dark:text-green-400">{totalReviewed}</p>
            <p className="text-xs text-green-600 dark:text-green-500">palabras repasadas</p>
          </div>
        </div>
        {againCount > 0 && (
          <div className="rounded-2xl bg-red-100 dark:bg-red-900/30 px-8 py-5 flex items-center gap-3">
            <RotateCcw className="h-7 w-7 text-red-500" />
            <div className="text-left">
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{againCount}</p>
              <p className="text-xs text-red-500">necesitan práctica</p>
            </div>
          </div>
        )}
      </div>
      <Button onClick={onContinue} size="lg" className="px-10">
        Volver al panel <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ReviewPage() {
  const srsCards = useAppStore((s) => s.srs);
  const gradeSrsCard = useAppStore((s) => s.gradeSrsCard);
  const updateStreak = useAppStore((s) => s.updateStreak);
  const script = useAppStore((s) => s.preferences.script);
  const _hydrated = useAppStore((s) => s._hydrated);
  const router = useRouter();

  const [queue, setQueue] = useState<SrsCard[]>([]);
  const [initialized, setInitialized] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [againCount, setAgainCount] = useState(0);
  const initialCount = useRef(0);

  // Build session queue once after store hydrates
  useEffect(() => {
    if (!_hydrated || initialized) return;
    const cards = shuffle(dueTodayCards(srsCards));
    setQueue(cards);
    initialCount.current = cards.length;
    setInitialized(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_hydrated]);

  // ─── Empty / loading states ─────────────────────────────────────────────────

  if (!initialized) {
    return <div className="min-h-screen bg-background" />;
  }

  if (queue.length === 0) {
    return (
      <AppShell>
        <div className="mx-auto max-w-md px-4 py-20 flex flex-col items-center justify-center text-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 mb-6" />
          <h1 className="text-2xl font-bold mb-3">¡Todo al día!</h1>
          <p className="text-muted-foreground mb-2">
            No tienes repasos pendientes por ahora.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Vuelve mañana o completa más lecciones para añadir palabras a tu cola de repaso.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild>
              <Link href="/learn">Continuar aprendiendo</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/dashboard">Ir al panel</Link>
            </Button>
          </div>
        </div>
      </AppShell>
    );
  }

  if (isComplete) {
    return (
      <CompletionScreen
        totalReviewed={initialCount.current}
        againCount={againCount}
        onContinue={() => router.push("/dashboard")}
      />
    );
  }

  // ─── Session logic ──────────────────────────────────────────────────────────

  const currentCard = queue[currentIndex];
  const remaining = queue.length - currentIndex;
  const progress = (currentIndex / queue.length) * 100;

  function handleRate(quality: SrsQuality) {
    if (!currentCard) return;
    gradeSrsCard(currentCard.vocabItemId, quality);

    const newQueue = quality === "again" ? [...queue, currentCard] : queue;
    const nextIndex = currentIndex + 1;

    if (quality === "again") setAgainCount((n) => n + 1);
    setQueue(newQueue);
    setFlipped(false);

    if (nextIndex >= newQueue.length) {
      updateStreak();
      setIsComplete(true);
    } else {
      setCurrentIndex(nextIndex);
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b">
        <div className="mx-auto max-w-2xl flex items-center gap-3 px-4 py-3">
          <Link
            href="/dashboard"
            className="shrink-0 rounded-full p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Salir del repaso"
          >
            <X className="h-5 w-5" />
          </Link>
          <Progress value={progress} className="flex-1 h-2.5" />
          <div className="flex items-center gap-1.5 shrink-0">
            <Brain className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground tabular-nums">
              {remaining} {remaining === 1 ? "ítem" : "ítems"}
            </span>
          </div>
        </div>
      </header>

      {/* Card area */}
      <main className="flex-1 pb-8">
        <div key={currentCard.vocabItemId + "-" + currentIndex} className="mx-auto max-w-lg px-4 py-8">
          <Flashcard
            card={currentCard}
            script={script}
            flipped={flipped}
            onFlip={() => setFlipped(true)}
            onRate={handleRate}
          />
        </div>
      </main>
    </div>
  );
}
