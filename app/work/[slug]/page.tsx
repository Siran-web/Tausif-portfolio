import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { DrawingViewer } from "@/components/projects/DrawingViewer";
import { portfolioData, type Project } from "@/data/portfolio";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = portfolioData.projects.map((project) => ({
    slug: project.slug,
  }));
  // Include legacy alias to ensure static builds succeed and redirects work
  return [...slugs, { slug: "sheikh-nawaz-bungalow" }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "sheikh-nawaz-bungalow") {
    return {
      title: "Courtyard Residence | Ar. Tausif Raza",
      description: "Neoclassical residential estate and architectural planning.",
    };
  }

  const project = portfolioData.projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | Ar. Tausif Raza",
    };
  }

  return {
    title: `${project.title} — Architectural Monograph | Ar. Tausif Raza`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Gracefully redirect legacy client-named URL to the neutral, sanitized slug
  if (slug === "sheikh-nawaz-bungalow") {
    redirect("/work/courtyard-residence");
  }

  const project = portfolioData.projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Calculate previous and next project pagination
  const currentIndex = portfolioData.projects.findIndex((p) => p.slug === slug);
  const prevProject: Project | null =
    currentIndex > 0 ? portfolioData.projects[currentIndex - 1] ?? null : null;
  const nextProject: Project | null =
    currentIndex < portfolioData.projects.length - 1
      ? portfolioData.projects[currentIndex + 1] ?? null
      : null;

  return (
    <article className="min-h-screen bg-canvas text-text-primary pt-24 sm:pt-32 pb-24 font-sans selection:bg-accent selection:text-canvas">
      <Container>
        {/* Navigation Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center justify-between border-b border-border pb-6 mb-12 sm:mb-16"
        >
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-text-secondary hover:text-accent transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-1">&larr;</span>
            <span>Return to Selected Works</span>
          </Link>
          <span className="text-xs font-mono text-text-tertiary uppercase tracking-widest">
            MONOGRAPH // {project.category.toUpperCase()}
          </span>
        </nav>

        {/* Section A: Project Cover & Brief */}
        <header className="mb-14 sm:mb-20">
          <Eyebrow variant="line" accentColor="brass" className="mb-4">
            {project.category} Architecture &bull; Monograph
          </Eyebrow>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-text-primary leading-[1.05]">
            {project.title}
          </h1>

          {project.subtitle && (
            <p className="mt-3 text-sm sm:text-base font-sans font-medium text-accent uppercase tracking-widest">
              {project.subtitle}
            </p>
          )}

          <p className="mt-6 max-w-3xl text-base sm:text-lg lg:text-xl leading-relaxed text-text-secondary font-sans">
            {project.description}
          </p>

          {/* Quick Specification Metadata Bar */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-b border-border py-6 text-xs font-sans">
            <div>
              <span className="font-semibold text-text-tertiary uppercase tracking-wider block">
                Typology
              </span>
              <span className="text-sm font-medium text-text-primary mt-1 block">
                {project.typology}
              </span>
            </div>
            <div>
              <span className="font-semibold text-text-tertiary uppercase tracking-wider block">
                Location
              </span>
              <span className="text-sm font-medium text-text-primary mt-1 block">
                {project.location}
              </span>
            </div>
            <div>
              <span className="font-semibold text-text-tertiary uppercase tracking-wider block">
                Practice
              </span>
              <span className="text-sm font-medium text-text-primary mt-1 block">
                {project.practice || "CIVI ARCHER DESIGNS"}
              </span>
            </div>
            <div>
              <span className="font-semibold text-text-tertiary uppercase tracking-wider block">
                Lead Architect
              </span>
              <span className="text-sm font-medium text-accent mt-1 block">
                {project.architect || "Ar. Tausif Raza"}
              </span>
            </div>
          </div>
        </header>

        {/* Large Format Project Cover Hero Visual */}
        {project.coverImage && (
          <section aria-label="Project Hero Visual" className="mb-20 sm:mb-28">
            <div className="relative overflow-hidden bg-surface p-2 sm:p-4 border border-border rounded-sm">
              {/* Architectural drafting crosshairs */}
              <span className="absolute top-2 left-2 text-xs font-mono text-accent select-none pointer-events-none">
                +
              </span>
              <span className="absolute top-2 right-2 text-xs font-mono text-accent select-none pointer-events-none">
                +
              </span>
              <span className="absolute bottom-2 left-2 text-xs font-mono text-accent select-none pointer-events-none">
                +
              </span>
              <span className="absolute bottom-2 right-2 text-xs font-mono text-accent select-none pointer-events-none">
                +
              </span>

              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-xs bg-surface-raised">
                <Image
                  src={project.coverImage.src}
                  alt={project.coverImage.alt}
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1280px) 100vw, 1200px"
                />
              </div>

              {project.coverImage.caption && (
                <div className="mt-3 flex items-center justify-between text-xs font-sans text-text-secondary pt-2 border-t border-border">
                  <span>{project.coverImage.caption}</span>
                  <span className="text-[10px] font-mono text-accent uppercase tracking-wider">
                    PRIMARY VISUAL // 01
                  </span>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Section B: Project Overview & Archifolio-Style Architectural Spec Table */}
        <section aria-label="Project Overview & Specifications" className="mb-20 sm:mb-28 border-t border-border pt-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4">
              <span className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-accent block mb-2">
                01 // PROJECT OVERVIEW
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-text-primary">
                Design Intent &amp; Spatial Brief
              </h2>
            </div>

            <div className="lg:col-span-8 space-y-8">
              {/* Narrative Paragraphs */}
              {project.overview && project.overview.length > 0 && (
                <div className="space-y-4 text-sm sm:text-base leading-relaxed text-text-secondary font-sans">
                  {project.overview.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              )}

              {/* Architectural Specifications Table (Archifolio-inspired) */}
              {project.specs && project.specs.length > 0 && (
                <div className="border border-border rounded-sm bg-surface overflow-hidden">
                  <div className="px-5 py-3 border-b border-border bg-surface-raised/50 flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-text-tertiary">
                      Project Specification Summary
                    </span>
                    <span className="text-[10px] font-mono text-accent">ARCHIFOLIO FORMAT</span>
                  </div>
                  <table className="w-full text-left text-xs font-sans divide-y divide-border/60">
                    <tbody>
                      {project.specs.map((spec) => (
                        <tr key={spec.label} className="hover:bg-surface-raised/40 transition-colors">
                          <td className="w-1/3 px-5 py-3.5 font-medium text-text-tertiary uppercase tracking-wider">
                            {spec.label}
                          </td>
                          <td className="w-2/3 px-5 py-3.5 text-text-primary font-medium">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Section C: Design Narrative (Architectural Thinking, Light, Materials) */}
        {project.narrative && project.narrative.length > 0 && (
          <section aria-label="Design Narrative" className="mb-20 sm:mb-28 border-t border-border pt-14">
            <div className="mb-12">
              <span className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-accent block mb-2">
                02 // DESIGN NARRATIVE
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-text-primary">
                Spatial Organization, Light &amp; Tectonics
              </h2>
              <p className="mt-3 text-sm text-text-secondary font-sans max-w-2xl">
                An editorial exploration into the core principles of classical proportion, regional microclimatic response, and tactile materiality.
              </p>
            </div>

            <div className="space-y-12">
              {project.narrative.map((chapter, idx) => (
                <div
                  key={chapter.title}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-border/60 pb-10"
                >
                  <div className="lg:col-span-4">
                    <span className="font-mono text-xs text-accent uppercase tracking-widest block mb-1">
                      CHAPTER // 0{idx + 1}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl text-text-primary">
                      {chapter.title}
                    </h3>
                    {chapter.subtitle && (
                      <span className="text-xs font-sans text-text-tertiary uppercase tracking-wider mt-1 block">
                        {chapter.subtitle}
                      </span>
                    )}
                  </div>
                  <div className="lg:col-span-8 space-y-4 text-sm sm:text-base leading-relaxed text-text-secondary font-sans">
                    {chapter.content.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section D: Visual Documentation (Renders & Perspectives) */}
        {project.gallery && project.gallery.length > 0 && (
          <section aria-label="Visual Documentation" className="mb-20 sm:mb-28 border-t border-border pt-14">
            <div className="mb-10">
              <span className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-accent block mb-2">
                03 // VISUAL DOCUMENTATION
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-text-primary">
                Perspectives, Courtyard &amp; Architectural Enclosure
              </h2>
              <p className="mt-2 text-sm text-text-secondary font-sans max-w-2xl">
                Exterior architectural visualizations highlighting neoclassical column orders, perimeter boundary walls, and private outdoor recreation.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {project.gallery.map((img, idx) => (
                <div
                  key={idx}
                  className={`${
                    idx === 0 ? "lg:col-span-12" : "lg:col-span-6"
                  } group overflow-hidden bg-surface p-3 border border-border rounded-sm transition-all duration-300 hover:border-accent`}
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xs bg-surface-raised">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 800px"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  {img.caption && (
                    <p className="mt-3 text-xs text-text-secondary font-sans border-t border-border pt-2 flex items-center justify-between">
                      <span>{img.caption}</span>
                      <span className="font-mono text-[10px] text-accent uppercase tracking-wider">
                        RENDER // 0{idx + 1}
                      </span>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section D Continued: Verified Schematic Architectural Drawings */}
        {project.drawings && project.drawings.length > 0 && (
          <section aria-label="Architectural Drawings" className="mb-20 sm:mb-28 border-t border-border pt-14">
            <div className="mb-12">
              <span className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-accent block mb-2">
                04 // ARCHITECTURAL SCHEMATICS
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-text-primary">
                Technical Floor Plans &amp; Spatial Linework
              </h2>
              <p className="mt-3 text-sm text-text-secondary font-sans max-w-2xl">
                Sanitized schematic drawings extracted directly from the verified design documents by CIVI ARCHER DESIGNS. Confidential title blocks and proprietary measurements have been sanitized for public presentation.
              </p>
            </div>

            <div className="space-y-16">
              {project.drawings.map((drawing, idx) => (
                <DrawingViewer key={drawing.id} drawing={drawing} index={idx} />
              ))}
            </div>
          </section>
        )}

        {/* Section D Continued: Functional Spatial Zoning & Circulation */}
        {project.spatialZoning && project.spatialZoning.length > 0 && (
          <section aria-label="Spatial Organization" className="mb-20 sm:mb-28 border-t border-border pt-14">
            <div className="mb-10">
              <span className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-accent block mb-2">
                05 // PROGRAMMATIC ZONING
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-text-primary">
                Functional Separation &amp; Circulation Logic
              </h2>
              <p className="mt-3 text-sm text-text-secondary font-sans max-w-2xl">
                Spatial analysis derived strictly from confirmed design plans, organizing daily living, formal entertaining, and retreat zones around the central daylight atrium.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.spatialZoning.map((zone) => (
                <div
                  key={zone.zone}
                  className="p-6 sm:p-7 bg-surface border border-border rounded-sm flex flex-col justify-between hover:border-accent/60 transition-colors"
                >
                  <div>
                    <h3 className="font-display text-xl text-text-primary mb-3">
                      {zone.zone}
                    </h3>
                    <p className="text-sm leading-relaxed text-text-secondary font-sans mb-6">
                      {zone.description}
                    </p>
                  </div>
                  <div className="border-t border-border pt-4">
                    <span className="text-[10px] uppercase tracking-widest text-text-tertiary block mb-2 font-semibold">
                      Incorporated Spaces
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {zone.rooms.map((room) => (
                        <span
                          key={room}
                          className="rounded-xs border border-border bg-surface-raised px-2.5 py-1 text-[11px] font-medium text-text-primary font-sans"
                        >
                          {room}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section E: Project Navigation & Contact CTA */}
        <footer className="border-t border-border pt-14 mt-16 space-y-12">
          {/* Previous & Next Project Navigation */}
          {(prevProject || nextProject) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {prevProject ? (
                <Link
                  href={`/work/${prevProject.slug}`}
                  className="group p-6 rounded-sm border border-border bg-surface hover:border-accent hover:bg-surface-raised transition-all flex flex-col justify-between outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span className="text-[11px] font-mono text-text-tertiary uppercase tracking-wider group-hover:text-accent transition-colors">
                    &larr; Previous Project
                  </span>
                  <span className="font-display text-xl sm:text-2xl text-text-primary mt-2">
                    {prevProject.title}
                  </span>
                  <span className="text-xs text-text-secondary mt-1">
                    {prevProject.category}
                  </span>
                </Link>
              ) : (
                <div className="hidden sm:block" />
              )}

              {nextProject ? (
                <Link
                  href={`/work/${nextProject.slug}`}
                  className="group p-6 rounded-sm border border-border bg-surface hover:border-accent hover:bg-surface-raised transition-all flex flex-col justify-between sm:items-end text-left sm:text-right outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span className="text-[11px] font-mono text-text-tertiary uppercase tracking-wider group-hover:text-accent transition-colors">
                    Next Project &rarr;
                  </span>
                  <span className="font-display text-xl sm:text-2xl text-text-primary mt-2">
                    {nextProject.title}
                  </span>
                  <span className="text-xs text-text-secondary mt-1">
                    {nextProject.category}
                  </span>
                </Link>
              ) : (
                <div className="hidden sm:block" />
              )}
            </div>
          )}

          {/* Editorial Studio Contact Call to Action */}
          <div className="border border-border rounded-sm bg-surface p-8 sm:p-12 text-center max-w-3xl mx-auto">
            <span className="text-xs font-mono text-accent uppercase tracking-[0.25em] block mb-3">
              ARCHITECTURAL PRACTICE &bull; COLLABORATION
            </span>
            <h3 className="font-display text-2xl sm:text-3xl text-text-primary">
              Have a Project in Mind?
            </h3>
            <p className="mt-3 text-sm text-text-secondary font-sans max-w-lg mx-auto">
              Discussing new commissions, spatial inquiries, or technical architectural consultations.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Button
                href="/#contact"
                variant="primary"
                size="md"
                className="text-xs uppercase tracking-wider font-semibold"
              >
                Initiate a Conversation &rarr;
              </Button>
              <Button
                href="/#projects"
                variant="outline"
                size="md"
                className="text-xs uppercase tracking-wider"
              >
                Return to Selected Works
              </Button>
            </div>
          </div>
        </footer>
      </Container>
    </article>
  );
}
