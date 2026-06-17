"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { stories } from "@/lib/data";
import { useSerbianText } from "@/components/script-toggle";
import { speak } from "@/lib/audio";
import { useAppStore } from "@/lib/store/use-app-store";
import { cn } from "@/lib/utils";
import type { Story, ComprehensionQuestion } from "@/lib/data/types";
import {
  X, Volume2, Eye, EyeOff, ChevronRight, CheckCircle2, XCircle, BookOpen, Zap,
} from "lucide-react";
import { toast } from "sonner";

// ─── Level badge color ────────────────────────────────────────────────────────

const LEVEL_COLOR: Record<string, string> = {
  A1: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  A2: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  B1: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  B2: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
};

// ─── Story list card ──────────────────────────────────────────────────────────

function StoryCard({ story, onStart, done }: { story: Story; onStart: () => void; done: boolean }) {
  return (
    <Card
      className={cn(
        "cursor-pointer hover:shadow-md transition-all",
        done && "border-green-300 dark:border-green-700"
      )}
      onClick={onStart}
    >
      <CardContent className="p-5 flex items-start gap-4">
        <span className="text-4xl shrink-0">📖</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="font-semibold">{story.title}</h3>
            <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", LEVEL_COLOR[story.level])}>
              {story.level}
            </span>
            {done && <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />}
          </div>
          <p className="text-sm text-muted-foreground mb-1 italic">{story.titleSr}</p>
          <p className="text-xs text-muted-foreground mb-3">
            {story.paragraphs.length} párrafos · {story.questions.length} preguntas
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">+{story.xpReward} XP</span>
            <Button size="sm">{done ? "Releer" : "Leer"} <ChevronRight className="h-3 w-3 ml-1" /></Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Paragraph reader ─────────────────────────────────────────────────────────

function ParagraphReader({
  story,
  onFinishReading,
}: {
  story: Story;
  onFinishReading: () => void;
}) {
  const [revealed, setRevealed] = useState<boolean[]>(
    story.paragraphs.map(() => false)
  );
  const script = useAppStore((s) => s.preferences.script);

  function toggleReveal(i: number) {
    setRevealed((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  }

  const allSeen = revealed.every(Boolean);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Toca el ojo 👁 para ver la traducción. Escucha cada párrafo con el botón de audio.
      </p>

      {story.paragraphs.map((para, i) => {
        const srText = script === "cyrillic" ? para.srCyrillic : para.sr;
        return (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <p className="text-base font-medium leading-relaxed mb-2">{srText}</p>
                  {revealed[i] && (
                    <p className="text-sm text-muted-foreground italic leading-relaxed">
                      {para.es}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <button
                    onClick={() => speak(para.sr)}
                    className="rounded-full bg-primary/10 p-2 text-primary hover:bg-primary/20 transition-colors"
                    aria-label="Escuchar párrafo"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => toggleReveal(i)}
                    className="rounded-full bg-muted p-2 text-muted-foreground hover:bg-muted/80 transition-colors"
                    aria-label="Mostrar traducción"
                  >
                    {revealed[i] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}

      <Button
        onClick={onFinishReading}
        size="lg"
        className="w-full"
        disabled={!allSeen}
      >
        {allSeen
          ? "Continuar al test de comprensión →"
          : `Revela todas las traducciones para continuar (${revealed.filter(Boolean).length}/${story.paragraphs.length})`}
      </Button>
    </div>
  );
}

// ─── Comprehension quiz ───────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function ComprehensionQuiz({
  questions,
  onFinish,
}: {
  questions: ComprehensionQuestion[];
  onFinish: (score: number) => void;
}) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(questions.map(() => null));
  const [confirmed, setConfirmed] = useState<boolean[]>(questions.map(() => false));

  const q = questions[current];
  const options = useState(() => questions.map((q) => shuffle([q.correctAnswer, ...q.distractors])))[0];
  const picked = answers[current];
  const isConfirmed = confirmed[current];
  const isCorrect = picked === q.correctAnswer;
  const isLast = current === questions.length - 1;

  function pick(opt: string) {
    if (isConfirmed) return;
    const next = [...answers];
    next[current] = opt;
    setAnswers(next);
  }

  function confirm() {
    const next = [...confirmed];
    next[current] = true;
    setConfirmed(next);
  }

  function advance() {
    if (isLast) {
      const score = answers.filter((a, i) => a === questions[i].correctAnswer).length;
      onFinish(score);
    } else {
      setCurrent((c) => c + 1);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Progress value={((current) / questions.length) * 100} className="flex-1 h-2" />
        <span className="text-xs text-muted-foreground tabular-nums shrink-0">
          {current + 1}/{questions.length}
        </span>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Pregunta de comprensión
        </p>
        <p className="text-lg font-semibold leading-snug">{q.question}</p>
      </div>

      <div className="space-y-2">
        {options[current].map((opt) => {
          const isSelected = picked === opt;
          const isRight = opt === q.correctAnswer;

          let cls =
            "w-full flex items-start gap-3 rounded-xl border-2 p-4 text-left text-sm font-medium transition-all";
          if (!isConfirmed) {
            cls += isSelected
              ? " border-primary bg-primary/5"
              : " border-border bg-card hover:border-primary/50 hover:bg-primary/5 cursor-pointer";
          } else {
            if (isRight) cls += " border-green-400 bg-green-50 dark:bg-green-950/30";
            else if (isSelected && !isRight) cls += " border-red-400 bg-red-50 dark:bg-red-950/30";
            else cls += " border-border bg-card opacity-50";
          }

          return (
            <button key={opt} onClick={() => pick(opt)} className={cls}>
              {isConfirmed ? (
                isRight ? (
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                ) : isSelected ? (
                  <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                ) : (
                  <span className="h-4 w-4 shrink-0" />
                )
              ) : (
                <span className="h-4 w-4 shrink-0 rounded-full border-2 border-current mt-0.5" />
              )}
              {opt}
            </button>
          );
        })}
      </div>

      {!isConfirmed ? (
        <Button onClick={confirm} disabled={!picked} className="w-full" size="lg">
          Confirmar respuesta
        </Button>
      ) : (
        <div className="space-y-3">
          <div
            className={cn(
              "rounded-xl p-4 text-sm",
              isCorrect
                ? "bg-green-50 text-green-800 dark:bg-green-950/30 dark:text-green-300"
                : "bg-red-50 text-red-800 dark:bg-red-950/30 dark:text-red-300"
            )}
          >
            {isCorrect ? "✅ ¡Correcto!" : `❌ Respuesta correcta: ${q.correctAnswer}`}
          </div>
          <Button onClick={advance} className="w-full" size="lg">
            {isLast ? "Ver resultados" : "Siguiente pregunta"} <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

// ─── Completion screen ────────────────────────────────────────────────────────

function StoryCompletion({
  story,
  score,
  onContinue,
}: {
  story: Story;
  score: number;
  onContinue: () => void;
}) {
  const pct = Math.round((score / story.questions.length) * 100);
  const emoji = pct === 100 ? "🏆" : pct >= 66 ? "✅" : "📚";

  return (
    <div className="flex flex-col items-center text-center py-12 space-y-6">
      <span className="text-7xl">{emoji}</span>
      <div>
        <h2 className="text-2xl font-bold mb-1">¡Historia completada!</h2>
        <p className="text-muted-foreground">{story.title}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <div className="rounded-2xl bg-primary/10 px-8 py-5 flex items-center gap-3">
          <BookOpen className="h-7 w-7 text-primary" />
          <div className="text-left">
            <p className="text-2xl font-bold">{score}/{story.questions.length}</p>
            <p className="text-xs text-muted-foreground">respuestas correctas</p>
          </div>
        </div>
        <div className="rounded-2xl bg-amber-100 dark:bg-amber-900/30 px-8 py-5 flex items-center gap-3">
          <Zap className="h-7 w-7 text-amber-600" />
          <div className="text-left">
            <p className="text-2xl font-bold">+{story.xpReward} XP</p>
            <p className="text-xs text-muted-foreground">ganados</p>
          </div>
        </div>
      </div>
      <Button onClick={onContinue} size="lg" className="px-10">
        Volver a las historias <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
}

// ─── Story reader wrapper ─────────────────────────────────────────────────────

type Phase = "reading" | "quiz" | "done";

function StoryReader({
  story,
  onClose,
}: {
  story: Story;
  onClose: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("reading");
  const [score, setScore] = useState(0);
  const addXp = useAppStore((s) => s.addXp);

  function handleQuizDone(s: number) {
    setScore(s);
    addXp(story.xpReward);
    toast.success(`+${story.xpReward} XP ganados`);
    setPhase("done");
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onClose}
          className="rounded-full p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0"
          aria-label="Volver"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="font-bold truncate">{story.title}</h1>
          <p className="text-xs text-muted-foreground italic">{story.titleSr}</p>
        </div>
        <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0", LEVEL_COLOR[story.level])}>
          {story.level}
        </span>
      </div>

      {/* Phases */}
      {phase === "reading" && (
        <ParagraphReader story={story} onFinishReading={() => setPhase("quiz")} />
      )}
      {phase === "quiz" && (
        <ComprehensionQuiz questions={story.questions} onFinish={handleQuizDone} />
      )}
      {phase === "done" && (
        <StoryCompletion story={story} score={score} onContinue={onClose} />
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function StoriesPage() {
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  function handleClose() {
    if (activeStory) {
      setCompleted((prev) => new Set(prev).add(activeStory.id));
    }
    setActiveStory(null);
  }

  if (activeStory) {
    return (
      <AppShell>
        <StoryReader story={activeStory} onClose={handleClose} />
      </AppShell>
    );
  }

  const byLevel = {
    A1: stories.filter((s) => s.level === "A1"),
    A2: stories.filter((s) => s.level === "A2"),
    B1: stories.filter((s) => s.level === "B1"),
    B2: stories.filter((s) => s.level === "B2"),
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl px-4 py-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold mb-2">Historias graduadas</h1>
          <p className="text-muted-foreground text-sm">
            Lee micro-historias en serbio clasificadas por nivel. Toca para revelar la traducción y responde preguntas de comprensión para ganar XP.
          </p>
        </div>

        {/* Stories by level */}
        {(["A1", "A2", "B1", "B2"] as const).map((level) => {
          const levelStories = byLevel[level];
          if (levelStories.length === 0) return null;
          return (
            <section key={level}>
              <div className="flex items-center gap-2 mb-3">
                <span className={cn("text-xs font-bold px-2.5 py-1 rounded-full", LEVEL_COLOR[level])}>
                  {level}
                </span>
                <span className="text-sm text-muted-foreground">
                  {level === "A1" ? "Frases simples" : level === "A2" ? "Diálogos y descripciones" : level === "B1" ? "Párrafos narrativos" : "Textos auténticos"}
                </span>
              </div>
              <div className="space-y-3">
                {levelStories.map((story) => (
                  <StoryCard
                    key={story.id}
                    story={story}
                    onStart={() => setActiveStory(story)}
                    done={completed.has(story.id)}
                  />
                ))}
              </div>
            </section>
          );
        })}

        {/* Coming soon */}
        <Card className="border-dashed">
          <CardContent className="p-6 text-center text-muted-foreground text-sm">
            <p className="mb-1">Más historias próximamente</p>
            <p className="text-xs">Historias B1 y B2: textos auténticos adaptados de la prensa serbia, cuentos populares y literatura contemporánea.</p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
