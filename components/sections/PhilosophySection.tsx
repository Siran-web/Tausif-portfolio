"use client";

import React, { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { gsap, useGSAP } from "@/lib/gsap";
import { aboutContent } from "@/data/about";

export function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.set([statementRef.current, dividerRef.current, copyRef.current], {
          opacity: 1,
          y: 0,
          scaleX: 1,
          clearProps: "all",
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // 1. Philosophy statement progressive fade and lift
      tl.fromTo(
        statementRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }
      );

      // 2. Subtle gold divider line expanding across
      if (dividerRef.current) {
        tl.fromTo(
          dividerRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 0.8, ease: "power2.inOut" },
          "-=0.5"
        );
      }

      // 3. Supporting copy fade-in
      tl.fromTo(
        copyRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="scroll-mt-20 py-20 sm:py-28 lg:py-32 border-b border-border bg-surface-raised/40 relative overflow-hidden"
      aria-label="Design Philosophy"
    >
      {/* Background architectural watermark */}
      <div
        className="absolute top-1/2 -right-10 -translate-y-1/2 font-display text-[140px] sm:text-[220px] lg:text-[260px] text-text-primary/5 select-none pointer-events-none leading-none tracking-tighter"
        aria-hidden="true"
      >
        PHILOSOPHY
      </div>

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent font-semibold">
              {aboutContent.philosophy.eyebrow || "DESIGN PHILOSOPHY"}
            </span>
          </div>

          {/* Large Editorial Philosophy Statement */}
          <h2
            ref={statementRef}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-text-primary leading-[1.18]"
          >
            &ldquo;{aboutContent.philosophy.statement}&rdquo;
          </h2>

          {/* Subtle Architectural Gold Divider */}
          <div
            ref={dividerRef}
            className="h-px w-24 sm:w-36 bg-accent/80 transition-all"
            aria-hidden="true"
          />

          {/* Supporting Narrative Copy */}
          <p
            ref={copyRef}
            className="text-base sm:text-lg leading-relaxed text-text-secondary font-sans font-light max-w-3xl"
          >
            {aboutContent.philosophy.supportingCopy}
          </p>
        </div>
      </Container>
    </section>
  );
}
