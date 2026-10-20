import React from "react";
import NextLink from "next/link";
import { cn } from "@/lib/utils";

export type LinkVariant = "default" | "accent" | "editorial" | "subtle";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: LinkVariant;
  external?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<LinkVariant, string> = {
  default:
    "text-text-secondary hover:text-text-primary transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm",
  accent:
    "text-accent hover:text-accent-hover transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm",
  editorial:
    "text-text-primary underline decoration-border hover:decoration-accent underline-offset-4 hover:text-accent transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm",
  subtle:
    "text-text-tertiary hover:text-text-secondary transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm",
};

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  function Link(
    { href, variant = "default", external, className, children, ...props },
    ref
  ) {
    const isExternal =
      external || href.startsWith("http") || href.startsWith("mailto:");

    const linkClasses = cn(
      "font-sans font-medium select-none inline-flex items-center gap-1",
      variantStyles[variant],
      className
    );

    if (isExternal) {
      return (
        <a
          ref={ref}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className={linkClasses}
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <NextLink ref={ref} href={href} className={linkClasses} {...props}>
        {children}
      </NextLink>
    );
  }
);
