"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import type { AboutContent } from "@/data/about";

export interface AboutStickyPortraitProps {
  data: AboutContent;
  className?: string;
}

export function AboutStickyPortrait({
  data,
  className = "",
}: AboutStickyPortraitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.set([cardRef.current, maskRef.current, imageRef.current], {
          opacity: 1,
          y: 0,
          scale: 1,
          clipPath: "none",
          clearProps: "all",
        });
        return;
      }

      // Entrance reveal when About section enters the viewport
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        cardRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      )
        .fromTo(
          maskRef.current,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.1,
            ease: "power3.inOut",
          },
          "-=0.6"
        )
        .fromTo(
          imageRef.current,
          { scale: 1.1 },
          { scale: 1.0, duration: 1.2, ease: "power2.out" },
          "-=1.1"
        );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-md ${className}`}
      aria-label="Architect Portrait Anchor"
    >
      {/* Architectural Card Matting & Frame */}
      <div
        ref={cardRef}
        className="card-architectural relative overflow-hidden bg-surface p-3.5 sm:p-4 border border-border shadow-2xl rounded-sm"
      >
        {/* Antique Brass Corner Crosshairs (+) */}
        <span
          className="absolute top-2 left-2 text-[10px] font-mono text-accent select-none pointer-events-none z-10"
          aria-hidden="true"
        >
          +
        </span>
        <span
          className="absolute top-2 right-2 text-[10px] font-mono text-accent select-none pointer-events-none z-10"
          aria-hidden="true"
        >
          +
        </span>
        <span
          className="absolute bottom-11 left-2 text-[10px] font-mono text-accent select-none pointer-events-none z-10"
          aria-hidden="true"
        >
          +
        </span>
        <span
          className="absolute bottom-11 right-2 text-[10px] font-mono text-accent select-none pointer-events-none z-10"
          aria-hidden="true"
        >
          +
        </span>

        {/* Masked Portrait Container with Aspect Ratio [4/5] */}
        <div
          ref={maskRef}
          className="relative aspect-[4/5] w-full overflow-hidden rounded-xs bg-surface-raised border border-border/80 will-change-[clip-path]"
        >
          <div ref={imageRef} className="relative h-full w-full">
            <Image
              src={data.image.src}
              alt={data.image.alt}
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 440px"
              className="object-cover object-top filter grayscale contrast-[1.05] hover:grayscale-0 transition-all duration-700 ease-out"
            />
            {/* Subtle Gradient Vignette */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent opacity-60 pointer-events-none"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Technical Architectural Caption Strip */}
        <div className="mt-3 pt-2.5 border-t border-border flex items-center justify-between text-xs font-sans">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-[11px] font-semibold text-text-primary uppercase tracking-wider">
              {data.name}
            </span>
          </div>
          <span className="text-[10px] font-mono text-accent uppercase tracking-widest font-medium">
            {data.image.caption || "Atelier // Studio Practice"}
          </span>
        </div>
      </div>

      {/* Subtle Tectonic Offset Shadow Layer */}
      <div
        className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-sm border border-border bg-surface-raised/40 hidden sm:block"
        aria-hidden="true"
      />
    </div>
  );
}
