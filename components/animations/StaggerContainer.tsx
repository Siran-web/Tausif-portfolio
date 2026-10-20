"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export interface StaggerContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  stagger?: number;
  duration?: number;
  delay?: number;
  selector?: string;
  useScrollTrigger?: boolean;
}

export function StaggerContainer({
  children,
  stagger = 0.15,
  duration = 0.6,
  delay = 0,
  selector = "> *",
  useScrollTrigger = true,
  className = "",
  ...props
}: StaggerContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const items = containerRef.current.querySelectorAll(selector);
      if (!items.length) return;

      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
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
