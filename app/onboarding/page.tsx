"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BrandLogo } from "@/components/brand-logo";
import { useAppStore } from "@/lib/store/use-app-store";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, ChevronLeft } from "lucide-react";
import type { LearningGoal, DailyGoal } from "@/lib/store/use-app-store";
import { cn } from "@/lib/utils";

const goals: { value: LearningGoal; label: string; emoji: string }[] = [
  { value: "travel", label: "Viajar a Serbia", emoji: "✈️" },
  { value: "family", label: "Familia o pareja serbia", emoji: "❤️" },
  { value: "work", label: "Trabajo o negocios", emoji: "💼" },
  { value: "culture", label: "Cultura, música, cine", emoji: "🎭" },
];

const minutes: { value: DailyGoal; label: string }[] = [
  { value: 5, label: "5 min — Casual" },
  { value: 10, label: "10 min — Regular" },
  { value: 20, label: "20 min — Intenso" },
  { value: 30, label: "30 min — Serio" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { setLearningGoal, setMinutesPerDay, setDailyGoal, completeOnboarding, updateStreak } = useAppStore();

  const [step, setStep] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState<LearningGoal | null>(null);
  const [selectedMinutes, setSelectedMinutes] = useState<DailyGoal>(10);

  const totalSteps = 3;

  function handleFinish() {
    if (selectedGoal) setLearningGoal(selectedGoal);
    setMinutesPerDay(selectedMinutes);
    setDailyGoal(selectedMinutes);
    completeOnboarding();
    updateStreak();
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="mb-8 text-center">
          <BrandLogo size="md" stacked className="justify-center mb-4" />
          <Progress value={((step + 1) / totalSteps) * 100} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">Paso {step + 1} de {totalSteps}</p>
        </div>

        {/* Step 0 — Welcome */}
        {step === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-6">🇷🇸</div>
              <h1 className="text-2xl font-bold mb-3">¡Bienvenida al serbio!</h1>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Esta plataforma está diseñada para hispanohablantes que quieren aprender
                serbio desde cero, usando métodos con base científica real.
                Sin IA de pago, sin suscripciones — 100% gratis.
              </p>
              <Button size="lg" className="w-full" onClick={() => setStep(1)}>
                Comenzar configuración <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 1 — Goal */}
        {step === 1 && (
          <Card>
            <CardContent className="p-8">
              <h2 className="text-xl font-bold mb-2 text-center">¿Por qué quieres aprender serbio?</h2>
              <p className="text-sm text-muted-foreground text-center mb-6">
                Personalizamos el contenido según tu objetivo.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {goals.map(({ value, label, emoji }) => (
                  <button
                    key={value}
                    onClick={() => setSelectedGoal(value)}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-sm font-medium transition-all",
                      selectedGoal === value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-muted-foreground"
                    )}
                  >
                    <span className="text-3xl">{emoji}</span>
                    <span>{label}</span>
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(0)} className="flex-1">
                  <ChevronLeft className="h-4 w-4" /> Atrás
                </Button>
                <Button onClick={() => setStep(2)} disabled={!selectedGoal} className="flex-1">
                  Continuar <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2 — Daily minutes */}
        {step === 2 && (
          <Card>
            <CardContent className="p-8">
              <h2 className="text-xl font-bold mb-2 text-center">¿Cuánto tiempo tienes al día?</h2>
              <p className="text-sm text-muted-foreground text-center mb-6">
                Puedes cambiarlo cuando quieras en Ajustes.
              </p>
              <div className="space-y-3 mb-6">
                {minutes.map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => setSelectedMinutes(value)}
                    className={cn(
                      "w-full flex items-center justify-between rounded-xl border-2 px-5 py-4 text-sm font-medium transition-all",
                      selectedMinutes === value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-muted-foreground"
                    )}
                  >
                    <span>{label}</span>
                    {selectedMinutes === value && <span className="text-primary">✓</span>}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  <ChevronLeft className="h-4 w-4" /> Atrás
                </Button>
                <Button onClick={handleFinish} className="flex-1">
                  ¡Empezar a aprender! 🚀
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
