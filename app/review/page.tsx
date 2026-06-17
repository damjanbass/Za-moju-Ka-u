"use client";

import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAppStore } from "@/lib/store/use-app-store";
import { dueCount } from "@/lib/srs";
import { CheckCircle2, RotateCcw, Construction } from "lucide-react";

export default function ReviewPage() {
  const srsCards = useAppStore((s) => s.srs);
  const due = dueCount(srsCards);

  if (due === 0) {
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

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <Card className="w-full text-center border-dashed">
          <CardContent className="p-10">
            <Construction className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-xl font-bold mb-2">Sesión de repaso</h1>
            <p className="text-muted-foreground mb-2 text-sm">
              Tienes <strong>{due}</strong> {due === 1 ? "ítem listo" : "ítems listos"} para repasar.
            </p>
            <p className="text-xs text-muted-foreground mb-6">
              El motor de repaso SRS se activa en la Fase 3.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" asChild>
                <Link href="/dashboard">← Panel</Link>
              </Button>
              <Button asChild>
                <Link href="/learn">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Más lecciones
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
