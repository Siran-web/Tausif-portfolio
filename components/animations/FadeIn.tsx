"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export interface FadeInProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  delay?: number;
  useScrollTrigger?: boolean;
}

export function FadeIn({
  children,
  direction = "up",
  distance = 30,
  duration = 0.8,
  delay = 0,
  useScrollTrigger = true,
  className = "",
  ...props
}: FadeInProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      let x = 0;
      let y = 0;

      if (direction === "up") y = distance;
      if (direction === "down") y = -distance;
      if (direction === "left") x = distance;
      if (direction === "right") x = -distance;

      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          x,
          y,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          ease: "power2.out",
          scrollTrigger: useScrollTrigger
            ? {
                trigger: containerRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
              }
            : undefined,
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={className} {...props}>
      {children}
    </div>
  );
}
