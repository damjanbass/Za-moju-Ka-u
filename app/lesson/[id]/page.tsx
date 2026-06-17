"use client";

import { use, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store/use-app-store";
import { units } from "@/lib/data";
import { speak } from "@/lib/audio";
import {
  X, CheckCircle2, XCircle, Volume2, ChevronRight, Zap, BookOpen,
} from "lucide-react";
import type {
  Exercise, RecognizeExercise, MatchExercise, FillGapExercise,
  ReverseTranslationExercise, PronunciationExercise,
} from "@/lib/data/types";

function findLesson(id: string) {
  for (const unit of units) {
    const lesson = unit.lessons.find((l) => l.id === id);
    if (lesson) return { lesson, unit };
  }
  return null;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function normalize(s: string) {
  return s.toLowerCase().trim().replace(/[?!.,;]/g, "");
}

// ─── Exercise: Recognize (multiple choice) ───────────────────────────────────

function ExerciseRecognize({
  ex,
  onAnswer,
  answered,
}: {
  ex: RecognizeExercise;
  onAnswer: (correct: boolean, correctAnswer?: string) => void;
  answered: boolean;
}) {
  const optionsRef = useRef<string[]>([]);
  if (optionsRef.current.length === 0) {
    optionsRef.current = shuffle([ex.correctAnswer, ...ex.distractors]);
  }
  const [selected, setSelected] = useState<string | null>(null);

  function handleSelect(opt: string) {
    if (answered) return;
    setSelected(opt);
    const correct = opt === ex.correctAnswer;
    onAnswer(correct, correct ? undefined : ex.correctAnswer);
  }

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-4 text-center">¿Qué significa?</p>
      <div className="text-center mb-8">
        <p className="text-4xl font-bold mb-4">{ex.promptSr}</p>
        <button
          onClick={() => speak(ex.promptSr)}
          className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-primary text-sm hover:bg-primary/20 transition-colors"
        >
          <Volume2 className="h-4 w-4" /> Escuchar
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {optionsRef.current.map((opt) => {
          const isCorrect = opt === ex.correctAnswer;
          const isSelected = opt === selected;
          return (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              disabled={answered}
              className={cn(
                "rounded-xl border-2 px-4 py-4 text-sm font-medium transition-all text-left",
                answered && isCorrect
                  ? "border-green-500 bg-green-50 text-green-800 dark:bg-green-950/40 dark:text-green-300"
                  : answered && isSelected && !isCorrect
                  ? "border-red-500 bg-red-50 text-red-800 dark:bg-red-950/40 dark:text-red-300"
                  : "border-border bg-card hover:border-muted-foreground hover:bg-muted/50 disabled:cursor-default",
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Exercise: Match pairs ────────────────────────────────────────────────────

function ExerciseMatch({
  ex,
  onAnswer,
  answered,
}: {
  ex: MatchExercise;
  onAnswer: (correct: boolean) => void;
  answered: boolean;
}) {
  const rightRef = useRef<string[]>([]);
  if (rightRef.current.length === 0) {
    rightRef.current = shuffle(ex.pairs.map((p) => p.es));
  }

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedSr, setMatchedSr] = useState<Set<string>>(new Set());
  const [wrongLeft, setWrongLeft] = useState<string | null>(null);

  const matchedEs = new Set(
    ex.pairs.filter((p) => matchedSr.has(p.sr)).map((p) => p.es),
  );

  function handleLeft(sr: string) {
    if (matchedSr.has(sr) || answered) return;
    setSelectedLeft((prev) => (prev === sr ? null : sr));
  }

  function handleRight(es: string) {
    if (matchedEs.has(es) || answered || !selectedLeft) return;
    const pair = ex.pairs.find((p) => p.sr === selectedLeft);
    if (pair && pair.es === es) {
      const next = new Set(matchedSr);
      next.add(selectedLeft);
      setMatchedSr(next);
      setSelectedLeft(null);
      if (next.size === ex.pairs.length) onAnswer(true);
    } else {
      setWrongLeft(selectedLeft);
      setSelectedLeft(null);
      setTimeout(() => setWrongLeft(null), 600);
    }
  }

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-6 text-center">
        Une cada palabra con su significado
      </p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          {ex.pairs.map((pair) => {
            const isMatched = matchedSr.has(pair.sr);
            const isSelected = selectedLeft === pair.sr;
            const isWrong = wrongLeft === pair.sr;
            return (
              <button
                key={pair.sr}
                onClick={() => handleLeft(pair.sr)}
                disabled={answered || isMatched}
                className={cn(
                  "w-full rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all",
                  isMatched
                    ? "border-green-500 bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-300 cursor-default"
                    : isWrong
                    ? "border-red-400 bg-red-50 dark:bg-red-950/30"
                    : isSelected
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-muted-foreground",
                )}
              >
                {pair.sr}
              </button>
            );
          })}
        </div>
        <div className="space-y-2">
          {rightRef.current.map((es) => {
            const isMatched = matchedEs.has(es);
            return (
              <button
                key={es}
                onClick={() => handleRight(es)}
                disabled={answered || isMatched}
                className={cn(
                  "w-full rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all",
                  isMatched
                    ? "border-green-500 bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-300 cursor-default"
                    : "border-border hover:border-muted-foreground",
                )}
              >
                {es}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Exercise: Fill the gap ───────────────────────────────────────────────────

function ExerciseFillGap({
  ex,
  onAnswer,
  answered,
}: {
  ex: FillGapExercise;
  onAnswer: (correct: boolean, correctAnswer?: string) => void;
  answered: boolean;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const parts = ex.sentenceWithGap.split("___");

  function handleSelect(opt: string) {
    if (answered) return;
    setSelected(opt);
    const correct = opt === ex.correctAnswer;
    onAnswer(correct, correct ? undefined : ex.correctAnswer);
  }

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-6 text-center">Completa la frase</p>
      <div className="mb-6 rounded-2xl bg-muted/50 px-6 py-5 text-center">
        <p className="text-2xl font-bold flex flex-wrap items-end justify-center gap-x-2 gap-y-1">
          {parts[0] && <span>{parts[0]}</span>}
          <span
            className={cn(
              "inline-block min-w-[90px] border-b-4 px-2 py-0.5 transition-colors",
              selected ? "border-primary text-primary" : "border-muted-foreground text-muted-foreground",
            )}
          >
            {selected ?? "___"}
          </span>
          {parts[1] && <span>{parts[1]}</span>}
        </p>
      </div>
      {ex.patternNote && (
        <p className="text-xs text-muted-foreground bg-muted/50 rounded-lg px-4 py-2 mb-6 text-center">
          💡 {ex.patternNote}
        </p>
      )}
      <div className="grid grid-cols-2 gap-3">
        {ex.options.map((opt) => {
          const isCorrect = opt === ex.correctAnswer;
          const isSelected = opt === selected;
          return (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              disabled={answered}
              className={cn(
                "rounded-xl border-2 px-4 py-4 text-sm font-medium transition-all",
                answered && isCorrect
                  ? "border-green-500 bg-green-50 text-green-800 dark:bg-green-950/40 dark:text-green-300"
                  : answered && isSelected && !isCorrect
                  ? "border-red-500 bg-red-50 text-red-800 dark:bg-red-950/40 dark:text-red-300"
                  : "border-border bg-card hover:border-muted-foreground hover:bg-muted/50 disabled:cursor-default",
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Exercise: Reverse translation (type in Serbian) ─────────────────────────

function ExerciseReverseTranslation({
  ex,
  onAnswer,
  answered,
}: {
  ex: ReverseTranslationExercise;
  onAnswer: (correct: boolean, correctAnswer?: string) => void;
  answered: boolean;
}) {
  const [input, setInput] = useState("");
  const [selfCorrect, setSelfCorrect] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit() {
    if (!input.trim() || answered) return;
    const norm = normalize(input);
    const correct =
      normalize(ex.correctAnswerSr) === norm ||
      (ex.acceptedVariants ?? []).some((v) => normalize(v) === norm);
    setSelfCorrect(correct);
    onAnswer(correct, correct ? undefined : ex.correctAnswerSr);
  }

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-4 text-center">Escribe en serbio</p>
      <div className="rounded-2xl bg-muted/50 px-8 py-6 mb-8 text-center">
        <p className="text-3xl font-bold">{ex.promptEs}</p>
      </div>
      <div className="space-y-3">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          disabled={answered}
          placeholder="Escribe aquí en serbio..."
          className={cn(
            "w-full rounded-xl border-2 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary bg-background transition-colors",
            answered && selfCorrect
              ? "border-green-500 bg-green-50 dark:bg-green-950/30"
              : answered && !selfCorrect
              ? "border-red-500 bg-red-50 dark:bg-red-950/30"
              : "border-border",
          )}
        />
        {!answered && (
          <Button onClick={handleSubmit} disabled={!input.trim()} size="lg" className="w-full">
            Comprobar
          </Button>
        )}
      </div>
    </div>
  );
}

// ─── Exercise: Pronunciation tip ─────────────────────────────────────────────

function ExercisePronunciation({
  ex,
  onContinue,
}: {
  ex: PronunciationExercise;
  onContinue: () => void;
}) {
  return (
    <div className="text-center">
      <p className="text-sm text-muted-foreground mb-6">Pronunciación</p>
      <div className="rounded-2xl bg-primary/5 border border-primary/20 px-8 py-10 mb-6">
        <p className="text-5xl font-bold text-primary mb-5">{ex.targetSr}</p>
        <button
          onClick={() => speak(ex.targetSr)}
          className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2 text-primary text-sm hover:bg-primary/20 transition-colors"
        >
          <Volume2 className="h-4 w-4" /> Escuchar
        </button>
      </div>
      <div className="rounded-xl bg-muted/60 px-6 py-4 mb-8 text-left">
        <p className="text-sm leading-relaxed">
          <span className="font-semibold">💡 </span>
          {ex.tipEs}
        </p>
      </div>
      <Button onClick={onContinue} size="lg" className="w-full">
        Ya lo practiqué <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

// ─── Feedback bar ─────────────────────────────────────────────────────────────

function FeedbackBar({
  correct,
  correctAnswer,
  explanation,
  onContinue,
}: {
  correct: boolean;
  correctAnswer?: string;
  explanation?: string;
  onContinue: () => void;
}) {
  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 border-t px-4 py-4 z-20",
        correct
          ? "bg-green-50 border-green-200 dark:bg-green-950/40 dark:border-green-800"
          : "bg-red-50 border-red-200 dark:bg-red-950/40 dark:border-red-800",
      )}
    >
      <div className="mx-auto max-w-2xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          {correct ? (
            <CheckCircle2 className="h-7 w-7 text-green-600 shrink-0" />
          ) : (
            <XCircle className="h-7 w-7 text-red-600 shrink-0" />
          )}
          <div className="min-w-0">
            <p className={cn("font-bold", correct ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400")}>
              {correct ? "¡Correcto!" : "Incorrecto"}
            </p>
            {!correct && correctAnswer && (
              <p className="text-sm text-muted-foreground">
                Respuesta: <span className="font-semibold text-foreground">{correctAnswer}</span>
              </p>
            )}
            {explanation && (
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{explanation}</p>
            )}
          </div>
        </div>
        <Button
          onClick={onContinue}
          size="lg"
          className={cn("shrink-0", !correct && "bg-red-600 hover:bg-red-700 text-white border-0")}
        >
          Continuar <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// ─── Completion screen ────────────────────────────────────────────────────────

function CompletionScreen({
  xpEarned,
  vocabCount,
  lessonTitle,
  onContinue,
}: {
  xpEarned: number;
  vocabCount: number;
  lessonTitle: string;
  onContinue: () => void;
}) {
  useEffect(() => {
    import("canvas-confetti").then(({ default: confetti }) => {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-background">
      <div className="text-7xl mb-6">🎉</div>
      <h1 className="text-3xl font-bold mb-2">¡Lección completada!</h1>
      <p className="text-muted-foreground mb-10">{lessonTitle}</p>
      <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
        <div className="rounded-2xl bg-amber-100 dark:bg-amber-900/30 px-8 py-5 flex items-center gap-3">
          <Zap className="h-7 w-7 text-amber-600" />
          <div className="text-left">
            <p className="text-2xl font-bold text-amber-700 dark:text-amber-400">+{xpEarned} XP</p>
            <p className="text-xs text-amber-600 dark:text-amber-500">ganados</p>
          </div>
        </div>
        {vocabCount > 0 && (
          <div className="rounded-2xl bg-blue-100 dark:bg-blue-900/30 px-8 py-5 flex items-center gap-3">
            <BookOpen className="h-7 w-7 text-blue-600" />
            <div className="text-left">
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">{vocabCount}</p>
              <p className="text-xs text-blue-600 dark:text-blue-500">palabras al SRS</p>
            </div>
          </div>
        )}
      </div>
      <Button onClick={onContinue} size="lg" className="px-10">
        Volver al árbol <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
}

// ─── Exercise dispatcher ──────────────────────────────────────────────────────

function ExerciseRenderer({
  exercise,
  onAnswer,
  onContinue,
  answered,
}: {
  exercise: Exercise;
  onAnswer: (correct: boolean, correctAnswer?: string) => void;
  onContinue: () => void;
  answered: boolean;
}) {
  switch (exercise.type) {
    case "recognize":
      return <ExerciseRecognize ex={exercise} onAnswer={onAnswer} answered={answered} />;
    case "match":
      return <ExerciseMatch ex={exercise} onAnswer={onAnswer} answered={answered} />;
    case "fill-gap":
      return <ExerciseFillGap ex={exercise} onAnswer={onAnswer} answered={answered} />;
    case "reverse-translation":
      return <ExerciseReverseTranslation ex={exercise} onAnswer={onAnswer} answered={answered} />;
    case "pronunciation":
      return <ExercisePronunciation ex={exercise} onContinue={onContinue} />;
    default:
      return (
        <div className="text-center py-20">
          <p className="text-muted-foreground mb-4">Ejercicio no disponible aún.</p>
          <Button onClick={onContinue}>Siguiente →</Button>
        </div>
      );
  }
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  // All hooks must come before conditional returns
  const { completeLesson, addXp, addSrsCards, unlockUnit, updateStreak } = useAppStore();
  const [index, setIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [wasCorrect, setWasCorrect] = useState(false);
  const [correctAnswerText, setCorrectAnswerText] = useState<string | undefined>(undefined);
  const [isComplete, setIsComplete] = useState(false);

  const result = findLesson(id);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 text-center">
        <div>
          <p className="text-lg font-semibold mb-2">Lección no encontrada</p>
          <Button asChild variant="outline">
            <Link href="/learn">← Volver al árbol</Link>
          </Button>
        </div>
      </div>
    );
  }

  const { lesson } = result;
  const exercises = lesson.exercises;

  if (exercises.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center rounded-2xl border border-dashed p-10">
          <p className="text-xl font-bold mb-2">Lección en preparación</p>
          <p className="text-muted-foreground text-sm mb-6">
            Los ejercicios para esta lección llegarán pronto.
          </p>
          <Button asChild variant="outline">
            <Link href="/learn">← Volver al árbol</Link>
          </Button>
        </div>
      </div>
    );
  }

  function handleAnswer(correct: boolean, correctAnswer?: string) {
    setWasCorrect(correct);
    setCorrectAnswerText(correctAnswer);
    setAnswered(true);
  }

  function handleContinue() {
    if (index + 1 < exercises.length) {
      setIndex((i) => i + 1);
      setAnswered(false);
      setCorrectAnswerText(undefined);
    } else {
      finishLesson();
    }
  }

  function finishLesson() {
    const state = useAppStore.getState();
    const alreadyDone = state.progress.completedLessons.includes(lesson.id);
    completeLesson(lesson.id);
    if (!alreadyDone) addXp(lesson.xpReward);
    addSrsCards(lesson.vocabItems.map((v) => v.id));
    updateStreak();

    // Unlock any unit whose XP threshold is now met
    const newXp = useAppStore.getState().progress.xp;
    for (const u of units) {
      if (!useAppStore.getState().progress.unlockedUnits.includes(u.id) && newXp >= u.requiredXp) {
        unlockUnit(u.id);
      }
    }

    setIsComplete(true);
  }

  if (isComplete) {
    return (
      <CompletionScreen
        xpEarned={lesson.xpReward}
        vocabCount={lesson.vocabItems.length}
        lessonTitle={lesson.title}
        onContinue={() => router.push("/learn")}
      />
    );
  }

  const exercise = exercises[index];
  const isPronunciation = exercise.type === "pronunciation";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b">
        <div className="mx-auto max-w-2xl flex items-center gap-3 px-4 py-3">
          <Link
            href="/learn"
            className="shrink-0 rounded-full p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Salir de la lección"
          >
            <X className="h-5 w-5" />
          </Link>
          <Progress value={(index / exercises.length) * 100} className="flex-1 h-2.5" />
          <span className="shrink-0 text-xs font-medium text-muted-foreground tabular-nums">
            {index + 1} / {exercises.length}
          </span>
        </div>
      </header>

      {/* Exercise area */}
      <main className="flex-1 pb-32">
        <div key={exercise.id} className="mx-auto max-w-2xl px-4 py-8">
          <ExerciseRenderer
            exercise={exercise}
            onAnswer={handleAnswer}
            onContinue={handleContinue}
            answered={answered}
          />
        </div>
      </main>

      {/* Feedback bar — hidden for pronunciation (it has its own Continue button) */}
      {answered && !isPronunciation && (
        <FeedbackBar
          correct={wasCorrect}
          correctAnswer={correctAnswerText}
          explanation={exercise.explanation}
          onContinue={handleContinue}
        />
      )}
    </div>
  );
}
