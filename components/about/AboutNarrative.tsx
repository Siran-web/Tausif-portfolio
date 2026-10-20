"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import type { AboutContent } from "@/data/about";
import { AboutStickyPortrait } from "./AboutStickyPortrait";

export interface AboutNarrativeProps {
  data: AboutContent;
}

export function AboutNarrative({ data }: AboutNarrativeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const specialitiesRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);

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
            bioRef.current,
            specialitiesRef.current,
            philosophyRef.current,
            principlesRef.current?.querySelectorAll(".principle-card"),
          ],
          {
            opacity: 1,
            y: 0,
            clearProps: "all",
          }
        );
        return;
      }

      // 1. Headline and Biography Reveal
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      const lines = headlineRef.current?.querySelectorAll(".line-reveal-inner");
      if (lines && lines.length > 0) {
        introTl.fromTo(
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

      introTl.fromTo(
        [bioRef.current, specialitiesRef.current],
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

      // 2. Philosophy Block Progressive Entrance
      if (philosophyRef.current) {
        gsap.fromTo(
          philosophyRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: philosophyRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 3. Principles Block Progressive Entrance
      if (principlesRef.current) {
        const principleCards =
          principlesRef.current.querySelectorAll(".principle-card");
        gsap.fromTo(
          principleCards,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: principlesRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="space-y-16 sm:space-y-20 lg:space-y-24">
      {/* ─────────────────────────────────────────────────────────────
          1. INTRO: Eyebrow, Headline, Biography
      ───────────────────────────────────────────────────────────── */}
      <div className="space-y-6 sm:space-y-8">
        {/* Eyebrow Label */}
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-accent" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">
            {data.eyebrow}
          </span>
          <span className="text-border select-none">&bull;</span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-text-tertiary">
            ATELIER TAUSIF RAZA
          </span>
        </div>

        {/* Editorial Headline */}
        <h2
          ref={headlineRef}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-normal tracking-tight text-text-primary leading-[1.12]"
        >
          <span className="block overflow-hidden py-0.5">
            <span className="line-reveal-inner block">
              Designing spaces with clarity,
            </span>
          </span>
          <span className="block overflow-hidden py-0.5">
            <span className="line-reveal-inner block text-accent italic">
              purpose, and character.
            </span>
          </span>
        </h2>

        {/* Professional Biography */}
        <p
          ref={bioRef}
          className="text-base sm:text-lg leading-relaxed text-text-secondary font-sans font-light max-w-2xl"
        >
          {data.biography}
        </p>

        {/* Mobile-Only Portrait (Natural Flow on mobile/tablet, hidden on lg desktop) */}
        <div className="lg:hidden pt-4 pb-2">
          <AboutStickyPortrait data={data} className="mx-auto" />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. PRACTICE SPECIALITIES
      ───────────────────────────────────────────────────────────── */}
      <div
        ref={specialitiesRef}
        className="pt-8 border-t border-border relative"
      >
        {/* Anchor Aid for Navigation Links */}
        <div
          id="disciplines"
          className="-translate-y-28 pointer-events-none absolute"
          aria-hidden="true"
        />

        <div className="flex items-center gap-2 mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-text-tertiary font-semibold">
            PRACTICE SPECIALITIES
          </span>
        </div>

        <div className="flex flex-wrap gap-2.5 sm:gap-3">
          {data.specialities.map((speciality) => (
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

      {/* ─────────────────────────────────────────────────────────────
          3. DESIGN PHILOSOPHY
      ───────────────────────────────────────────────────────────── */}
      <div
        ref={philosophyRef}
        className="relative pt-8 border-t border-border space-y-6"
      >
        {/* Anchor Aid for Navigation Links */}
        <div
          id="philosophy"
          className="-translate-y-28 pointer-events-none absolute"
          aria-hidden="true"
        />

        {/* Philosophy Card / Editorial Callout */}
        <div className="rounded-sm border border-border bg-surface-raised/40 p-6 sm:p-8 lg:p-10 relative overflow-hidden">
          {/* Subtle Background Watermark */}
          <div
            className="absolute top-2 right-4 font-display text-7xl sm:text-8xl text-text-primary/5 select-none pointer-events-none leading-none tracking-tighter"
            aria-hidden="true"
          >
            PHILOSOPHY
          </div>

          {/* Eyebrow */}
          <div className="flex items-center gap-2.5 mb-4 relative z-10">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent font-semibold">
              {data.philosophy.eyebrow || "DESIGN PHILOSOPHY"}
            </span>
          </div>

          {/* Philosophy Statement Quote */}
          <blockquote className="relative z-10 font-display text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-text-primary leading-[1.22] mb-5">
            &ldquo;{data.philosophy.statement}&rdquo;
          </blockquote>

          {/* Architectural Gold Divider Line */}
          <div
            className="h-px w-20 sm:w-28 bg-accent/80 mb-5 relative z-10"
            aria-hidden="true"
          />

          {/* Supporting Narrative Copy */}
          <p className="relative z-10 text-sm sm:text-base leading-relaxed text-text-secondary font-sans font-light max-w-2xl">
            {data.philosophy.supportingCopy}
          </p>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. DESIGN PRINCIPLES
      ───────────────────────────────────────────────────────────── */}
      <div
        ref={principlesRef}
        className="pt-8 border-t border-border space-y-8"
      >
        {/* Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/80 pb-5">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent font-semibold block mb-2">
              {data.principles.eyebrow || "CORE TENETS"}
            </span>
            <h3 className="font-display text-2xl sm:text-3xl text-text-primary tracking-tight">
              {data.principles.title}
            </h3>
          </div>
          <p className="text-xs sm:text-sm font-sans text-text-secondary max-w-xs font-light">
            Disciplines shaping structural clarity, spatial comfort, and longevity.
          </p>
        </div>

        {/* 2-Column Clean Grid of Architectural Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7">
          {data.principles.items.map((principle) => (
            <div
              key={principle.number}
              className="principle-card group rounded-sm border border-border bg-surface p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:border-accent hover:shadow-lg"
            >
              <div>
                {/* Number & Crosshair Corner Marker */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display text-2xl sm:text-3xl text-accent font-normal tracking-tight">
                    {principle.number}
                  </span>
                  <span
                    className="text-xs font-mono text-text-tertiary select-none group-hover:text-accent transition-colors"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </div>

                {/* Principle Title */}
                <h4 className="font-display text-lg sm:text-xl text-text-primary mb-2 group-hover:text-accent transition-colors duration-200">
                  {principle.title}
                </h4>

                {/* Principle Description */}
                <p className="text-xs sm:text-sm leading-relaxed text-text-secondary font-sans font-light">
                  {principle.description}
                </p>
              </div>

              {/* Bottom Subtle Accent Indicator */}
              <div className="mt-5 pt-2 border-t border-border/60 flex items-center justify-between">
                <span className="h-0.5 w-6 bg-border group-hover:w-10 group-hover:bg-accent block transition-all duration-300" />
                <span className="text-[9px] font-mono uppercase tracking-widest text-text-tertiary">
                  TENET // {principle.number}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
