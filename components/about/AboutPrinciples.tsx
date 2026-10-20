"use client";

import React, { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { gsap, useGSAP } from "@/lib/gsap";
import type { AboutContent } from "@/data/about";

export interface AboutPrinciplesProps {
  data: AboutContent;
}

export function AboutPrinciples({ data }: AboutPrinciplesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.set(".principle-item", { opacity: 1, y: 0, clearProps: "all" });
        return;
      }

      gsap.fromTo(
        ".principle-item",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="py-16 sm:py-24 lg:py-28"
      aria-label="Design Principles"
    >
      <Container>
        {/* Section Heading Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-6 bg-accent" />
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent font-medium">
                {data.principles.eyebrow || "CORE TENETS"}
              </span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-text-primary tracking-tight">
              {data.principles.title}
            </h3>
          </div>
          <p className="text-xs sm:text-sm font-sans text-text-secondary max-w-sm font-light">
            Guiding disciplines that shape structural clarity, spatial comfort, and architectural longevity.
          </p>
        </div>

        {/* 4-Column Clean Grid on Desktop / 2-Column on Tablet / Stacked on Mobile (No heavy cards or oversized icons) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {data.principles.items.map((principle) => (
            <div
              key={principle.number}
              className="principle-item flex flex-col justify-between pt-4 border-t border-border/80 group transition-colors hover:border-accent"
            >
              <div>
                {/* Number & Accent Marker */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display text-2xl sm:text-3xl text-accent font-normal tracking-tight">
                    {principle.number}
                  </span>
                  <span className="text-xs font-mono text-text-tertiary select-none group-hover:text-accent transition-colors">
                    +
                  </span>
                </div>

                {/* Principle Title */}
                <h4 className="font-display text-xl sm:text-2xl text-text-primary mb-3 group-hover:text-accent transition-colors duration-200">
                  {principle.title}
                </h4>

                {/* Principle Description */}
                <p className="text-sm leading-relaxed text-text-secondary font-sans font-light">
                  {principle.description}
                </p>
              </div>

              {/* Subtle Bottom Accent Indicator */}
              <div className="mt-6 pt-2">
                <span className="h-0.5 w-6 bg-border group-hover:w-12 group-hover:bg-accent block transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
