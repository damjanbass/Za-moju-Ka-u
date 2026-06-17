import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Construction } from "lucide-react";

export default async function GrammarPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  return (
    <AppShell>
      <div className="mx-auto max-w-2xl px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <Card className="w-full text-center border-dashed">
          <CardContent className="p-10">
            <Construction className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-xl font-bold mb-2">Gramática — próximamente</h1>
            <p className="text-muted-foreground mb-2 text-sm">
              Las tarjetas de gramática basadas en patrones (casos, género, aspecto verbal)
              se activan en la Fase 6.
            </p>
            <p className="text-xs text-muted-foreground mb-6">Tema: {topic}</p>
            <Button asChild variant="outline">
              <Link href="/learn">← Volver al árbol</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
