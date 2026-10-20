"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { gsap, useGSAP } from "@/lib/gsap";

export function SceneIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.set(
          [
            headlineRef.current?.querySelectorAll(".line-reveal-inner"),
            paragraphRef.current,
            badgeRef.current,
            imageWrapperRef.current,
            imageRef.current,
          ],
          {
            opacity: 1,
            y: 0,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            clearProps: "all",
          }
        );
        return;
      }

      // Master intro timeline triggered on scroll entry
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // 1. Gold eyebrow line & label reveal
      tl.fromTo(
        ".intro-eyebrow",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
      );

      // 2. Headline masked line-by-line reveal
      const lines = headlineRef.current?.querySelectorAll(".line-reveal-inner");
      if (lines && lines.length > 0) {
        tl.fromTo(
          lines,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.3"
        );
      }

      // 3. Supporting paragraph & badges upward fade
      tl.fromTo(
        [paragraphRef.current, badgeRef.current],
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.5"
      );

      // 4. Architectural image clip-path curtain wipe & scale settle
      if (imageWrapperRef.current) {
        tl.fromTo(
          imageWrapperRef.current,
          { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 1.1,
            ease: "power3.inOut",
          },
          "-=0.8"
        );
      }

      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          { scale: 1.12 },
          { scale: 1.0, duration: 1.3, ease: "power2.out" },
          "-=1.1"
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] flex flex-col justify-center py-20 sm:py-28 lg:py-36 border-b border-border bg-canvas overflow-hidden"
      aria-label="Introduction: The Architect's Perspective"
    >
      {/* Subtle Architectural Grid Lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25 select-none"
        aria-hidden="true"
      >
        <div className="h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-4 md:grid-cols-12 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="border-r border-border/40 h-full hidden md:block"
            />
          ))}
        </div>
      </div>

      <Container className="relative z-10">
        {/* Eyebrow Label */}
        <div className="intro-eyebrow flex items-center gap-3 mb-6 sm:mb-8">
          <span className="h-px w-8 bg-accent" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">
            ABOUT THE ARCHITECT
          </span>
          <span className="text-border select-none">&bull;</span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-text-tertiary">
            SCENE 01 // PERSPECTIVE
          </span>
        </div>

        {/* Editorial Headline with Text-Mask Animation */}
        <div className="mb-12 sm:mb-16">
          <h2
            ref={headlineRef}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-text-primary leading-[1.08] max-w-5xl"
          >
            <span className="block overflow-hidden py-1">
              <span className="line-reveal-inner block">
                Designing spaces with clarity,
              </span>
            </span>
            <span className="block overflow-hidden py-1">
              <span className="line-reveal-inner block text-accent italic">
                purpose, and character.
              </span>
            </span>
          </h2>
        </div>

        {/* Two-Column Asymmetrical Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Narrative Paragraph & Credentials */}
          <div className="lg:col-span-7 space-y-8">
            <p
              ref={paragraphRef}
              className="text-base sm:text-lg lg:text-xl leading-relaxed text-text-secondary font-sans font-light max-w-2xl"
            >
              I&apos;m Tausif Raza, an architect focused on architectural planning
              and interior design. My approach brings together functional
              layouts, thoughtful proportions, natural light, and material
              selection to create meaningful spaces.
            </p>

            {/* Architectural Studio Specification Badges */}
            <div
              ref={badgeRef}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border font-sans"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-text-tertiary block">
                  Core Discipline
                </span>
                <span className="text-xs font-semibold text-text-primary block">
                  Architectural Planning
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-text-tertiary block">
                  Interior Focus
                </span>
                <span className="text-xs font-semibold text-text-primary block">
                  Spatial Zoning &amp; Proportions
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-text-tertiary block">
                  Design Studio
                </span>
                <span className="text-xs font-semibold text-accent block">
                  CIVI ARCHER DESIGNS
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Authentic Architectural Portrait Visual */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div
              ref={imageWrapperRef}
              className="card-architectural relative w-full max-w-md overflow-hidden bg-surface border border-border p-3 sm:p-4 rounded-sm shadow-2xl"
            >
              {/* Drafting Crosshairs */}
              <span className="absolute top-2 left-2 text-[10px] font-mono text-accent select-none pointer-events-none">
                +
              </span>
              <span className="absolute top-2 right-2 text-[10px] font-mono text-accent select-none pointer-events-none">
                +
              </span>
              <span className="absolute bottom-2 left-2 text-[10px] font-mono text-accent select-none pointer-events-none">
                +
              </span>
              <span className="absolute bottom-2 right-2 text-[10px] font-mono text-accent select-none pointer-events-none">
                +
              </span>

              {/* Masked Portrait Container */}
              <div
                ref={imageRef}
                className="relative aspect-[4/5] w-full overflow-hidden rounded-xs bg-surface-raised"
              >
                <Image
                  src="/images/architect-portrait.jpg"
                  alt="Ar. Tausif Raza — Architectural Planning & Interior Design"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover object-center filter grayscale contrast-[1.08] hover:grayscale-0 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-50" />
              </div>

              {/* Technical Caption Strip */}
              <div className="mt-3 pt-2.5 border-t border-border flex items-center justify-between text-xs font-sans">
                <span className="text-[11px] font-semibold text-text-primary tracking-wider uppercase">
                  Ar. Tausif Raza
                </span>
                <span className="text-[10px] font-mono text-accent uppercase tracking-widest">
                  PORTRAIT // ATELIER
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
