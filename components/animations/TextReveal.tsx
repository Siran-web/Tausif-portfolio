"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export type TextRevealTag =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "div";

export interface TextRevealProps extends React.HTMLAttributes<HTMLElement> {
  text: string;
  as?: TextRevealTag;
  mode?: "words" | "lines";
  delay?: number;
  duration?: number;
  stagger?: number;
  triggerOnScroll?: boolean;
  className?: string;
  id?: string;
}

export function TextReveal({
  text,
  as: Component = "h2",
  mode = "words",
  delay = 0,
  duration = 0.75,
  stagger = 0.04,
  triggerOnScroll = true,
  className,
  id,
  ...props
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  // Split into units based on mode without character-level expense
  const units = React.useMemo(() => {
    if (mode === "lines") {
      return text.split("\n").filter((line) => line.trim().length > 0);
    }
    // Default words splitting preserving natural spaces
    return text.split(/\s+/).filter(Boolean);
  }, [text, mode]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.set(".text-reveal-item", {
          opacity: 1,
          y: 0,
          clearProps: "all",
        });
        return;
      }

      const items = containerRef.current.querySelectorAll(".text-reveal-item");
      if (!items.length) return;

      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: "115%",
        },
        {
          opacity: 1,
          y: "0%",
          duration,
          stagger,
          delay,
          ease: "power3.out",
          scrollTrigger: triggerOnScroll
            ? {
                trigger: containerRef.current,
                start: "top 88%",
                toggleActions: "play none none none",
              }
            : undefined,
        }
      );
    },
    {
      scope: containerRef,
      dependencies: [text, delay, duration, stagger, triggerOnScroll],
    }
  );

  return (
    <Component
      ref={containerRef as React.Ref<never>}
      id={id}
      aria-label={text}
      className={cn("overflow-hidden", className)}
      {...props}
    >
      {/* Screen-reader full uninterrupted text node */}
      <span className="sr-only">{text}</span>

      {/* Visually animated split presentation with aria-hidden to prevent duplicate announcements */}
      <span aria-hidden="true" className="inline-block w-full whitespace-normal">
        {units.map((unit, index) => (
          <span
            key={`${unit}-${index}`}
            className={cn(
              "inline-block overflow-hidden align-top leading-[inherit]",
              mode === "words" ? "mr-[0.28em] last:mr-0" : "block w-full"
            )}
          >
            <span className="text-reveal-item inline-block will-change-transform will-change-opacity">
              {unit}
            </span>
          </span>
        ))}
      </span>
    </Component>
  );
}
