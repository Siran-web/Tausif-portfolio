import React from "react";
import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { portfolioData } from "@/data/portfolio";

export function About() {
  const { personal, skills, experiences } = portfolioData;

  return (
    <section id="about" className="scroll-mt-24 py-20 sm:py-28 lg:py-32 border-b border-border bg-canvas">
      <div id="disciplines" className="-translate-y-24 pointer-events-none" aria-hidden="true" />
      <Container>
        <SectionHeading
          eyebrow="01 // DISCIPLINES &amp; METHODOLOGY"
          title="Architectural Rigor Applied to Digital Interfaces"
          description="A synthesis of structural principles, modular design systems, and modern full-stack execution."
          align="split"
          animateTitle={true}
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column (5 cols): Philosophy & Practice */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal variant="horizontal" direction="left" distance={30}>
              <div className="card-architectural p-6 sm:p-8 bg-surface border border-border rounded-sm">
                <h3 className="font-display text-2xl text-text-primary mb-4">
                  Design Philosophy
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-text-secondary font-sans mb-4">
                  {personal.bio}
                </p>
                <p className="text-sm sm:text-base leading-relaxed text-text-secondary font-sans">
                  Every interface is treated as a spatial construct: proportions, grid discipline, and typographic hierarchy work together to provide clarity, speed, and tactile satisfaction.
                </p>

                <div className="mt-8 border-t border-border pt-4">
                  <span className="text-xs font-semibold uppercase tracking-widest text-text-tertiary block mb-1">
                    Studio Location
                  </span>
                  <span className="text-sm font-medium text-text-primary">
                    {personal.location} &bull; Remote Practice
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column (7 cols): Technical Expertise & Skills */}
          <div className="lg:col-span-7 space-y-8">
            <ScrollReveal variant="fade-up">
              <h3 className="font-display text-2xl text-text-primary mb-6">
                Technical Capabilities
              </h3>
            </ScrollReveal>

            <ScrollReveal
              variant="stagger"
              selector=".skill-group"
              stagger={0.08}
              threshold="top 85%"
              className="space-y-6"
            >
              {skills.map((group) => (
                <div
                  key={group.category}
                  className="skill-group card-architectural p-5 sm:p-6 bg-surface border border-border rounded-sm"
                >
                  <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent mb-3">
                    {group.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center rounded-sm border border-border bg-surface-raised px-3 py-1 text-xs font-medium text-text-secondary"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </ScrollReveal>

            {/* Experience Spec */}
            {experiences.length > 0 && (
              <ScrollReveal variant="fade-up" delay={0.15}>
                <div className="border-t border-border pt-6">
                  <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-text-tertiary mb-4">
                    Current Engagement
                  </h4>
                  {experiences.map((exp) => (
                    <div
                      key={exp.id}
                      className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-border/70 pb-4"
                    >
                      <div>
                        <span className="font-display text-lg text-text-primary">
                          {exp.role}
                        </span>
                        <span className="text-sm text-text-secondary ml-2 font-sans">
                          &bull; {exp.company}
                        </span>
                      </div>
                      <span className="text-xs uppercase tracking-wider text-accent font-medium">
                        {exp.period}
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
