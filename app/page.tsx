import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen, Brain, Repeat2, Mic, MessageCircle, BarChart3,
  CheckCircle2, ChevronRight, Zap, Clock, Globe,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Input comprensible (Krashen)",
    description: "Cada lección presenta un 80–90% de material conocido y un 10–20% nuevo. Tu cerebro aprende de forma natural, sin forzar.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Repeat2,
    title: "Repetición espaciada (SRS)",
    description: "El algoritmo SM-2 programa exactamente cuándo revisar cada palabra para que la recuerdes al máximo con el mínimo esfuerzo.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: BarChart3,
    title: "Frecuencia primero",
    description: "Las 1.000 palabras más frecuentes del serbio te dan un 80% de comprensión en la vida cotidiana. Empezamos por ahí.",
    color: "text-green-600",
    bg: "bg-green-100 dark:bg-green-900/30",
  },
  {
    icon: BookOpen,
    title: "Frases, no palabras sueltas",
    description: "Cada palabra nueva aparece dentro de una oración real con contexto, audio y traducción al español.",
    color: "text-amber-600",
    bg: "bg-amber-100 dark:bg-amber-900/30",
  },
  {
    icon: Mic,
    title: "Audio primero (Field)",
    description: "Los ejercicios de escucha presentan el sonido antes que el texto, para construir comprensión auditiva real desde el día uno.",
    color: "text-purple-600",
    bg: "bg-purple-100 dark:bg-purple-900/30",
  },
  {
    icon: MessageCircle,
    title: "Conversación real (sin IA)",
    description: "Practica diálogos reales en el café, el mercado y más — 100% offline, sin APIs de pago, con corrección en español.",
    color: "text-blue-600",
    bg: "bg-blue-100 dark:bg-blue-900/30",
  },
];

const advantagesForSpanish = [
  { emoji: "🎉", text: "El serbio es 100% fonético: una letra = un sonido. Lo que lees es lo que escuchas." },
  { emoji: "✅", text: "Ya conoces 'ñ' (=nj), 'll' (=lj) y la 'j' de 'yo' (=j). ¡Tres letras nuevas gratis!" },
  { emoji: "✅", text: "Ambas lenguas tienen 'rr' vibrante. La 'r' serbia siempre es fuerte." },
  { emoji: "✅", text: "Orden de palabras flexible, como en español." },
  { emoji: "✅", text: "Sin artículos (sin 'el', 'la', 'un'). ¡Una regla menos!" },
  { emoji: "⚡", text: "La 'ch' española = č/ć serbias. ¡Ya las pronuncias!" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3">
          <BrandLogo size="sm" />
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button asChild size="sm">
              <Link href="/onboarding">Empezar gratis</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-20 md:py-32 text-center">
        {/* Background decorative elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute top-1/2 left-10 h-64 w-64 rounded-full bg-secondary/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl">
          <Badge className="mb-4 text-xs px-3 py-1">
            100% gratis · Sin IA de pago · Offline
          </Badge>

          <div className="mb-6">
            <BrandLogo size="lg" stacked className="mb-2 justify-center" />
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Aprende serbio{" "}
            <span className="text-primary">desde cero,</span>
            <br />
            rápido y con{" "}
            <span className="text-secondary">base científica</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Diseñado específicamente para hispanohablantes. Desde el alfabeto
            hasta conversaciones reales, usando los métodos con mayor evidencia
            científica en adquisición de segundas lenguas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="xl">
              <Link href="/onboarding">
                Empezar gratis
                <ChevronRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <Link href="/alphabet">
                Ver el alfabeto serbio
              </Link>
            </Button>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            {[
              { icon: Zap, label: "30 letras fonéticas" },
              { icon: Clock, label: "5–30 min al día" },
              { icon: Globe, label: "Latinica + Ćirilica" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <Icon className="h-4 w-4 text-primary" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages for Spanish speakers */}
      <section className="bg-muted/50 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-2 text-center text-2xl font-bold md:text-3xl">
            Ventajas reales para un hispanohablante
          </h2>
          <p className="mb-10 text-center text-muted-foreground">
            El serbio no es tan difícil como crees. Aquí está la evidencia:
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {advantagesForSpanish.map(({ emoji, text }) => (
              <div key={text} className="flex items-start gap-3 rounded-xl border bg-background p-4">
                <span className="text-xl shrink-0">{emoji}</span>
                <p className="text-sm">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Método científico */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-2xl font-bold md:text-3xl">
              Método respaldado por la ciencia
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              No es una app de flashcards ni un curso de gramática. Es un sistema
              completo basado en lo que la investigación dice que realmente funciona.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description, color, bg }) => (
              <Card key={title} className="border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${bg}`}>
                    <Icon className={`h-6 w-6 ${color}`} />
                  </div>
                  <h3 className="mb-2 font-semibold">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lo que aprenderás */}
      <section className="bg-muted/50 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center text-2xl font-bold md:text-3xl">
            El camino de aprendizaje
          </h2>
          <div className="space-y-4">
            {[
              { unit: "Unidad 0", title: "Abeceda y fonética", desc: "30 letras, sonidos únicos, latinica ↔ ćirilica." },
              { unit: "Unidad 1", title: "Saludos y presentaciones", desc: "Zdravo, hvala, kako se zoveš — las primeras frases." },
              { unit: "Unidad 2", title: "Personas y pronombres", desc: "Ja, ti, on, ona — y los 3 géneros gramaticales." },
              { unit: "Unidad 3", title: "Verbos esenciales", desc: "Biti (ser/estar), imati, hteti — el núcleo del idioma." },
              { unit: "Unidad 4", title: "Números y tiempo", desc: "Contar, horas, días de la semana." },
              { unit: "Unidad 5", title: "Café y comida", desc: "El rol-play más útil: pedir en un café en Belgrado." },
              { unit: "Unidad 6", title: "Primer caso: Acusativo", desc: "Vidim grad, pijem kafu — gramática en contexto." },
            ].map(({ unit, title, desc }) => (
              <div key={unit} className="flex items-start gap-4 rounded-xl border bg-background p-4">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{unit}</span>
                  <p className="font-semibold">{title}</p>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="px-4 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            ¿Lista para empezar?
          </h2>
          <p className="mb-8 text-muted-foreground">
            Solo necesitas 10 minutos al día. El sistema se adapta a tu ritmo.
          </p>
          <Button asChild size="xl">
            <Link href="/onboarding">
              Empezar gratis ahora
              <ChevronRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-4 py-8">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <BrandLogo size="sm" />
          <p>Hecho con amor · 100% gratuito · Sin publicidad</p>
        </div>
      </footer>
    </div>
  );
}
