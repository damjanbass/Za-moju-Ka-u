"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, BookOpen, RotateCcw, MessageCircle, BookText, BarChart3,
  Settings, type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/brand-logo";
import { ScriptToggle } from "@/components/script-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { navItems } from "./nav-items";
import { useAppStore } from "@/lib/store/use-app-store";
import { dueCount } from "@/lib/srs";

const iconMap: Record<string, LucideIcon> = {
  Home, BookOpen, RotateCcw, MessageCircle, BookText, BarChart3, Settings,
};

function NavLink({
  href,
  label,
  icon,
  badge,
  mobile,
}: {
  href: string;
  label: string;
  icon: string;
  badge?: number;
  mobile?: boolean;
}) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
  const Icon = iconMap[icon] ?? Home;

  if (mobile) {
    return (
      <Link
        href={href}
        className={cn(
          "flex flex-col items-center gap-0.5 px-3 py-2 text-[10px] font-medium transition-colors relative",
          isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
        )}
        aria-label={label}
      >
        <span className="relative">
          <Icon className="h-5 w-5" />
          {badge ? (
            <span className="absolute -top-1 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] text-primary-foreground font-bold">
              {badge > 9 ? "9+" : badge}
            </span>
          ) : null}
        </span>
        <span>{label}</span>
        {isActive && (
          <span className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-8 rounded-full bg-primary" />
        )}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <span className="relative shrink-0">
        <Icon className="h-5 w-5" />
        {badge ? (
          <span className="absolute -top-1 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] text-primary-foreground font-bold">
            {badge > 9 ? "9+" : badge}
          </span>
        ) : null}
      </span>
      <span className="flex-1">{label}</span>
    </Link>
  );
}

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const srsCards = useAppStore((s) => s.srs);
  const due = dueCount(srsCards);

  return (
    <div className="flex min-h-screen bg-background">
      {/* ── Desktop sidebar ─────────────────────────────────────── */}
      <aside className="hidden md:flex flex-col w-60 shrink-0 border-r border-border bg-sidebar sticky top-0 h-screen">
        {/* Logo */}
        <div className="px-4 py-5 border-b border-sidebar-border">
          <Link href="/dashboard" className="block">
            <BrandLogo size="sm" />
          </Link>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              badge={item.href === "/review" && due > 0 ? due : undefined}
            />
          ))}
        </nav>

        {/* Bottom controls */}
        <div className="px-2 pb-4 space-y-1 border-t border-sidebar-border pt-3">
          <NavLink href="/settings" label="Ajustes" icon="Settings" />
          <div className="flex items-center justify-between px-3 py-2">
            <ScriptToggle />
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {/* ── Main content ─────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Mobile top bar */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-border bg-background sticky top-0 z-30">
          <Link href="/dashboard">
            <BrandLogo size="sm" />
          </Link>
          <div className="flex items-center gap-2">
            <ScriptToggle />
            <ThemeToggle />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 pb-20 md:pb-0">
          {children}
        </main>

        {/* ── Mobile bottom navigation ─────────────────────────── */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center justify-around">
            {navItems.slice(0, 5).map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                badge={item.href === "/review" && due > 0 ? due : undefined}
                mobile
              />
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
