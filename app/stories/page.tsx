"use client";

import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Construction } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function StoriesPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-2xl px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <Card className="w-full text-center border-dashed">
          <CardContent className="p-10">
            <span className="text-6xl mb-4 block">📖</span>
            <h1 className="text-xl font-bold mb-2">Historias graduadas — próximamente</h1>
            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
              Micro-historias en serbio clasificadas por nivel (A1 → B2), con traducción
              al pasar el cursor, audio TTS y preguntas de comprensión. Se activan en la Fase 6.
            </p>
            <div className="grid grid-cols-2 gap-2 mb-6 text-left text-xs text-muted-foreground">
              {[
                "📗 Nivel A1 — Frases simples",
                "📘 Nivel A2 — Diálogos cortos",
                "📙 Nivel B1 — Párrafos narrativos",
                "📕 Nivel B2 — Textos auténticos",
              ].map((item) => (
                <div key={item} className="rounded-lg border p-3">{item}</div>
              ))}
            </div>
            <Button asChild variant="outline">
              <Link href="/dashboard">← Panel</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
