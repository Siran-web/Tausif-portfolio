import React from "react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectList } from "@/components/projects/ProjectList";
import { portfolioData } from "@/data/portfolio";

export function ProjectsSection() {
  const { projects } = portfolioData;

  return (
    <section id="work" className="scroll-mt-24 py-20 sm:py-28 lg:py-32 border-b border-border bg-canvas">
      <div id="projects" className="-translate-y-24 pointer-events-none" aria-hidden="true" />
      <Container>
        <SectionHeading
          eyebrow="02 // SELECTED WORKS"
          title="Architectural Monographs &amp; Spatial Systems"
          description="A curated index of verified architectural commissions, technical floor plans, and spatial studies."
          align="split"
          animateTitle={true}
        />

        <ProjectList projects={projects} />
      </Container>
    </section>
  );
}
