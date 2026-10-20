import React from "react";
import { cn } from "@/lib/utils";

export type SurfaceVariant = "canvas" | "card" | "raised" | "inset";

export interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: SurfaceVariant;
  interactive?: boolean;
  withRegistrationMarks?: boolean;
  as?: React.ElementType;
}

const variantStyles: Record<SurfaceVariant, string> = {
  canvas: "bg-canvas text-text-primary",
  card: "bg-surface border border-border text-text-primary rounded-sm",
  raised: "bg-surface-raised border border-border text-text-primary rounded-sm",
  inset: "bg-[#151613] border border-border text-text-primary rounded-sm",
};

export function Surface({
  children,
  variant = "card",
  interactive = false,
  withRegistrationMarks = false,
  as: Component = "div",
  className,
  ...props
}: SurfaceProps) {
  return (
    <Component
      className={cn(
        "relative",
        variantStyles[variant],
        interactive &&
          "transition-all duration-250 ease-out hover:bg-surface-raised hover:border-accent hover:shadow-2xl hover:shadow-black/60",
        className
      )}
      {...props}
    >
      {withRegistrationMarks && (
        <>
          <span
            className="absolute top-2 left-2 text-[10px] font-mono text-accent select-none pointer-events-none"
            aria-hidden="true"
          >
            +
          </span>
          <span
            className="absolute top-2 right-2 text-[10px] font-mono text-accent select-none pointer-events-none"
            aria-hidden="true"
          >
            +
          </span>
          <span
            className="absolute bottom-2 left-2 text-[10px] font-mono text-accent select-none pointer-events-none"
            aria-hidden="true"
          >
            +
          </span>
          <span
            className="absolute bottom-2 right-2 text-[10px] font-mono text-accent select-none pointer-events-none"
            aria-hidden="true"
          >
            +
          </span>
        </>
      )}
      {children}
    </Component>
  );
}
