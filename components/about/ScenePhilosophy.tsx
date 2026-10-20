"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { gsap, useGSAP } from "@/lib/gsap";

interface PhilosophyPhase {
  phrase: string;
  sublabel: string;
  imageSrc: string;
  imageAlt: string;
  imageCaption: string;
  badge: string;
}

const PHASES: PhilosophyPhase[] = [
  {
    phrase: "Thoughtful spaces.",
    sublabel: "01 // FUNCTIONAL FOUNDATIONS",
    imageSrc: "/images/projects/sheikh-nawaz-bungalow/ground-floor-plan.png",
    imageAlt: "Ground floor architectural CAD linework and spatial zoning",
    imageCaption: "Primary level organizing formal reception, daily living, and courtyard connectivity.",
    badge: "CAD BLUEPRINT // SPATIAL MATRIX",
  },
  {
    phrase: "Purposeful design.",
    sublabel: "02 // VOLUMETRIC HARMONY",
    imageSrc: "/images/projects/sheikh-nawaz-bungalow/exterior-perspective.jpg",
    imageAlt: "Neoclassical exterior massing and perimeter boundary architecture",
    imageCaption: "Aerial perspective highlighting volumetric balance, rooflines, and neoclassical portico.",
    badge: "MASSING & PROPORTION // EXTERIOR",
  },
  {
    phrase: "Lasting experiences.",
    sublabel: "03 // LIGHT & ATMOSPHERE",
    imageSrc: "/images/projects/sheikh-nawaz-bungalow/courtyard-pool.jpg",
    imageAlt: "Private pool deck and pergola garden courtyard",
    imageCaption: "Private 15' x 25' swimming pool flanked by timber decking and pergola terrace.",
    badge: "MATERIALITY // TACTILE RETREAT",
  },
];

