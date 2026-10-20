"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export type ScrollRevealVariant =
  | "fade-up"
  | "fade-down"
  | "horizontal"
  | "image-mask"
  | "stagger";

export type ScrollRevealDirection = "up" | "down" | "left" | "right";

export interface ScrollRevealProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  /**
   * Animation style variant:
   * - "fade-up": Classic vertical lift with opacity fade.
   * - "fade-down": Descending fade.
   * - "horizontal": Lateral reveal from left or right direction.
   * - "image-mask": Architectural clip-path curtain wipe with subtle scale settle.
   * - "stagger": Sequential child stagger triggered once by parent container entry.
   */
  variant?: ScrollRevealVariant;
  /**
   * Lateral direction when variant is "horizontal" or "image-mask".
   * @default "up"
   */
  direction?: ScrollRevealDirection;
  /**
   * CSS selector for child items when variant="stagger".
   * @default "> *"
   */
  selector?: string;
  /**
   * Delay in seconds between each child reveal in "stagger" variant.
   * @default 0.1
   */
  stagger?: number;
  /**
   * Entrance delay in seconds.
   * @default 0
   */
  delay?: number;
  /**
   * Duration of the reveal in seconds.
   * @default 0.75
   */
  duration?: number;
  /**
   * Translation distance in pixels.
   * @default 30
   */
  distance?: number;
  /**
   * Viewport threshold for triggering the animation (e.g. "top 85%").
   * @default "top 85%"
   */
  threshold?: string;
  /**
   * ScrollTrigger toggle actions. Defaults to "play none none none" to guarantee
   * animation plays once without replay or flickering during repeated scrolling.
   * @default "play none none none"
   */
  toggleActions?: string;
  /**
   * Semantic HTML tag or React component to render as.
   * @default "div"
   */
  as?: React.ElementType;
}

/**
 * ScrollReveal — Unified GSAP ScrollTrigger animation system.
 *
 * Provides opt-in scroll reveals with zero layout shift, component-scoped cleanup,
 * single-trigger parent delegation, and automatic reduced-motion fallback.
 */
export function ScrollReveal({
  children,
  variant = "fade-up",
  direction = "up",
  selector = "> *",
  stagger = 0.1,
  delay = 0,
  duration = 0.75,
  distance = 30,
  threshold = "top 85%",
  toggleActions = "play none none none",
  as: Component = "div",
  className,
  ...props
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      try {
        // Detect user reduced-motion preference
        const prefersReducedMotion =
          typeof window !== "undefined" &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReducedMotion) {
          // Immediately display content in full resting state
          gsap.set(containerRef.current, {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            clipPath: "none",
            clearProps: "all",
          });

          if (variant === "stagger") {
            const items = containerRef.current.querySelectorAll(selector);
            gsap.set(items, { opacity: 1, y: 0, x: 0, clearProps: "all" });
          }
          return;
        }

        // Shared ScrollTrigger configuration
        const scrollTriggerConfig = {
          trigger: containerRef.current,
          start: threshold,
          toggleActions,
          once: true,
        };

        if (variant === "stagger") {
          const items = containerRef.current.querySelectorAll(selector);
          if (!items.length) return;

          gsap.fromTo(
            items,
            {
              opacity: 0,
              y: distance,
            },
            {
              opacity: 1,
              y: 0,
              duration,
              stagger,
              delay,
              ease: "power2.out",
              scrollTrigger: scrollTriggerConfig,
            }
          );
          return;
        }

        if (variant === "image-mask") {
          // Architectural clip-path curtain wipe
          let initialClip = "inset(100% 0% 0% 0%)"; // up
          if (direction === "down") initialClip = "inset(0% 0% 100% 0%)";
          if (direction === "left") initialClip = "inset(0% 0% 0% 100%)";
          if (direction === "right") initialClip = "inset(0% 100% 0% 0%)";

          gsap.fromTo(
            containerRef.current,
            {
              opacity: 0,
              clipPath: initialClip,
              scale: 1.04,
            },
            {
              opacity: 1,
              clipPath: "inset(0% 0% 0% 0%)",
              scale: 1,
              duration: duration * 1.2,
              delay,
              ease: "power3.inOut",
              scrollTrigger: scrollTriggerConfig,
            }
          );
          return;
        }

        if (variant === "horizontal") {
          const xOffset = direction === "left" ? -distance : distance;
          gsap.fromTo(
            containerRef.current,
            {
              opacity: 0,
              x: xOffset,
            },
            {
              opacity: 1,
              x: 0,
              duration,
              delay,
              ease: "power2.out",
              scrollTrigger: scrollTriggerConfig,
            }
          );
          return;
        }

        // Default: fade-up / fade-down
        const yOffset = variant === "fade-down" ? -distance : distance;
        gsap.fromTo(
          containerRef.current,
          {
            opacity: 0,
            y: yOffset,
          },
          {
            opacity: 1,
            y: 0,
            duration,
            delay,
            ease: "power2.out",
            scrollTrigger: scrollTriggerConfig,
          }
        );
      } catch {
        // Fallback safety: ensure content remains visible if animation initialization fails
        if (containerRef.current) {
          containerRef.current.style.opacity = "1";
        }
      }
    },
    {
      scope: containerRef,
      dependencies: [
        variant,
        direction,
        selector,
        stagger,
        delay,
        duration,
        distance,
        threshold,
        toggleActions,
      ],
    }
  );

  return (
    <Component
      ref={containerRef as React.Ref<never>}
      data-reveal={variant}
      className={cn("will-change-[opacity,transform]", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
