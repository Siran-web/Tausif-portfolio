"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { portfolioData } from "@/data/portfolio";
import { aboutContent } from "@/data/about";
import { gsap, useGSAP } from "@/lib/gsap";
import { TextReveal } from "@/components/animations";

export function HeroAboutSection() {
  const wrapperRef = useRef<HTMLElement>(null);
  const heroLeftRef = useRef<HTMLDivElement>(null);
  const aboutLeftRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const specialitiesRef = useRef<HTMLDivElement>(null);
  const desktopPortraitCardRef = useRef<HTMLDivElement>(null);
  const desktopPortraitMaskRef = useRef<HTMLDivElement>(null);
  const desktopPortraitImgRef = useRef<HTMLDivElement>(null);

  const { personal } = portfolioData;

  useGSAP(
    () => {
      if (!wrapperRef.current) return;

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        const motionTargets = [
          ".hero-bg-motif",
          ".hero-eyebrow",
          ".hero-headline",
          ".hero-role",
          ".hero-philosophy",
          ".hero-ctas",
          ".hero-specs",
          desktopPortraitCardRef.current,
          desktopPortraitMaskRef.current,
          desktopPortraitImgRef.current,
          bioRef.current,
          specialitiesRef.current,
        ].filter(Boolean);

        if (motionTargets.length > 0) {
          gsap.set(motionTargets, {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            clipPath: "none",
            clearProps: "all",
          });
        }
        return;
      }

      // ─────────────────────────────────────────────────────────────
      // 1. Hero Initial Viewport Entrance Timeline
      // ─────────────────────────────────────────────────────────────
      const heroTl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      heroTl
        .fromTo(
          ".hero-bg-motif",
          { opacity: 0 },
          { opacity: 0.35, duration: 1.0, ease: "power2.out" }
        )
        .fromTo(
          ".hero-eyebrow",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.7"
        )
        .fromTo(
          ".hero-headline",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.85, ease: "power4.out" },
          "-=0.5"
        );

      if (desktopPortraitCardRef.current) {
        heroTl.fromTo(
          desktopPortraitCardRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8 },
          "<0.1"
        );
      }

      if (desktopPortraitMaskRef.current) {
        heroTl.fromTo(
          desktopPortraitMaskRef.current,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power3.inOut" },
          "<"
        );
      }

      if (desktopPortraitImgRef.current) {
        heroTl.fromTo(
          desktopPortraitImgRef.current,
          { scale: 1.08 },
          { scale: 1, duration: 1.3, ease: "power2.out" },
          "<"
        );
      }

      heroTl
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
        .fromTo(
          ".hero-ctas",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.4"
        )
        .fromTo(
          ".hero-specs",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        );

      // ─────────────────────────────────────────────────────────────
      // 2. Scroll-Triggered Reveals for the About Narrative Content
      // ─────────────────────────────────────────────────────────────
      if (aboutLeftRef.current) {
        const aboutTl = gsap.timeline({
          scrollTrigger: {
            trigger: aboutLeftRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });

        const lines = headlineRef.current?.querySelectorAll(".line-reveal-inner");
        if (lines && lines.length > 0) {
          aboutTl.fromTo(
            lines,
            { yPercent: 110, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.85,
              stagger: 0.1,
              ease: "power3.out",
            }
          );
        }

        const bioAndSpecs = [bioRef.current, specialitiesRef.current].filter(
          (el): el is HTMLParagraphElement | HTMLDivElement => Boolean(el)
        );
        if (bioAndSpecs.length > 0) {
          aboutTl.fromTo(
            bioAndSpecs,
            { opacity: 0, y: 22 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.12,
              ease: "power2.out",
            },
            "-=0.3"
          );
        }
      }
    },
    { scope: wrapperRef }
  );

  return (
    <section
      ref={wrapperRef}
      id="home"
      aria-label="Introduction & About the Architect"
      className="relative bg-canvas border-b border-border pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-20 lg:pb-24 scroll-mt-6"
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

      </div>

      <Container className="relative z-10">
        {/* Two-Column Master Grid: Left Content Scrolls, Right Portrait Sticks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-20 items-start relative pb-20 sm:pb-28 lg:pb-36">
          {/* ═══════════════════════════════════════════════════════════
              LEFT COLUMN (7 cols): Hero Intro + About Narrative
          ═══════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 space-y-20 sm:space-y-28 lg:space-y-32">
            {/* ─────────────────────────────────────────────────────────
                A. HERO SECTION CONTENT
            ───────────────────────────────────────────────────────── */}
            <div ref={heroLeftRef} className="flex flex-col justify-center space-y-6 sm:space-y-8">
              <div className="hero-eyebrow">
                <Eyebrow variant="line" className="mb-2">
                  Architecture &bull; Spatial Systems
                </Eyebrow>
              </div>

              <div className="hero-headline">
                <TextReveal
                  text={personal.name}
                  as="h1"
                  triggerOnScroll={false}
                  duration={0.9}
                  stagger={0.08}
                  delay={0.25}
                  className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-text-primary leading-[1.0] select-text"
                />
              </div>

              <div className="hero-role">
                <p className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-accent">
                  {personal.role}
                </p>
              </div>

              <div className="hero-philosophy">
                <div className="border-l-2 border-accent/60 pl-4 sm:pl-6 max-w-2xl">
                  <p className="font-sans text-sm sm:text-base leading-relaxed text-text-primary/90 font-medium italic">
                    &ldquo;{personal.designPhilosophy}&rdquo;
                  </p>
                </div>
              </div>

              {/* Mobile Portrait: Placed in natural vertical flow, hidden on desktop */}
              <div className="lg:hidden w-full max-w-sm mx-auto pt-2 pb-4">
                <div className="card-architectural relative overflow-hidden bg-surface p-3.5 border border-border shadow-2xl rounded-sm">
                  {/* Corner Crosshairs */}
                  <span className="absolute top-2 left-2 text-[10px] font-mono text-accent select-none" aria-hidden="true">+</span>
                  <span className="absolute top-2 right-2 text-[10px] font-mono text-accent select-none" aria-hidden="true">+</span>
                  <span className="absolute bottom-11 left-2 text-[10px] font-mono text-accent select-none" aria-hidden="true">+</span>
                  <span className="absolute bottom-11 right-2 text-[10px] font-mono text-accent select-none" aria-hidden="true">+</span>

                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xs bg-surface-raised border border-border/80">
                    <Image
                      src={personal.portraitImage}
                      alt={`Portrait of ${personal.name}, ${personal.role}`}
                      fill
                      loading="eager"
                      sizes="(max-width: 640px) 100vw, 380px"
                      className="object-cover object-top"
                    />
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-border flex items-center justify-between text-xs font-sans">
                    <span className="text-[11px] font-semibold text-text-primary uppercase tracking-wider">
                      {personal.name}
                    </span>
                    <span className="text-[10px] font-mono text-accent uppercase tracking-widest font-medium">
                      Studio Practice
                    </span>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="hero-ctas flex flex-wrap items-center gap-4 pt-2">
                <Button
                  href="#projects"
                  variant="primary"
                  size="lg"
                  magnetic
                  className="uppercase tracking-widest text-xs px-7"
                >
                  Explore My Work &rarr;
                </Button>
                <Button
                  href="#about"
                  variant="outline"
                  size="lg"
                  magnetic
                  className="uppercase tracking-widest text-xs px-7"
                >
                  About Me
                </Button>
              </div>

              {/* Bottom Information Specs */}
              <div className="hero-specs flex flex-col sm:flex-row sm:items-center gap-y-2.5 gap-x-8 sm:gap-x-12 border-t border-border pt-4 text-xs font-sans text-text-secondary">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-text-primary uppercase tracking-wider">
                    STUDIO:
                  </span>
                  <span className="tracking-wide">{personal.location}</span>
                </div>
              </div>


            </div>

            {/* ─────────────────────────────────────────────────────────
                B. ABOUT SECTION CONTENT
            ───────────────────────────────────────────────────────── */}
            <div
              ref={aboutLeftRef}
              id="about"
              className="scroll-mt-24 pt-16 sm:pt-20 border-t border-border/80 space-y-16 sm:space-y-20"
              aria-label="About the Architect"
            >
              {/* 1. Intro: Eyebrow, Headline, Biography */}
              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-accent" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">
                    {aboutContent.eyebrow}
                  </span>
                  <span className="text-border select-none">&bull;</span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-text-tertiary">
                    ATELIER TAUSIF RAZA
                  </span>
                </div>

                <h2
                  ref={headlineRef}
                  className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-text-primary leading-[1.12]"
                >
                  <span className="block overflow-hidden py-0.5">
                    <span className="line-reveal-inner block">
                      Beyond structures,
                    </span>
                  </span>
                  <span className="block overflow-hidden py-0.5">
                    <span className="line-reveal-inner block text-accent italic">
                      creating experiences.
                    </span>
                  </span>
                </h2>

                <p
                  ref={bioRef}
                  className="text-base sm:text-lg leading-relaxed text-text-secondary font-sans font-light max-w-2xl"
                >
                  {aboutContent.biography}
                </p>
              </div>

              {/* 2. Practice Specialities */}
              <div
                ref={specialitiesRef}
                className="pt-8 border-t border-border relative"
              >
                <div
                  id="disciplines"
                  className="-translate-y-28 pointer-events-none absolute"
                  aria-hidden="true"
                />

                <div className="flex items-center gap-2 mb-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-text-tertiary font-semibold">
                    SPECIALITIES
                  </span>
                </div>

                <div className="flex flex-wrap gap-2.5 sm:gap-3">
                  {aboutContent.specialities.map((speciality) => (
                    <span
                      key={speciality}
                      className="inline-flex items-center gap-2.5 rounded-xs border border-border bg-surface-raised px-4 py-2 text-xs font-medium tracking-wide text-text-primary font-sans transition-all duration-300 hover:border-accent hover:bg-surface-overlay group"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-accent group-hover:scale-125 transition-transform" />
                      <span>{speciality}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════
              RIGHT COLUMN (5 cols): Single Sticky Portrait
              Sticks from top of Hero through entire About scroll,
              releasing naturally when this shared wrapper ends.
          ═══════════════════════════════════════════════════════════ */}
          <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-24 xl:top-28 self-start pt-4 sm:pt-6 lg:pt-8">
            <div className="flex justify-end">
              <div
                ref={desktopPortraitCardRef}
                className="card-architectural relative w-full max-w-md overflow-hidden bg-surface p-3.5 sm:p-4 border border-border shadow-2xl rounded-sm"
              >
                {/* Antique Brass Corner Crosshairs (+) */}
                <span className="absolute top-2 left-2 text-[10px] font-mono text-accent select-none pointer-events-none z-10" aria-hidden="true">+</span>
                <span className="absolute top-2 right-2 text-[10px] font-mono text-accent select-none pointer-events-none z-10" aria-hidden="true">+</span>
                <span className="absolute bottom-11 left-2 text-[10px] font-mono text-accent select-none pointer-events-none z-10" aria-hidden="true">+</span>
                <span className="absolute bottom-11 right-2 text-[10px] font-mono text-accent select-none pointer-events-none z-10" aria-hidden="true">+</span>

                {/* Aspect Ratio [4/5] Masked Container */}
                <div
                  ref={desktopPortraitMaskRef}
                  className="relative aspect-[4/5] w-full overflow-hidden rounded-xs bg-surface-raised border border-border/80 will-change-[clip-path]"
                >
                  <div ref={desktopPortraitImgRef} className="relative h-full w-full">
                    <Image
                      src={personal.portraitImage}
                      alt={`Portrait of ${personal.name}, ${personal.role}`}
                      fill
                      loading="eager"
                      sizes="(max-width: 1024px) 50vw, 440px"
                      className="object-cover object-top"
                    />
                  </div>
                </div>

                {/* Technical Caption Strip */}
                <div className="mt-3 pt-2.5 border-t border-border flex items-center justify-between text-xs font-sans">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <span className="text-[11px] font-semibold text-text-primary uppercase tracking-wider">
                      {personal.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-accent uppercase tracking-widest font-medium">
                    Studio Practice // Archive
                  </span>
                </div>
              </div>
            </div>

            {/* Subtle Tectonic Offset Shadow Layer */}
            <div
              className="absolute -bottom-3 -right-3 -z-10 h-full w-full max-w-md ml-auto rounded-sm border border-border bg-surface-raised/40 hidden sm:block"
              aria-hidden="true"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
