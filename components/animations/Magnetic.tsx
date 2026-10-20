"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

export interface MagneticProps {
  children: React.ReactNode;
  strength?: number; // Scaling factor (default 0.15)
  maxDistance?: number; // Maximum translation in pixels (default 4px)
  className?: string;
}

export function Magnetic({
  children,
  strength = 0.15,
  maxDistance = 4,
  className = "",
}: MagneticProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    // Check for fine pointer and reduced motion
    const isFinePointer =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isFinePointer || prefersReducedMotion) return;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const rawDeltaX = (e.clientX - centerX) * strength;
      const rawDeltaY = (e.clientY - centerY) * strength;

      // Restrain displacement to maxDistance (3–5px) so the hit area is never compromised
      const clampedX = Math.max(-maxDistance, Math.min(maxDistance, rawDeltaX));
      const clampedY = Math.max(-maxDistance, Math.min(maxDistance, rawDeltaY));

      gsap.to(inner, {
        x: clampedX,
        y: clampedY,
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handlePointerLeave = () => {
      // Smoothly spring the inner content back to origin
      gsap.to(inner, {
        x: 0,
        y: 0,
        duration: 0.55,
        ease: "elastic.out(1.1, 0.4)",
        overwrite: "auto",
      });
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      gsap.killTweensOf(inner);
    };
  }, [strength, maxDistance]);

  return (
    <div ref={containerRef} className={`inline-flex ${className}`}>
      <div ref={innerRef} className="will-change-transform inline-flex items-center justify-center w-full h-full">
        {children}
      </div>
    </div>
  );
}
