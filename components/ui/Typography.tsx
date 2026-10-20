import React from "react";
import { cn } from "@/lib/utils";

// Editorial Display Heading
export interface DisplayProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";
  size?: "hero" | "title" | "section" | "card" | "compact";
  accent?: boolean;
}

const displaySizes = {
  hero: "display-hero text-5xl sm:text-6xl md:text-7xl lg:text-8xl",
  title: "display-title text-3xl sm:text-4xl md:text-5xl",
  section: "display-section text-2xl sm:text-3xl md:text-4xl",
  card: "display-card text-xl sm:text-2xl",
  compact: "font-display text-lg sm:text-xl leading-snug",
};

export function Display({
  children,
  as: Component = "h2",
  size = "section",
  accent = false,
  className,
  ...props
}: DisplayProps) {
  return (
    <Component
      className={cn(
        "font-display font-normal tracking-tight",
        accent ? "text-accent" : "text-text-primary",
        displaySizes[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

// Reusable Body & Descriptive Typography
export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: "p" | "span" | "div" | "blockquote";
  variant?: "lead" | "body" | "caption" | "meta" | "quote";
  className?: string;
}

const textVariants = {
  lead: "text-base sm:text-lg leading-relaxed text-text-secondary font-sans",
  body: "text-sm sm:text-base leading-relaxed text-text-secondary font-sans",
  caption: "text-xs leading-normal text-text-secondary font-sans",
  meta: "text-[11px] sm:text-xs uppercase tracking-widest text-text-tertiary font-sans font-medium",
  quote: "text-base sm:text-lg italic leading-relaxed text-text-primary/90 font-sans border-l-2 border-accent/60 pl-4 sm:pl-6",
};

export function Text({
  children,
  as: Component = "p",
  variant = "body",
  className,
  ...props
}: TextProps) {
  return (
    <Component
      className={cn(textVariants[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
}

// Architectural Monospace Spec
export interface MonoSpecProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export function MonoSpec({ children, className, ...props }: MonoSpecProps) {
  return (
    <span
      className={cn(
        "font-mono text-xs tracking-wider text-text-tertiary select-none uppercase",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
