"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { alphabetLetters, minimalPairs } from "@/lib/data";
import { latinToCyr, cyrToLatin } from "@/lib/transliterate";
import { speak } from "@/lib/audio";
import { Volume2, ArrowLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";

function LiveConverter() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"lat-to-cyr" | "cyr-to-lat">("lat-to-cyr");

  const output = mode === "lat-to-cyr" ? latinToCyr(input) : cyrToLatin(input);

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <ArrowLeftRight className="h-4 w-4 text-primary" />
          Conversor en vivo: latinica ↔ ćirilica
        </h3>
        <div className="flex items-center gap-2 mb-4">
          <Button
            size="sm"
            variant={mode === "lat-to-cyr" ? "default" : "outline"}
            onClick={() => setMode("lat-to-cyr")}
          >
            Latino → Cirílico
          </Button>
          <Button
            size="sm"
            variant={mode === "cyr-to-lat" ? "default" : "outline"}
            onClick={() => setMode("cyr-to-lat")}
          >
            Cirílico → Latino
          </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">
              {mode === "lat-to-cyr" ? "Latinica" : "Ćirilica"}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "lat-to-cyr" ? "Escribe en latinica..." : "Пиши ћирилицом..."}
              className="w-full h-28 rounded-lg border border-input bg-background p-3 text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">
              {mode === "lat-to-cyr" ? "Ćirilica" : "Latinica"}
            </label>
            <div className="h-28 rounded-lg border border-border bg-muted/50 p-3 text-sm overflow-auto">
              <p className="font-medium">{output || <span className="text-muted-foreground">La conversión aparecerá aquí</span>}</p>
            </div>
          </div>
        </div>
        {output && (
          <Button
            size="sm"
            variant="outline"
            className="mt-3"
            onClick={() => speak(input)}
            aria-label="Escuchar pronunciación"
          >
            <Volume2 className="h-4 w-4 mr-2" />
            Escuchar
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default function AlphabetPage() {
  const [filter, setFilter] = useState<"all" | "new">("all");

  const filtered = filter === "new" ? alphabetLetters.filter((l) => l.isNew) : alphabetLetters;

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl px-4 py-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold mb-2">Abeceda serbia — Srpska abeceda</h1>
          <p className="text-muted-foreground">
            El serbio es 100% fonético: cada letra tiene exactamente un sonido. Una vez que aprendas los 30 caracteres,
            puedes leer cualquier texto serbio perfectamente.
          </p>
        </div>

        {/* Key insight */}
        <Card className="border-green-200 bg-green-50 dark:bg-green-950/30 dark:border-green-900">
          <CardContent className="p-5">
            <p className="text-sm font-medium text-green-800 dark:text-green-200">
              💡 Ventaja enorme para ti: el serbio NO tiene reglas de pronunciación complicadas como el inglés o el francés.
              Cada letra se pronuncia siempre igual, igual que en español. ¡Eso es una enorme ventaja!
            </p>
          </CardContent>
        </Card>

        {/* Filter */}
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            Todas las letras (30)
          </Button>
          <Button
            size="sm"
            variant={filter === "new" ? "default" : "outline"}
            onClick={() => setFilter("new")}
          >
            Sonidos nuevos ({alphabetLetters.filter((l) => l.isNew).length})
          </Button>
        </div>

        {/* Alphabet grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((letter) => (
            <Card
              key={letter.latin}
              className={cn(
                "cursor-pointer hover:shadow-md transition-all",
                letter.isNew && "border-primary/40 bg-primary/5"
              )}
              onClick={() => speak(letter.exampleWordSr)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-2xl font-bold">{letter.latin}</span>
                    <span className="text-lg text-muted-foreground ml-2">{letter.cyrillic}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {letter.isNew && <Badge variant="default" className="text-[9px] px-1.5">Nuevo</Badge>}
                    <Volume2 className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-1">{letter.ipa}</p>
                <p className="text-xs mb-2 leading-relaxed">{letter.spanishHint}</p>
                <div className="rounded-md bg-muted/60 px-2.5 py-1.5 text-xs">
                  <span className="font-semibold">{letter.exampleWordSr}</span>
                  <span className="text-muted-foreground ml-1">· {letter.exampleWordEs}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Minimal pairs */}
        <div>
          <h2 className="text-xl font-bold mb-4">Pares mínimos difíciles</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Estos son los sonidos que más confunden a los hispanohablantes. Practica distinguirlos.
          </p>
          <div className="space-y-3">
            {minimalPairs.map((pair) => (
              <Card key={pair.word1Sr}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-6 mb-2">
                    <button
                      className="text-center group"
                      onClick={() => speak(pair.word1Sr)}
                    >
                      <p className="text-xl font-bold text-primary group-hover:underline">{pair.word1Sr}</p>
                      <p className="text-xs text-muted-foreground">{pair.word1Es}</p>
                    </button>
                    <span className="text-muted-foreground">↔</span>
                    <button
                      className="text-center group"
                      onClick={() => speak(pair.word2Sr)}
                    >
                      <p className="text-xl font-bold text-secondary group-hover:underline">{pair.word2Sr}</p>
                      <p className="text-xs text-muted-foreground">{pair.word2Es}</p>
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground border-t pt-2 mt-2">{pair.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Live converter */}
        <LiveConverter />
      </div>
    </AppShell>
  );
}
