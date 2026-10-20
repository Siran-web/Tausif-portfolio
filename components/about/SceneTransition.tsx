"use client";

import React, { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { gsap, useGSAP } from "@/lib/gsap";

export function SceneTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !contentRef.current) return;

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.set(contentRef.current, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  const handleScrollToWork = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const workSection = document.getElementById("work");
    if (workSection) {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const headerOffset = 80;
      const elementPosition = workSection.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
      window.history.pushState(null, "", "#work");
    }
  };

  return (
    <section
      ref={containerRef}
      className="py-24 sm:py-32 lg:py-40 bg-surface relative overflow-hidden border-b border-border text-center"
      aria-label="Scene 05: Transition to Selected Projects"
    >
      {/* Background Architectural Drafting Linework */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 select-none flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="w-[600px] h-[600px] rounded-full border border-dashed border-accent/40 animate-spin-slow" />
      </div>

      <Container className="relative z-10">
        <div ref={contentRef} className="max-w-3xl mx-auto space-y-8">
          {/* Eyebrow Label */}
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-accent" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">
              SELECTED PORTFOLIO
            </span>
            <span className="h-px w-8 bg-accent" />
          </div>

          {/* Headline */}
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-text-primary tracking-tight leading-[1.12]">
            Every space begins with an idea.
          </h2>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-text-secondary font-sans font-light max-w-xl mx-auto leading-relaxed">
            Explore the architectural projects, planning studies, and interior
            design work behind this approach.
          </p>

          {/* Call to Action Button */}
          <div className="pt-4 flex justify-center">
            <Button
              href="#work"
              onClick={handleScrollToWork}
              variant="primary"
              size="lg"
              className="group uppercase tracking-widest text-xs px-8 py-4 font-bold shadow-xl transition-all duration-300 hover:shadow-accent/10 hover:scale-105"
            >
              <span>Explore My Work</span>
              <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">
                &rarr;
              </span>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
