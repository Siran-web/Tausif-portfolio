"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { gsap, useGSAP } from "@/lib/gsap";
import type { AboutContent } from "@/data/about";

export interface AboutIntroProps {
  data: AboutContent;
}

export function AboutIntro({ data }: AboutIntroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const specialitiesRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.set(
          [
            headlineRef.current?.querySelectorAll(".line-reveal-inner"),
            bioRef.current,
            specialitiesRef.current,
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

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // 1. Eyebrow label reveal
      tl.fromTo(
        ".about-eyebrow-item",
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
      );

      // 2. Line-by-line mask reveal for headline
      const lines = headlineRef.current?.querySelectorAll(".line-reveal-inner");
      if (lines && lines.length > 0) {
        tl.fromTo(
          lines,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.3"
        );
      }

      // 3. Biography & specialities fade and gentle translate
      tl.fromTo(
        [bioRef.current, specialitiesRef.current],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // 4. Portrait curtain clip-path reveal & scale settle
      if (imageWrapperRef.current) {
        tl.fromTo(
          imageWrapperRef.current,
          { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 1.0,
            ease: "power3.inOut",
          },
          "-=0.7"
        );
      }

      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          { scale: 1.1 },
          { scale: 1.0, duration: 1.2, ease: "power2.out" },
          "-=1.0"
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <div ref={sectionRef} className="pb-16 sm:pb-24 lg:pb-28">
      <Container>
        {/* Eyebrow Label */}
        <div className="about-eyebrow-item flex items-center gap-3 mb-6 sm:mb-8">
          <span className="h-px w-8 bg-accent" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">
            {data.eyebrow}
          </span>
          <span className="text-border select-none">&bull;</span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-text-tertiary">
            ATELIER TAUSIF RAZA
          </span>
        </div>

        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column (7 cols): Headline, Biography, Specialities */}
          <div className="lg:col-span-7 space-y-8">
            <h2
              ref={headlineRef}
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-text-primary leading-[1.12]"
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

            <p
              ref={bioRef}
              className="text-base sm:text-lg leading-relaxed text-text-secondary font-sans font-light max-w-2xl"
            >
              {data.biography}
            </p>

            {/* Speciality Badges */}
            <div ref={specialitiesRef} className="pt-6 border-t border-border">
              <span className="text-[10px] font-mono uppercase tracking-widest text-text-tertiary block mb-3 font-medium">
                PRACTICE SPECIALITIES
              </span>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {data.specialities.map((speciality) => (
                  <span
                    key={speciality}
                    className="inline-flex items-center gap-2 rounded-xs border border-border bg-surface-raised px-3.5 py-1.5 text-xs font-medium tracking-wide text-text-primary font-sans transition-colors hover:border-accent"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>{speciality}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Authentic Architectural Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div
              ref={imageWrapperRef}
              className="card-architectural relative w-full max-w-md overflow-hidden bg-surface border border-border p-3 sm:p-4 rounded-sm shadow-2xl"
            >
              {/* Corner crosshairs */}
              <span className="absolute top-2 left-2 text-[10px] font-mono text-accent select-none pointer-events-none z-10">
                +
              </span>
              <span className="absolute top-2 right-2 text-[10px] font-mono text-accent select-none pointer-events-none z-10">
                +
              </span>
              <span className="absolute bottom-2 left-2 text-[10px] font-mono text-accent select-none pointer-events-none z-10">
                +
              </span>
              <span className="absolute bottom-2 right-2 text-[10px] font-mono text-accent select-none pointer-events-none z-10">
                +
              </span>

              {/* Portrait Container */}
              <div
                ref={imageRef}
                className="relative aspect-[4/5] w-full overflow-hidden rounded-xs bg-surface-raised"
              >
                <Image
                  src={data.image.src}
                  alt={data.image.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover object-center filter grayscale contrast-[1.05] hover:grayscale-0 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent opacity-60" />
              </div>

              {/* Technical Caption Strip */}
              {data.image.caption && (
                <div className="mt-3 pt-2.5 border-t border-border flex items-center justify-between text-xs font-sans">
                  <span className="text-[11px] font-semibold text-text-primary uppercase tracking-wider">
                    {data.name}
                  </span>
                  <span className="text-[10px] font-mono text-accent uppercase tracking-widest">
                    {data.image.caption}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
