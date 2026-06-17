export interface NavItem {
  href: string;
  label: string;
  icon: string; // lucide icon name
  description: string;
}

export const navItems: NavItem[] = [
  { href: "/dashboard", label: "Inicio", icon: "Home", description: "Tu panel principal" },
  { href: "/learn", label: "Aprender", icon: "BookOpen", description: "Árbol de lecciones" },
  { href: "/review", label: "Repasar", icon: "RotateCcw", description: "Repaso espaciado (SRS)" },
  { href: "/conversation", label: "Conversar", icon: "MessageCircle", description: "Práctica de conversación" },
  { href: "/stories", label: "Historias", icon: "BookText", description: "Lecturas graduadas" },
  { href: "/progress", label: "Progreso", icon: "BarChart3", description: "Tus estadísticas" },
];
