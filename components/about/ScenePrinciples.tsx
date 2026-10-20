"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { gsap, useGSAP } from "@/lib/gsap";

interface PrincipleItem {
  number: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  discipline: string;
}

const PRINCIPLES: PrincipleItem[] = [
  {
    number: "01",
    title: "Functional Planning",
    description:
      "Spaces should respond to their purpose and the people who use them.",
    imageSrc: "/images/projects/sheikh-nawaz-bungalow/ground-floor-plan.png",
    imageAlt: "Ground floor architectural CAD plan and functional layout",
    discipline: "SPATIAL CHOREOGRAPHY",
  },
  {
    number: "02",
    title: "Light and Space",
    description:
      "Natural light and thoughtful spatial relationships shape how a place feels.",
    imageSrc: "/images/projects/sheikh-nawaz-bungalow/courtyard-pool.jpg",
    imageAlt: "Courtyard pool and pergola garden illuminated with natural daylight",
    discipline: "DAYLIGHT ORIENTATION",
  },
  {
    number: "03",
    title: "Materiality",
    description:
      "Materials, textures, and details bring depth and character to a space.",
    imageSrc: "/images/projects/sheikh-nawaz-bungalow/exterior-front.jpg",
    imageAlt: "Classical fluted columns and textured masonry construction",
    discipline: "TACTILE RIGOR",
  },
  {
    number: "04",
    title: "Human-Centred Design",
    description:
      "Every design decision should contribute to comfort, usability, and everyday experience.",
    imageSrc: "/images/projects/sheikh-nawaz-bungalow/first-floor-plan.png",
    imageAlt: "Upper level private residential rooms and home cinema layout",
    discipline: "ERGONOMIC HARMONY",
  },
];

export function ScenePrinciples() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.set(".principle-card", {
          opacity: 1,
          y: 0,
          clearProps: "all",
        });
        return;
      }

      // Staggered reveals for design principles
      gsap.fromTo(
        ".principle-card",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="py-20 sm:py-28 lg:py-36 border-b border-border bg-canvas relative overflow-hidden"
      aria-label="Scene 03: Core Design Principles"
    >
      <Container>
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-6 bg-accent" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">
                CORE TENETS
              </span>
              <span className="text-border select-none">&bull;</span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-text-tertiary">
                SCENE 03 // DISCIPLINE
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-text-primary tracking-tight">
              Design Principles
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-text-secondary max-w-md leading-relaxed">
            Four fundamental pillars guiding architectural planning, structural
            discipline, and interior environments.
          </p>
        </div>

        {/* 2x2 Architectural Cards Grid on Desktop / Vertical Stack on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PRINCIPLES.map((principle) => (
            <article
              key={principle.number}
              className="principle-card card-architectural group relative flex flex-col justify-between overflow-hidden bg-surface border border-border p-6 sm:p-8 rounded-sm transition-all duration-300 hover:border-accent hover:shadow-2xl"
            >
              {/* Corner crosshairs */}
              <span className="absolute top-2.5 left-2.5 text-[10px] font-mono text-accent select-none pointer-events-none">
                +
              </span>
              <span className="absolute top-2.5 right-2.5 text-[10px] font-mono text-accent select-none pointer-events-none">
                +
              </span>

              <div>
                {/* Header: Number & Discipline Tag */}
                <div className="flex items-baseline justify-between border-b border-border pb-4 mb-6">
                  <span className="font-display text-3xl sm:text-4xl text-accent font-normal tracking-tight group-hover:scale-105 transition-transform duration-300 inline-block">
                    {principle.number}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-text-tertiary group-hover:text-accent transition-colors">
                    {principle.discipline}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="font-display text-2xl sm:text-3xl text-text-primary mb-3 group-hover:text-accent transition-colors duration-200">
                  {principle.title}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-text-secondary font-sans font-light mb-8">
                  &ldquo;{principle.description}&rdquo;
                </p>
              </div>

              {/* Visual Preview Thumbnail with Masked Hover Settle */}
              <div className="pt-4 border-t border-border">
                <div className="relative aspect-[16/8] w-full overflow-hidden rounded-xs bg-surface-raised border border-border/80">
                  <Image
                    src={principle.imageSrc}
                    alt={principle.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover object-center filter grayscale contrast-[1.05] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-canvas/30 group-hover:opacity-0 transition-opacity duration-300" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
