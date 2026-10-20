"use client";

import React from "react";
import { Container } from "@/components/layout/Container";
import { AboutNarrative, AboutStickyPortrait } from "@/components/about";
import { aboutContent } from "@/data/about";

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 pt-20 sm:pt-28 lg:pt-36 pb-20 sm:pb-28 lg:pb-36 border-b border-border bg-canvas relative"
      aria-label="About the Architect & Design Philosophy"
    >
      <Container>
        {/* Two-Column Editorial Desktop Grid (Left: Scrollable Narrative, Right: Sticky Portrait) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-20 items-start relative">
          {/* Left Column (7 cols): Scrollable Content with Progressive Reveals */}
          <div className="lg:col-span-7">
            <AboutNarrative data={aboutContent} />
          </div>

          {/* Right Column (5 cols): Single Architect Portrait Sticky Container */}
          <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-28 xl:top-32 self-start">
            <div className="flex justify-end">
              <AboutStickyPortrait data={aboutContent} className="ml-auto" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
