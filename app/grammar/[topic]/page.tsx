"use client";

import { use } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { grammarTopics } from "@/lib/data";
import { useSerbianText } from "@/components/script-toggle";
import { speak } from "@/lib/audio";
import { cn } from "@/lib/utils";
import type { GrammarExample, GrammarPattern } from "@/lib/data/types";
import { Volume2, ChevronLeft, Lightbulb } from "lucide-react";

const LEVEL_COLOR: Record<string, string> = {
  A1: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  A2: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  B1: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  B2: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
};

// ─── Highlight text helper ────────────────────────────────────────────────────

function HighlightText({ text, highlight }: { text: string; highlight?: string }) {
  if (!highlight || !text.includes(highlight)) {
    return <span>{text}</span>;
  }
  const idx = text.indexOf(highlight);
  return (
    <>
      {text.slice(0, idx)}
      <strong className="text-primary underline underline-offset-2">{highlight}</strong>
      {text.slice(idx + highlight.length)}
    </>
  );
}

// ─── Example row ──────────────────────────────────────────────────────────────

function ExampleRow({ example }: { example: GrammarExample }) {
  const srText = useSerbianText(example.sr, example.srCyrillic ?? example.sr);

  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-border last:border-0">
      <button
        onClick={() => speak(example.sr)}
        className="shrink-0 mt-0.5 rounded-full bg-primary/10 p-1.5 text-primary hover:bg-primary/20 transition-colors"
        aria-label="Escuchar"
      >
        <Volume2 className="h-3.5 w-3.5" />
      </button>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm">
          <HighlightText text={srText} highlight={example.highlight} />
        </p>
        <p className="text-xs text-muted-foreground italic mt-0.5">{example.es}</p>
      </div>
    </div>
  );
}

// ─── Pattern card ─────────────────────────────────────────────────────────────

function PatternCard({ pattern }: { pattern: GrammarPattern }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-primary">
          {pattern.name}
        </CardTitle>
        <p className="text-sm text-muted-foreground leading-relaxed">{pattern.explanation}</p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="divide-y divide-border">
          {pattern.examples.map((ex, i) => (
            <ExampleRow key={i} example={ex} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function GrammarPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = use(params);
  const grammarTopic = grammarTopics.find((t) => t.id === topic);

  if (!grammarTopic) {
    return (
      <AppShell>
        <div className="mx-auto max-w-2xl px-4 py-16 flex flex-col items-center text-center">
          <span className="text-6xl mb-4">📚</span>
          <h1 className="text-xl font-bold mb-2">Tema no encontrado</h1>
          <p className="text-muted-foreground text-sm mb-6">
            El tema «{topic}» no está disponible todavía.
          </p>
          <Button asChild variant="outline">
            <Link href="/learn">← Volver al árbol</Link>
          </Button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl px-4 py-8 space-y-8">
        {/* Back */}
        <Button asChild variant="ghost" size="sm" className="-ml-2">
          <Link href="/learn">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Volver
          </Link>
        </Button>

        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span className="text-4xl">{grammarTopic.icon}</span>
            <span className={cn("text-xs font-bold px-2.5 py-1 rounded-full", LEVEL_COLOR[grammarTopic.level])}>
              {grammarTopic.level}
            </span>
          </div>
          <h1 className="text-2xl font-bold mb-1">{grammarTopic.title}</h1>
          <p className="text-muted-foreground text-sm">{grammarTopic.subtitle}</p>
        </div>

        {/* Intro */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-5">
            <p className="text-sm leading-relaxed">{grammarTopic.intro}</p>
          </CardContent>
        </Card>

        {/* Pattern cards */}
        <div className="space-y-4">
          {grammarTopic.patterns.map((pattern, i) => (
            <PatternCard key={i} pattern={pattern} />
          ))}
        </div>

        {/* Tip for Spanish speakers */}
        <Card className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30">
          <CardContent className="p-5 flex gap-3">
            <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-amber-800 dark:text-amber-300 mb-1 uppercase tracking-wide">
                Consejo para hispanohablantes
              </p>
              <p className="text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
                {grammarTopic.tipForSpanishSpeakers}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Bottom CTA */}
        <div className="flex flex-col sm:flex-row gap-3 pb-4">
          <Button asChild className="flex-1">
            <Link href="/learn">Seguir aprendiendo</Link>
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <Link href="/review">Repasar vocabulario</Link>
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
