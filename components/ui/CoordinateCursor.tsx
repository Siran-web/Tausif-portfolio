"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export function CoordinateCursor() {
  const layerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const xValRef = useRef<HTMLSpanElement>(null);
  const yValRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // 1. Device and preference checks
    const isFinePointer =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isFinePointer || prefersReducedMotion) {
      if (layerRef.current) {
        layerRef.current.style.display = "none";
      }
      return;
    }

    const dot = dotRef.current;
    const badge = badgeRef.current;
    const xVal = xValRef.current;
    const yVal = yValRef.current;
    const status = statusRef.current;

    if (!dot || !badge || !xVal || !yVal) return;

    // High-performance GSAP quickTo interpolators for butter-smooth 120fps tracking
    const dotXTo = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const dotYTo = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });

    // Badge follows with a slightly softer easing for an organic floating architectural feel
    const badgeXTo = gsap.quickTo(badge, "x", { duration: 0.22, ease: "power3.out" });
    const badgeYTo = gsap.quickTo(badge, "y", { duration: 0.22, ease: "power3.out" });

    let isVisible = false;
    let isHoveringInteractive = false;

    const handlePointerMove = (e: PointerEvent) => {
      const { clientX, clientY } = e;

      // Fade in smoothly on first pointer movement
      if (!isVisible) {
        isVisible = true;
        gsap.to([dot, badge], {
          opacity: 1,
          scale: 1,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      // 1. Interpolate dot directly onto pointer
      dotXTo(clientX);
      dotYTo(clientY);

      // 2. Viewport boundary safety: flip label if approaching screen edges
      const marginX = 145;
      const marginY = 48;
      const flipX = clientX > window.innerWidth - marginX;
      const flipY = clientY > window.innerHeight - marginY;

      const offsetX = flipX ? -112 : 16;
      const offsetY = flipY ? -34 : 16;

      badgeXTo(clientX + offsetX);
      badgeYTo(clientY + offsetY);

      // 3. Update coordinates text directly in DOM (ZERO React re-renders)
      xVal.textContent = Math.round(clientX).toString();
      yVal.textContent = Math.round(clientY).toString();

      // 4. Interactive target detection
      const target = e.target as HTMLElement | null;
      const isInteractive = Boolean(
        target &&
          (target.closest("a") ||
            target.closest("button") ||
            target.closest("input") ||
            target.closest("textarea") ||
            target.closest("[role='button']") ||
            target.closest(".interactive") ||
            target.closest(".project-card") ||
            target.closest(".card-architectural"))
      );

      if (isInteractive !== isHoveringInteractive) {
        isHoveringInteractive = isInteractive;

        if (isHoveringInteractive) {
          gsap.to(dot, {
            scale: 1.75,
            duration: 0.2,
            ease: "back.out(2)",
            overwrite: "auto",
          });
          badge.classList.add("border-accent/70", "bg-surface-raised/95");
          if (status) {
            status.textContent = "ACT";
            status.classList.remove("text-text-tertiary");
            status.classList.add("text-accent");
          }
        } else {
          gsap.to(dot, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out",
            overwrite: "auto",
          });
          badge.classList.remove("border-accent/70", "bg-surface-raised/95");
          if (status) {
            status.textContent = "DAT";
            status.classList.remove("text-accent");
            status.classList.add("text-text-tertiary");
          }
        }
      }
    };

    const handlePointerLeave = () => {
      isVisible = false;
      gsap.to([dot, badge], {
        opacity: 0,
        scale: 0.75,
        duration: 0.25,
        ease: "power2.in",
        overwrite: "auto",
      });
    };

    const handleWindowBlur = () => {
      handlePointerLeave();
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("blur", handleWindowBlur);
      gsap.killTweensOf([dot, badge]);
    };
  }, []);

  return (
    <div
      ref={layerRef}
      id="coordinate-cursor-layer"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Precision Pointer Target Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 will-change-transform opacity-0 scale-75"
      >
        <div className="relative flex items-center justify-center">
          {/* Subtle Outer Radar Ring */}
          <div className="absolute h-5 w-5 rounded-full border border-accent/25 opacity-70 animate-pulse" />
          {/* Central Precise Accent Dot */}
          <div className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(180,154,114,0.6)]" />
        </div>
      </div>

      {/* 2. Floating Technical Coordinate Badge */}
      <div
        ref={badgeRef}
        className="fixed top-0 left-0 will-change-transform opacity-0 scale-75 inline-flex items-center gap-1.5 rounded-xs border border-border/80 bg-surface/90 backdrop-blur-md px-2 py-0.5 shadow-2xl transition-colors duration-200"
      >
        {/* Architectural Datum Crosshair */}
        <span className="text-[9px] font-mono text-accent select-none pointer-events-none font-bold">
          +
        </span>

        {/* X Coordinate */}
        <span className="text-[9px] font-mono tracking-wider text-text-tertiary">
          X:
        </span>
        <span
          ref={xValRef}
          className="text-[10px] font-mono tracking-tight text-text-primary font-medium w-[24px] text-left tabular-nums inline-block"
        >
          0
        </span>

        <span className="text-border select-none text-[8px]">&bull;</span>

        {/* Y Coordinate */}
        <span className="text-[9px] font-mono tracking-wider text-text-tertiary">
          Y:
        </span>
        <span
          ref={yValRef}
          className="text-[10px] font-mono tracking-tight text-text-primary font-medium w-[24px] text-left tabular-nums inline-block"
        >
          0
        </span>

        {/* Mode Indicator Tag */}
        <span
          ref={statusRef}
          className="text-[8px] font-mono uppercase tracking-widest text-text-tertiary pl-1 border-l border-border/70 select-none"
        >
          DAT
        </span>
      </div>
    </div>
  );
}
