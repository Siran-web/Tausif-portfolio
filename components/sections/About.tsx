"use client";

import React from "react";
import {
  SceneIntro,
  ScenePhilosophy,
  ScenePrinciples,
  SceneProcess,
  SceneTransition,
} from "@/components/about";

export function About() {
  return (
    <div id="about" className="relative scroll-mt-20">
      {/* Target anchor aids for navigation links */}
      <div id="disciplines" className="-translate-y-24 pointer-events-none" aria-hidden="true" />
      <div id="philosophy" className="-translate-y-24 pointer-events-none" aria-hidden="true" />

      {/* Scene 1 — Introduction: The Architect's Perspective */}
      <SceneIntro />

      {/* Scene 2 — Scroll-Driven Architectural Philosophy (Pinned Narrative) */}
      <ScenePhilosophy />

      {/* Scene 3 — Core Design Principles */}
      <ScenePrinciples />

      {/* Scene 4 — The Architectural Design Process */}
      <SceneProcess />

      {/* Scene 5 — Transition to Selected Projects */}
      <SceneTransition />
    </div>
  );
}
