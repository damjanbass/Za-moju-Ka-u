"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { conversationScenes } from "@/lib/data";
import { useSerbianText } from "@/components/script-toggle";
import { speak } from "@/lib/audio";
import { Volume2, ChevronRight, Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react";
import type { ConversationScene, DialogueNode } from "@/lib/data/types";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store/use-app-store";
import { toast } from "sonner";

// ── Scene card on the scene list ───────────────────────────────────────────
function SceneCard({ scene, onStart }: { scene: ConversationScene; onStart: () => void }) {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onStart}>
      <CardContent className="p-5 flex items-start gap-4">
        <span className="text-4xl">{scene.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold">{scene.title}</h3>
            <Badge variant="outline" className="text-[10px]">{scene.level}</Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{scene.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">+{scene.xpReward} XP</span>
            <Button size="sm">
              Practicar <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Active conversation player ─────────────────────────────────────────────
function ConversationPlayer({
  scene,
  onFinish,
}: {
  scene: ConversationScene;
  onFinish: (xp: number) => void;
}) {
  const [nodeId, setNodeId] = useState(scene.startNodeId);
  const [showTranslation, setShowTranslation] = useState(false);
  const [lastFeedback, setLastFeedback] = useState<{ note: string; isBest: boolean } | null>(null);
  const [done, setDone] = useState(false);
  const [typedInput, setTypedInput] = useState("");
  const [typeError, setTypeError] = useState("");

  const node: DialogueNode | undefined = scene.nodes[nodeId];
  const speakerSr = useSerbianText(
    node?.speakerLineSr ?? "",
    node?.speakerLineSrCyrillic ?? node?.speakerLineSr ?? ""
  );

  function normalize(s: string) {
    return s
      .toLowerCase()
      .replace(/[čć]/g, "c")
      .replace(/[šs]/g, "s")
      .replace(/ž/g, "z")
      .replace(/đ/g, "d")
      .replace(/\s+/g, " ")
      .trim();
  }

  function handleOption(sr: string, isBest: boolean, nextNodeId: string | null) {
    if (!node) return;
    setShowTranslation(false);
    setTypedInput("");
    setTypeError("");
    setLastFeedback({ note: node.correctionNote ?? "", isBest });
    if (nextNodeId === null) {
      setDone(true);
    } else {
      setNodeId(nextNodeId);
    }
  }

  function handleTypedSubmit() {
    if (!node) return;
    const normalized = normalize(typedInput);
    const accepted = node.acceptedTypedAnswers ?? [];
    const match = accepted.some((a: string) => normalize(a) === normalized);
    if (!match) {
      setTypeError(`No exactamente. Prueba: "${node.userOptions[0].sr}"`);
      return;
    }
    const best = node.userOptions.find((o) => o.isBest);
    handleOption(typedInput, !!best, best?.nextNodeId ?? null);
  }

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center space-y-6">
        <CheckCircle2 className="h-16 w-16 text-green-500" />
        <div>
          <h2 className="text-2xl font-bold mb-2">¡Escena completada!</h2>
          <p className="text-muted-foreground">Has practicado frases clave de la escena «{scene.title}».</p>
        </div>
        <p className="text-sm text-muted-foreground">
          Las palabras practicadas entran en tu cola de repaso SRS.
        </p>
        <div className="flex gap-3">
          <Button onClick={() => onFinish(scene.xpReward)}>
            +{scene.xpReward} XP · Terminar
          </Button>
        </div>
      </div>
    );
  }

  if (!node) return null;

  return (
    <div className="space-y-4">
      {/* Speaker line */}
      <Card className="bg-secondary/5 border-secondary/20">
        <CardContent className="p-5">
          <p className="text-xs text-muted-foreground mb-2 font-semibold uppercase tracking-wide">Interlocutor</p>
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <p className="text-lg font-semibold mb-1">{speakerSr}</p>
              {showTranslation && (
                <p className="text-sm text-muted-foreground italic">{node.speakerLineEs}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => speak(node.speakerLineSr)}
                className="rounded-full bg-secondary/10 p-2 text-secondary hover:bg-secondary/20 transition-colors"
                aria-label="Escuchar la frase"
              >
                <Volume2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setShowTranslation((v) => !v)}
                className="rounded-full bg-muted p-2 text-muted-foreground hover:bg-muted/80 transition-colors"
                aria-label="Mostrar/ocultar traducción"
              >
                {showTranslation ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feedback from previous turn */}
      {lastFeedback?.note && (
        <Card className={cn(
          "border",
          lastFeedback.isBest
            ? "border-green-200 bg-green-50 dark:bg-green-950/30 dark:border-green-900"
            : "border-amber-200 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-900"
        )}>
          <CardContent className="p-4 flex gap-3 items-start">
            {lastFeedback.isBest
              ? <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
              : <XCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />}
            <p className="text-sm">{lastFeedback.note}</p>
          </CardContent>
        </Card>
      )}

      {/* User reply options */}
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Tu respuesta</p>
        {node.userOptions.map((opt) => (
          <button
            key={opt.sr}
            onClick={() => handleOption(opt.sr, opt.isBest, opt.nextNodeId)}
            className="w-full flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-left hover:border-primary/50 hover:bg-primary/5 transition-all"
          >
            <span className="shrink-0 text-lg">{opt.isBest ? "⭐" : "•"}</span>
            <div>
              <p className="font-semibold text-sm">{opt.sr}</p>
              <p className="text-xs text-muted-foreground italic">{opt.es}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Optional type-your-answer */}
      {node.acceptedTypedAnswers && node.acceptedTypedAnswers.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">O escribe tu propia respuesta en serbio:</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={typedInput}
              onChange={(e) => { setTypedInput(e.target.value); setTypeError(""); }}
              onKeyDown={(e) => e.key === "Enter" && handleTypedSubmit()}
              placeholder="Escribe en serbio..."
              className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <Button size="sm" onClick={handleTypedSubmit}>Enviar</Button>
          </div>
          {typeError && <p className="text-xs text-destructive">{typeError}</p>}
        </div>
      )}

      {/* Tip for next */}
      {node.tipNext && (
        <p className="text-xs text-muted-foreground border-t pt-3 flex gap-1.5">
          <span className="shrink-0">💡</span>
          <span>{node.tipNext}</span>
        </p>
      )}
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────
export default function ConversationPage() {
  const [activeScene, setActiveScene] = useState<ConversationScene | null>(null);
  const addXp = useAppStore((s) => s.addXp);

  function handleFinish(xp: number) {
    addXp(xp);
    toast.success(`¡+${xp} XP ganados!`);
    setActiveScene(null);
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">
        {!activeScene ? (
          <>
            <div>
              <h1 className="text-2xl font-bold mb-2">Práctica de conversación</h1>
              <p className="text-muted-foreground text-sm">
                Diálogos reales en situaciones cotidianas. Sin IA, 100% offline.
                El tutor responde en serbio y te corrige en español.
              </p>
            </div>
            <div className="space-y-4">
              {conversationScenes.map((scene) => (
                <SceneCard
                  key={scene.id}
                  scene={scene}
                  onStart={() => setActiveScene(scene)}
                />
              ))}
            </div>
            <Card className="border-dashed">
              <CardContent className="p-5 text-center text-muted-foreground text-sm">
                Más escenas próximamente: mercado, indicaciones, presentarse en el trabajo, etc.
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => setActiveScene(null)}>
                ← Escenas
              </Button>
              <div>
                <h1 className="font-bold">{activeScene.icon} {activeScene.title}</h1>
                <p className="text-xs text-muted-foreground">{activeScene.description}</p>
              </div>
            </div>
            <ConversationPlayer scene={activeScene} onFinish={handleFinish} />
          </>
        )}
      </div>
    </AppShell>
  );
}
