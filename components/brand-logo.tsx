import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  stacked?: boolean;
}

export function BrandLogo({ className, size = "md", stacked = false }: BrandLogoProps) {
  const sizes = {
    sm: { line1: "text-sm font-bold", line2: "text-xs font-semibold" },
    md: { line1: "text-base font-bold", line2: "text-sm font-semibold" },
    lg: { line1: "text-2xl font-bold", line2: "text-xl font-semibold" },
  };

  return (
    <div className={cn("flex flex-col leading-tight", stacked ? "items-center text-center" : "", className)}>
      <span className={cn(sizes[size].line1, "text-primary")}>
        Para mi Katherine!
      </span>
      <span className={cn(sizes[size].line2, "text-secondary dark:text-blue-400")}>
        Za moju Kaću! 🇷🇸
      </span>
    </div>
  );
}
