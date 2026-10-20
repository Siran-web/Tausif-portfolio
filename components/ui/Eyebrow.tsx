import React from "react";
import { cn } from "@/lib/utils";

export type EyebrowAccent = "accent" | "brass" | "stone" | "linen" | "muted" | "olive" | "graphite";

export interface EyebrowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "pill" | "line";
  accentColor?: EyebrowAccent;
  as?: React.ElementType;
}

export function Eyebrow({
  children,
  variant = "default",
  accentColor = "accent",
  as: Component = "div",
  className,
  ...props
}: EyebrowProps) {
  const colorStyles: Record<EyebrowAccent, string> = {
    accent: "text-accent",
    brass: "text-accent",
    olive: "text-accent",
    stone: "text-text-secondary",
    muted: "text-text-tertiary",
    linen: "text-text-primary",
    graphite: "text-text-primary",
  };

  const selectedColor = colorStyles[accentColor] || "text-accent";

  if (variant === "pill") {
    return (
      <Component
        className={cn(
          "inline-flex items-center gap-2 rounded-full border border-border bg-surface/90 px-3 py-1 text-xs font-semibold tracking-widest uppercase backdrop-blur-sm",
          selectedColor,
          className
        )}
        {...props}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
        {children}
      </Component>
    );
  }

  if (variant === "line") {
    return (
      <Component
        className={cn(
          "inline-flex items-center gap-3 text-xs font-semibold tracking-[0.2em] uppercase",
          selectedColor,
          className
        )}
        {...props}
      >
        <span className="h-[1px] w-6 bg-border inline-block" />
        <span>{children}</span>
      </Component>
    );
  }

  return (
    <Component
      className={cn(
        "inline-flex items-center text-xs font-semibold tracking-[0.2em] uppercase",
        selectedColor,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
