"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { portfolioData } from "@/data/portfolio";
import { gsap, useGSAP } from "@/lib/gsap";
import { TextReveal } from "@/components/animations";

export interface HeroProps {
  name?: string;
  role?: string;
  designPhilosophy?: string;
  portraitImage?: string;
  studio?: string;
  speciality?: string;
}

export function Hero({
  name = portfolioData.personal.name,
  role = portfolioData.personal.role,
  designPhilosophy = portfolioData.personal.designPhilosophy,
  portraitImage = portfolioData.personal.portraitImage,
  studio = portfolioData.personal.location,
  speciality = portfolioData.personal.speciality,
}: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!heroRef.current) return;

      // Check for user's reduced-motion preference
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        // Reduced-motion mode displays the complete hero immediately without animation
        gsap.set(
          [
            ".hero-bg-motif",
            ".hero-eyebrow",
            ".hero-headline",
            ".hero-role",
            ".hero-philosophy",
            ".hero-ctas",
            ".hero-specs",
            ".hero-portrait-frame",
            ".hero-portrait-mask",
            ".hero-portrait-caption",
            ".hero-scroll-indicator",
          ],
          {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            clipPath: "none",
            clearProps: "all",
          }
        );
        return;
      }

      // Coordinated master entrance timeline
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      tl
        // 1. Reveal architectural background grid motif
        .fromTo(
          ".hero-bg-motif",
          { opacity: 0 },
          { opacity: 0.35, duration: 1.0, ease: "power2.out" }
        )
        // 2. Eyebrow badge entrance
        .fromTo(
          ".hero-eyebrow",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.7"
        )
        // 3. Main headline entrance
        .fromTo(
          ".hero-headline",
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power4.out" },
          "-=0.5"
        )
        // 4. Coordinated portrait frame & clip-path reveal
        .fromTo(
          ".hero-portrait-frame",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8 },
          "<0.1"
        )
        .fromTo(
          ".hero-portrait-mask",
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power3.inOut" },
          "<"
        )
        .fromTo(
          ".hero-portrait-img",
          { scale: 1.08 },
          { scale: 1, duration: 1.3, ease: "power2.out" },
          "<"
        )
        // 5. Professional role title & Design philosophy quote
        .fromTo(
          ".hero-role",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.8"
        )
        .fromTo(
          ".hero-philosophy",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        // 6. Action CTAs & Portrait caption bar
        .fromTo(
          ".hero-ctas",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.4"
        )
        .fromTo(
          ".hero-portrait-caption",
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "<"
        )
        // 7. Architect coordinates specs & Scroll indicator
        .fromTo(
          ".hero-specs",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        )
        .fromTo(
          ".hero-scroll-indicator",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.2"
        );
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Introduction & Overview"
      className="relative overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20 border-b border-border bg-canvas"
    >
      {/* Architectural Background Grid & Datum Motif */}
      <div
        className="hero-bg-motif absolute inset-0 pointer-events-none opacity-35 will-change-transform"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(52, 53, 47, 0.45) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(52, 53, 47, 0.45) 1px, transparent 1px)`,
            backgroundSize: "6rem 6rem",
          }}
        />
        <div className="absolute top-28 left-8 text-xs font-mono text-text-tertiary select-none">
          + 47.3769° N
        </div>
        <div className="absolute top-28 right-8 text-xs font-mono text-text-tertiary select-none hidden sm:block">
          DATUM // 01
        </div>
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14 items-center">
          {/* Left Column: Editorial Typography & CTAs (7 cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="hero-eyebrow">
              <Eyebrow variant="line" className="mb-4">
                Architecture &bull; Spatial Systems
              </Eyebrow>
            </div>

            <div className="hero-headline">
              <TextReveal
                text={name}
                as="h1"
                triggerOnScroll={false}
                duration={0.9}
                stagger={0.08}
                delay={0.25}
                className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-text-primary leading-[1.0] select-text"
              />
            </div>

            <div className="hero-role">
              <p className="mt-3 font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-accent">
                {role}
              </p>
            </div>

            <div className="hero-philosophy">
              <div className="mt-6 border-l-2 border-accent/60 pl-4 sm:pl-6 max-w-2xl">
                <p className="font-sans text-sm sm:text-base leading-relaxed text-text-primary/90 font-medium italic">
                  &ldquo;{designPhilosophy}&rdquo;
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="hero-ctas mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
              <Button
                href="#work"
                variant="primary"
                size="lg"
                className="uppercase tracking-widest text-xs px-7"
              >
                Explore My Work &rarr;
              </Button>
              <Button
                href="#about"
                variant="outline"
                size="lg"
                className="uppercase tracking-widest text-xs px-7"
              >
                About Me
              </Button>
            </div>

            {/* Bottom Information Bar */}
            <div className="hero-specs mt-10 sm:mt-12 flex flex-col sm:flex-row sm:items-center gap-y-2.5 gap-x-8 sm:gap-x-12 border-t border-border pt-4 text-xs font-sans text-text-secondary">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-text-primary uppercase tracking-wider">
                  STUDIO:
                </span>
                <span className="tracking-wide">
                  {studio}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-text-primary uppercase tracking-wider">
                  SPECIALITY:
                </span>
                <span className="tracking-wide">
                  {speciality}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Portrait in Architectural Frame (5 cols on desktop) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="hero-portrait-frame relative w-full max-w-md lg:max-w-none">
              {/* Architectural Matting & Frame */}
              <div className="card-architectural relative overflow-hidden bg-surface p-3 sm:p-4 border border-border shadow-2xl">
                {/* Decorative Architectural Corner Crosshairs in Antique Brass */}
                <span
                  className="absolute top-2 left-2 text-[10px] font-mono text-accent select-none"
                  aria-hidden="true"
                >
                  +
                </span>
                <span
                  className="absolute top-2 right-2 text-[10px] font-mono text-accent select-none"
                  aria-hidden="true"
                >
                  +
                </span>
                <span
                  className="absolute bottom-10 left-2 text-[10px] font-mono text-accent select-none"
                  aria-hidden="true"
                >
                  +
                </span>
                <span
                  className="absolute bottom-10 right-2 text-[10px] font-mono text-accent select-none"
                  aria-hidden="true"
                >
                  +
                </span>

                {/* Image Container with GSAP clip-path reveal mask */}
                <div className="hero-portrait-mask relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] w-full overflow-hidden rounded-sm bg-surface-raised border border-border/80 will-change-[clip-path]">
                  <Image
                    src={portraitImage}
                    alt={`Portrait of ${name}, ${role}`}
                    width={1016}
                    height={1024}
                    priority
                    className="hero-portrait-img h-full w-full object-cover object-top transition-transform duration-700 ease-out will-change-transform hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                  />
                </div>

                {/* Architectural Caption Bar */}
                <div className="hero-portrait-caption mt-3 flex items-center justify-between text-[11px] font-sans border-t border-border pt-2 text-text-secondary">
                  <span className="font-semibold uppercase tracking-[0.18em] text-text-primary">
                    Fig. 01 &bull; {name}
                  </span>
                  <span className="uppercase tracking-widest text-[10px] text-accent font-medium">
                    Archive // Portrait
                  </span>
                </div>
              </div>

              {/* Subtle back-layer tectonic offset card */}
              <div
                className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-sm border border-border bg-surface-raised/40 hidden sm:block"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Subtle Scroll Indicator */}
        <div className="hero-scroll-indicator mt-12 sm:mt-16 flex justify-center">
          <a
            href="#work"
            className="group flex flex-col items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm py-1 px-3"
            aria-label="Scroll down to Explore My Work"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-text-tertiary group-hover:text-accent transition-colors">
              Scroll to explore
            </span>
            <div className="relative h-9 w-[1px] bg-border overflow-hidden">
              <div className="absolute top-0 left-0 h-4 w-full bg-accent animate-pulse" />
            </div>
          </a>
        </div>
      </Container>
    </section>
  );
}