export function ScenePhilosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!pinSectionRef.current || !containerRef.current) return;

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // On reduced motion or small mobile screens, keep simple unpinned layout
      const isMobile = window.innerWidth < 768;

      if (prefersReducedMotion || isMobile) {
        gsap.set(".philosophy-phrase", { opacity: 1, y: 0 });
        gsap.set(".philosophy-image-layer", { opacity: 1 });
        return;
      }

      // Initial state: first phrase and first image visible
      gsap.set(".philosophy-phrase", { opacity: 0.25, y: 10 });
      gsap.set(".philosophy-phrase-0", { opacity: 1, y: 0 });

      gsap.set(".philosophy-image-layer", { opacity: 0, scale: 1.05 });
      gsap.set(".philosophy-image-layer-0", { opacity: 1, scale: 1 });

      // Pinned scrub timeline
      const pinTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: pinSectionRef.current,
          start: "top top",
          end: "+=220%",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // Phase 1 to Phase 2 transition
      pinTimeline
        .to(
          progressLineRef.current,
          { height: "50%", ease: "none", duration: 1 },
          "phase-1"
        )
        .to(
          ".philosophy-phrase-0",
          { opacity: 0.25, y: -10, duration: 0.5 },
          "phase-1"
        )
        .to(
          ".philosophy-phrase-1",
          { opacity: 1, y: 0, duration: 0.5 },
          "phase-1+=0.2"
        )
        .to(
          ".philosophy-image-layer-0",
          { opacity: 0, scale: 0.98, duration: 0.6 },
          "phase-1"
        )
        .to(
          ".philosophy-image-layer-1",
          { opacity: 1, scale: 1, duration: 0.6 },
          "phase-1+=0.1"
        )

        // Phase 2 to Phase 3 transition
        .to(
          progressLineRef.current,
          { height: "100%", ease: "none", duration: 1 },
          "phase-2"
        )
        .to(
          ".philosophy-phrase-1",
          { opacity: 0.25, y: -10, duration: 0.5 },
          "phase-2"
        )
        .to(
          ".philosophy-phrase-2",
          { opacity: 1, y: 0, duration: 0.5 },
          "phase-2+=0.2"
        )
        .to(
          ".philosophy-image-layer-1",
          { opacity: 0, scale: 0.98, duration: 0.6 },
          "phase-2"
        )
        .to(
          ".philosophy-image-layer-2",
          { opacity: 1, scale: 1, duration: 0.6 },
          "phase-2+=0.1"
        )

        // Supporting paragraph reveal & settle
        .fromTo(
          ".philosophy-supporting-p",
          { opacity: 0.4 },
          { opacity: 1, duration: 0.5 },
          "phase-2+=0.3"
        );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative bg-canvas border-b border-border"
      aria-label="Architectural Philosophy Storyboard"
    >
      {/* Pinned Viewport Container */}
      <section
        ref={pinSectionRef}
        className="min-h-screen w-full flex flex-col justify-center py-16 sm:py-24 relative overflow-hidden bg-canvas"
      >
        <Container>
          {/* Section Eyebrow & Index Label */}
          <div className="flex items-center justify-between border-b border-border pb-4 mb-10 sm:mb-14">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                CORE PHILOSOPHY
              </span>
            </div>
            <span className="text-[11px] font-mono text-text-tertiary tracking-widest uppercase">
              SCENE 02 // NARRATIVE ARC
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left Column (6 cols): Philosophy Headlines & Progress Track */}
            <div className="lg:col-span-6 relative">
              {/* Vertical Gold Progress Line (Desktop) */}
              <div
                className="absolute -left-6 sm:-left-8 top-2 bottom-2 w-0.5 bg-border hidden sm:block"
                aria-hidden="true"
              >
                <div
                  ref={progressLineRef}
                  className="w-full bg-accent transition-all duration-100 h-[20%]"
                />
              </div>

              {/* Sequential Philosophy Phrases */}
              <div className="space-y-6 sm:space-y-8">
                {PHASES.map((phase, idx) => (
                  <div
                    key={phase.phrase}
                    className={`philosophy-phrase philosophy-phrase-${idx} transition-all duration-300`}
                  >
                    <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-accent block mb-2 font-medium">
                      {phase.sublabel}
                    </span>
                    <h3 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl tracking-tight text-text-primary leading-[1.12]">
                      {phase.phrase}
                    </h3>
                  </div>
                ))}
              </div>

              {/* Supporting Philosophical Paragraph */}
              <div className="philosophy-supporting-p mt-10 sm:mt-12 pt-8 border-t border-border/80">
                <p className="text-sm sm:text-base leading-relaxed text-text-secondary font-sans font-light max-w-xl">
                  Architecture begins with understanding how people live. Through
                  functional planning, balanced proportions, natural light, and
                  carefully selected materials, each space should serve a clear
                  purpose while creating an atmosphere that feels comfortable,
                  coherent, and enduring.
                </p>
              </div>
            </div>

            {/* Right Column (6 cols): Cross-Fading Architectural Visual Stage */}
            <div className="lg:col-span-6">
              <div className="card-architectural relative aspect-[16/11] w-full overflow-hidden bg-surface border border-border p-3 sm:p-4 rounded-sm shadow-2xl">
                {/* Drafting Corner Crosshairs */}
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

                {/* Layered Image Stack */}
                <div className="relative h-full w-full overflow-hidden rounded-xs bg-surface-raised">
                  {PHASES.map((phase, idx) => (
                    <div
                      key={phase.imageSrc}
                      className={`philosophy-image-layer philosophy-image-layer-${idx} absolute inset-0 transition-opacity duration-500`}
                    >
                      <Image
                        src={phase.imageSrc}
                        alt={phase.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 640px"
                        className="object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-transparent to-transparent opacity-60" />

                      {/* Phase Badge */}
                      <div className="absolute top-3 right-3 z-10">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-text-primary bg-canvas/80 backdrop-blur-xs px-2.5 py-1 rounded-xs border border-border">
                          {phase.badge}
                        </span>
                      </div>

                      {/* Caption */}
                      <div className="absolute bottom-3 left-3 right-3 z-10">
                        <p className="text-[11px] font-sans text-text-primary/90 bg-canvas/75 backdrop-blur-xs p-2 rounded-xs border border-border/70 line-clamp-2">
                          {phase.imageCaption}
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
    </div>
  );
}
