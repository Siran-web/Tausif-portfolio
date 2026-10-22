import React from "react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectList } from "@/components/projects/ProjectList";
import { portfolioData } from "@/data/portfolio";

export function ProjectsSection() {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="scroll-mt-24 py-20 sm:py-28 lg:py-32 border-b border-border bg-canvas">
      <Container>
        <SectionHeading
          eyebrow="02 // PORTFOLIO"
          title="Selected Works"
          description="Exploring form, material, light, and the relationship between architecture and its surroundings."
          align="split"
          animateTitle={true}
        />

        <ProjectList projects={projects} />
      </Container>
    </section>
  );
}
