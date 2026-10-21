"use client";

import React, { useState } from "react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/animations";
import { portfolioData } from "@/data/portfolio";

export function ContactSection() {
  const { personal } = portfolioData;
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="scroll-mt-24 py-20 sm:py-28 lg:py-32 bg-canvas">
      <Container>
        <SectionHeading
          eyebrow="03 // INQUIRIES"
          title="Commission a Project or Spatial System"
          description="Direct all commissions, design system architecture collaborations, or creative engineering inquiries."
          align="split"
          animateTitle={true}
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column (5 cols): Direct Contacts & Studio Notes */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal variant="horizontal" direction="left" distance={30}>
              <div className="card-architectural p-6 sm:p-8 bg-surface border border-border rounded-sm">
                <h3 className="font-display text-2xl text-text-primary mb-4">
                  Studio Inquiries
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary font-sans mb-6">
                  Available for select commissions, design systems consultancy, and creative frontend engineering partnerships.
                </p>

                <div className="space-y-4 font-sans border-t border-border pt-4">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-text-tertiary block">
                      Direct Channel
                    </span>
                    <a
                      href={`mailto:${personal.email}`}
                      className="text-sm font-semibold text-text-primary hover:text-accent transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                    >
                      {personal.email}
                    </a>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-text-tertiary block">
                      Operating Timezone
                    </span>
                    <span className="text-sm font-medium text-text-primary">
                      CET (Central European Time) / UTC+1
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-text-tertiary block">
                      Design System Repository
                    </span>
                    <span className="text-xs font-mono text-text-secondary">
                      Tailwind CSS 4 &bull; Architectural Dark System
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column (7 cols): Architecture Inquiry Form */}
          <div className="lg:col-span-7">
            <ScrollReveal variant="horizontal" direction="right" distance={30}>
              <div className="card-architectural p-6 sm:p-8 bg-surface border border-border rounded-sm">
                {formSubmitted ? (
                  <div className="py-12 text-center font-sans">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent mb-4">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <h4 className="font-display text-2xl text-text-primary mb-2">
                      Inquiry Received
                    </h4>
                    <p className="text-sm text-text-secondary max-w-sm mx-auto">
                      Thank you for reaching out. We will review your project brief and respond shortly.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-6 uppercase tracking-wider text-xs"
                      onClick={() => setFormSubmitted(false)}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5 font-sans">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="client-name"
                          className="block text-xs font-semibold uppercase tracking-wider text-text-primary mb-1.5"
                        >
                          Name / Studio
                        </label>
                        <input
                          id="client-name"
                          type="text"
                          required
                          placeholder="e.g. Elena Rostova"
                          className="input-architectural"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="client-email"
                          className="block text-xs font-semibold uppercase tracking-wider text-text-primary mb-1.5"
                        >
                          Email Address
                        </label>
                        <input
                          id="client-email"
                          type="email"
                          required
                          placeholder="elena@studio.com"
                          className="input-architectural"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="project-typology"
                        className="block text-xs font-semibold uppercase tracking-wider text-text-primary mb-1.5"
                      >
                        Project Scope / Typology
                      </label>
                      <select
                        id="project-typology"
                        defaultValue="design-system"
                        className="input-architectural"
                      >
                        <option value="design-system" className="bg-surface text-text-primary">Design System &amp; Web Platform</option>
                        <option value="spatial-computing" className="bg-surface text-text-primary">Digital Space &amp; Interactive Monograph</option>
                        <option value="full-stack" className="bg-surface text-text-primary">Full-Stack Application Development</option>
                        <option value="other" className="bg-surface text-text-primary">General Advisory</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="project-brief"
                        className="block text-xs font-semibold uppercase tracking-wider text-text-primary mb-1.5"
                      >
                        Project Brief
                      </label>
                      <textarea
                        id="project-brief"
                        rows={4}
                        required
                        placeholder="Detail the scope, timeline, and spatial or computational requirements..."
                        className="input-architectural resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        className="w-full sm:w-auto uppercase tracking-widest text-xs px-8"
                      >
                        Submit Project Inquiry &rarr;
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
