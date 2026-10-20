import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "link" | "contrast";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonRadius = "md" | "full" | "none";

export interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: ButtonRadius;
  className?: string;
  children: React.ReactNode;
}

export type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined;
  };

export type ButtonAsAnchor = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
    external?: boolean;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const variantStyles: Record<ButtonVariant, string> = {
  // Architectural Brass primary CTA
  primary:
    "bg-accent text-canvas font-semibold hover:bg-accent-hover active:bg-[#9E855F] shadow-sm transition-all duration-200",
  // Surface elevated secondary button
  secondary:
    "bg-surface-raised text-text-primary border border-border hover:border-accent hover:bg-surface-overlay active:bg-surface transition-all duration-200",
  // Architectural hairline outline button
  outline:
    "border border-border bg-transparent text-text-primary hover:border-accent hover:bg-surface active:bg-surface-raised transition-all duration-200",
  // Subtle ghost button
  ghost:
    "bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-raised/70 active:bg-surface-raised transition-all duration-200",
  // Editorial link button
  link:
    "bg-transparent text-text-secondary underline-offset-4 hover:underline hover:text-accent p-0 h-auto font-medium transition-colors duration-200",
  // High contrast linen button
  contrast:
    "bg-text-primary text-canvas font-semibold hover:bg-accent hover:text-canvas active:opacity-90 shadow-sm transition-all duration-200",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3.5 py-1.5 text-xs tracking-wider",
  md: "px-5 py-2.5 text-xs sm:text-sm tracking-wider",
  lg: "px-7 py-3.5 text-xs sm:text-sm tracking-widest",
};

const radiusStyles: Record<ButtonRadius, string> = {
  md: "rounded-sm",
  full: "rounded-full",
  none: "rounded-none",
};

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(
  {
    variant = "primary",
    size = "md",
    rounded = "md",
    className,
    children,
    ...props
  },
  ref
) {
  const commonClasses = cn(
    "inline-flex items-center justify-center font-sans font-medium text-center select-none cursor-pointer",
    // Accessible focus ring tailored for dark theme
    "outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
    "disabled:pointer-events-none disabled:opacity-40 disabled:cursor-not-allowed",
    variant !== "link" && sizeStyles[size],
    variant !== "link" && radiusStyles[rounded],
    variantStyles[variant],
    className
  );

  if ("href" in props && typeof props.href === "string") {
    const { href, external, ...anchorProps } = props as ButtonAsAnchor;
    if (external || href.startsWith("http") || href.startsWith("mailto:")) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={commonClasses}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          {...anchorProps}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={commonClasses}
        {...anchorProps}
      >
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={buttonProps.type || "button"}
      className={commonClasses}
      {...buttonProps}
    >
      {children}
    </button>
  );
});
