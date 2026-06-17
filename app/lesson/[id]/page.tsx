import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Construction } from "lucide-react";

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <AppShell>
      <div className="mx-auto max-w-2xl px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <Card className="w-full text-center border-dashed">
          <CardContent className="p-10">
            <Construction className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-xl font-bold mb-2">Lección en preparación</h1>
            <p className="text-muted-foreground mb-2 text-sm">
              El motor de lecciones (Fase 2) se activa en la siguiente entrega.
            </p>
            <p className="text-xs text-muted-foreground mb-6">ID: {id}</p>
            <Button asChild variant="outline">
              <Link href="/learn">← Volver al árbol</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
