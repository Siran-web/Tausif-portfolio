"use client";

import React, { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { gsap, useGSAP } from "@/lib/gsap";
import type { MilestoneItem } from "@/data/about";

export interface AboutTimelineProps {
  milestones?: MilestoneItem[];
}

export function AboutTimeline({ milestones }: AboutTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !milestones || milestones.length === 0) return;

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.set(".timeline-milestone-item", { opacity: 1, y: 0, clearProps: "all" });
        return;
      }

      gsap.fromTo(
        ".timeline-milestone-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef, dependencies: [milestones] }
  );

  // Strictly omit the entire timeline when no verified milestone data is available
  if (!milestones || milestones.length === 0) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="py-16 sm:py-24 border-t border-border bg-surface/30 relative"
      aria-label="Professional Milestones & Timeline"
    >
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border pb-4 mb-10">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent font-medium">
              MILESTONES // CHRONOLOGY
            </span>
            <span className="text-xs font-mono text-text-tertiary">
              VERIFIED RECORD
            </span>
          </div>

          {/* Timeline Entries */}
          <div className="relative pl-6 sm:pl-8 border-l border-border/80 space-y-10">
            {milestones.map((item, idx) => (
              <div
                key={`${item.year}-${idx}`}
                className="timeline-milestone-item relative group"
              >
                {/* Node dot on timeline line */}
                <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-3 w-3 rounded-full border-2 border-canvas bg-accent transition-transform group-hover:scale-125" />

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 mb-2">
                  <h4 className="font-display text-xl sm:text-2xl text-text-primary group-hover:text-accent transition-colors">
                    {item.title}
                  </h4>
                  <span className="text-xs font-mono text-accent font-semibold tracking-wider">
                    {item.year}
                  </span>
                </div>

                {item.organization && (
                  <p className="text-xs font-sans font-medium uppercase tracking-wider text-text-tertiary mb-2">
                    {item.organization}
                  </p>
                )}

                {item.description && (
                  <p className="text-sm font-sans font-light text-text-secondary leading-relaxed max-w-2xl">
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
