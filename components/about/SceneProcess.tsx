"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { gsap, useGSAP } from "@/lib/gsap";

interface ProcessStage {
  step: string;
  title: string;
  description: string;
  deliverable: string;
  imageSrc: string;
  imageAlt: string;
  caption: string;
}

const STAGES: ProcessStage[] = [
  {
    step: "01",
    title: "Plan",
    description:
      "Understand the site, requirements, functional zones, and circulation.",
    deliverable: "Site Matrix & Program Zoning",
    imageSrc: "/images/projects/sheikh-nawaz-bungalow/ground-floor-plan.png",
    imageAlt: "Ground floor architectural CAD linework and circulation zoning",
    caption: "Technical ground floor plan extracted from CIVI ARCHER DESIGNS verified CAD drawing.",
  },
  {
    step: "02",
    title: "Explore",
    description:
      "Investigate spatial arrangements, proportions, natural light, and materials.",
    deliverable: "Spatial Proportions & Volumetric Voids",
    imageSrc: "/images/projects/sheikh-nawaz-bungalow/first-floor-plan.png",
    imageAlt: "Upper level spatial arrangement and bedroom suites layout",
    caption: "First floor plan exploring courtyard void ventilation and private residential sectors.",
  },
  {
    step: "03",
    title: "Develop",
    description:
      "Refine floor plans, architectural drawings, spatial relationships, and details.",
    deliverable: "Detailed Architectural Linework & Massing",
    imageSrc: "/images/projects/sheikh-nawaz-bungalow/exterior-perspective.jpg",
    imageAlt: "Aerial exterior perspective showing rooflines and perimeter walls",
    caption: "Volumetric exterior study coordinating boundary walls, gated portico, and landscape frontage.",
  },
  {
    step: "04",
    title: "Realise",
    description:
      "Present the resulting design using the actual project drawings, photographs, or visualisations available.",
    deliverable: "Final Design Visualization & Documentation",
    imageSrc: "/images/projects/sheikh-nawaz-bungalow/exterior-front.jpg",
    imageAlt: "Front elevation rendering of neoclassical bungalow with portico",
    caption: "Front facade visualization demonstrating realized portico symmetry and neoclassical detailing.",
  },
];

export function SceneProcess() {
  const [activeStage, setActiveStage] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const stageListRef = useRef<HTMLDivElement>(null);

  const currentStage: ProcessStage = STAGES[activeStage] ?? STAGES[0]!;

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) return;

      // Scroll-triggered progress tracker across stages
      const stages = containerRef.current.querySelectorAll(".process-stage-trigger");
      stages.forEach((trigger, idx) => {
        gsap.timeline({
          scrollTrigger: {
            trigger,
            start: "top 60%",
            end: "bottom 60%",
            onEnter: () => setActiveStage(idx),
            onEnterBack: () => setActiveStage(idx),
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="py-20 sm:py-28 lg:py-36 border-b border-border bg-canvas relative overflow-hidden"
      aria-label="Scene 04: The Design Process"
    >
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-6 bg-accent" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">
                METHODOLOGY
              </span>
              <span className="text-border select-none">&bull;</span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-text-tertiary">
                SCENE 04 // DEVELOPMENT
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-text-primary tracking-tight">
              The Design Process
            </h2>
          </div>

          {/* Thin Progress Indicator */}
          <div className="flex items-center gap-3 font-mono text-xs text-text-tertiary">
            <span className="text-accent font-bold">
              STAGE {currentStage.step}
            </span>
            <span>/</span>
            <span>STAGE 04</span>
            <div className="w-24 sm:w-32 h-1 bg-surface-raised rounded-full overflow-hidden ml-2">
              <div
                className="h-full bg-accent transition-all duration-300 ease-out"
                style={{ width: `${((activeStage + 1) / STAGES.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Coordinated Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Interactive Stages List */}
          <div ref={stageListRef} className="lg:col-span-5 space-y-4">
            {STAGES.map((stage, idx) => {
              const isActive = activeStage === idx;
              return (
                <div
                  key={stage.step}
                  onClick={() => setActiveStage(idx)}
                  className={`process-stage-trigger cursor-pointer card-architectural p-6 rounded-sm transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    isActive
                      ? "border-accent bg-surface-raised shadow-lg translate-x-2"
                      : "border-border bg-surface hover:border-text-tertiary hover:bg-surface-raised/60"
                  }`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveStage(idx);
                    }
                  }}
                  aria-pressed={isActive}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`font-display text-2xl font-normal transition-colors ${
                        isActive ? "text-accent" : "text-text-tertiary"
                      }`}
                    >
                      {stage.step}.
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-text-tertiary">
                      {stage.deliverable}
                    </span>
                  </div>

                  <h3
                    className={`font-display text-xl sm:text-2xl mb-2 transition-colors ${
                      isActive ? "text-text-primary" : "text-text-secondary"
                    }`}
                  >
                    {stage.title}
                  </h3>

                  <p className="text-xs sm:text-sm leading-relaxed text-text-secondary font-sans font-light">
                    {stage.description}
                  </p>

                  {/* Active Indicator Line */}
                  {isActive && (
                    <div className="mt-4 pt-3 border-t border-accent/30 flex items-center justify-between text-[10px] font-mono text-accent">
                      <span className="uppercase tracking-widest font-semibold">
                        ACTIVE SEQUENCE
                      </span>
                      <span>&rarr;</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Architectural Visual Display */}
          <div className="lg:col-span-7 lg:sticky lg:top-28">
            <div className="card-architectural relative aspect-[16/11] w-full overflow-hidden bg-surface border border-border p-3 sm:p-4 rounded-sm shadow-2xl">
              {/* Corner crosshairs */}
              <span className="absolute top-2 left-2 text-[10px] font-mono text-accent select-none pointer-events-none z-20">
                +
              </span>
              <span className="absolute top-2 right-2 text-[10px] font-mono text-accent select-none pointer-events-none z-20">
                +
              </span>
              <span className="absolute bottom-2 left-2 text-[10px] font-mono text-accent select-none pointer-events-none z-20">
                +
              </span>
              <span className="absolute bottom-2 right-2 text-[10px] font-mono text-accent select-none pointer-events-none z-20">
                +
              </span>

              {/* Crossfading Display Canvas */}
              <div className="relative h-full w-full overflow-hidden rounded-xs bg-surface-raised">
                {STAGES.map((stage, idx) => (
                  <div
                    key={stage.step}
                    className={`absolute inset-0 transition-all duration-500 ease-out ${
                      activeStage === idx
                        ? "opacity-100 scale-100 z-10 pointer-events-auto"
                        : "opacity-0 scale-105 z-0 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={stage.imageSrc}
                      alt={stage.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 700px"
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60" />

                    {/* Top Overlay Badge */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-text-primary bg-canvas/80 backdrop-blur-xs px-2.5 py-1 rounded-xs border border-border">
                        STAGE {stage.step} &bull; {stage.title}
                      </span>
                      <span className="text-[10px] font-mono text-accent bg-canvas/80 backdrop-blur-xs px-2 py-0.5 rounded-xs border border-border">
                        VERIFIED SPEC
                      </span>
                    </div>

                    {/* Bottom Technical Caption */}
                    <div className="absolute bottom-3 left-3 right-3 z-10">
                      <p className="text-xs font-sans text-text-primary/90 bg-canvas/85 backdrop-blur-xs p-2.5 rounded-xs border border-border/80">
                        {stage.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
