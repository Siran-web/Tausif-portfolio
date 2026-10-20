import React from "react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/animations";
import { portfolioData } from "@/data/portfolio";

export function ProcessSection() {
  const { process } = portfolioData;

  return (
    <section id="process" className="py-20 sm:py-28 lg:py-32 border-b border-border bg-canvas">
      <Container>
        <SectionHeading
          eyebrow="03 // METHODOLOGY"
          title="From Spatial Logic to Execution"
          description="A disciplined four-phase approach translating conceptual frameworks into resilient architectural realities."
          align="split"
          animateTitle={true}
        />

        <ScrollReveal
          variant="stagger"
          selector=".process-step-item"
          stagger={0.1}
          threshold="top 85%"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8"
        >
          {process.map((step) => (
            <div
              key={step.step}
              className="process-step-item col-span-1 md:col-span-1 lg:col-span-6"
            >
              <div className="card-architectural h-full p-6 sm:p-8 bg-surface border border-border rounded-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
                    <span className="font-display text-3xl sm:text-4xl text-accent font-normal">
                      {step.step}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-tertiary">
                      Phase {step.step}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl text-text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-accent font-semibold mb-4">
                    {step.subtitle}
                  </p>
                  <p className="text-sm leading-relaxed text-text-secondary font-sans">
                    {step.description}
                  </p>
                </div>

                <div className="mt-8 border-t border-border pt-4">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-text-tertiary block mb-2">
                    Key Deliverables
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {step.deliverables.map((item) => (
                      <span
                        key={item}
                        className="rounded-sm border border-border bg-surface-raised px-2.5 py-1 text-[11px] font-medium text-text-secondary"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ScrollReveal>
      </Container>
    </section>
  );
}
