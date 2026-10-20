import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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
  return portfolioData.projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolioData.projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | Ar. Tausif Raza",
    };
  }

  return {
    title: `${project.title} | Ar. Tausif Raza`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
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
    <article className="min-h-screen bg-canvas text-text-primary pt-24 sm:pt-32 pb-24 font-sans">
      <Container>
        {/* Navigation Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center justify-between border-b border-border pb-6 mb-10"
        >
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-text-secondary hover:text-accent transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          >
            <span className="transition-transform group-hover:-translate-x-1">&larr;</span>
            <span>Back to Selected Works</span>
          </Link>
          <span className="text-xs font-mono text-text-tertiary uppercase">
            MONOGRAPH // {project.slug}
          </span>
        </nav>

        {/* 1. Project Introduction & Editorial Header */}
        <header className="mb-14 sm:mb-20">
          <Eyebrow variant="line" accentColor="brass" className="mb-4">
            {project.category} &bull; Case Study
          </Eyebrow>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-text-primary leading-[1.05]">
            {project.title}
          </h1>

          {project.subtitle && (
            <p className="mt-3 text-sm sm:text-base font-sans font-medium text-accent uppercase tracking-widest">
              {project.subtitle}
            </p>
          )}

          <p className="mt-6 max-w-3xl text-base sm:text-lg leading-relaxed text-text-secondary font-sans">
            {project.description}
          </p>

          {/* Verified Architectural Metadata Grid */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 border-t border-b border-border py-6 text-xs font-sans">
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
            {project.client && (
              <div>
                <span className="font-semibold text-text-tertiary uppercase tracking-wider block">
                  Client
                </span>
                <span className="text-sm font-medium text-text-primary mt-1 block">
                  {project.client}
                </span>
              </div>
            )}
            {project.practice && (
              <div>
                <span className="font-semibold text-text-tertiary uppercase tracking-wider block">
                  Practice
                </span>
                <span className="text-sm font-medium text-text-primary mt-1 block">
                  {project.practice}
                </span>
              </div>
            )}
            {project.architect && (
              <div>
                <span className="font-semibold text-text-tertiary uppercase tracking-wider block">
                  Architect
                </span>
                <span className="text-sm font-medium text-text-primary mt-1 block">
                  {project.architect}
                </span>
              </div>
            )}
            <div>
              <span className="font-semibold text-text-tertiary uppercase tracking-wider block">
                Documentation
              </span>
              <span className="text-sm font-mono text-accent mt-1 block">
                {project.drawings ? `${project.drawings.length} Architectural Plans` : "Studio Archive"}
              </span>
            </div>
          </div>
        </header>

        {/* Hero Visual Image if Available */}
        {project.coverImage && (
          <section aria-label="Project Hero Visual" className="mb-20 sm:mb-28">
            <div className="card-architectural relative overflow-hidden bg-surface p-3 sm:p-4 border border-border rounded-sm">
              {/* Drafting crosshairs */}
              <span className="absolute top-2 left-2 text-[10px] font-mono text-accent select-none pointer-events-none">
                +
              </span>
              <span className="absolute top-2 right-2 text-[10px] font-mono text-accent select-none pointer-events-none">
                +
              </span>
              <span className="absolute bottom-2 left-2 text-[10px] font-mono text-accent select-none pointer-events-none">
                +
              </span>
              <span className="absolute bottom-2 right-2 text-[10px] font-mono text-accent select-none pointer-events-none">
                +
              </span>

              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xs bg-surface-raised">
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
                  <span className="text-[10px] font-mono text-accent uppercase">
                    PRIMARY VISUAL // 01
                  </span>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 2. Architectural Overview */}
        {project.overview && project.overview.length > 0 && (
          <section aria-label="Architectural Overview" className="mb-20 sm:mb-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-border pt-12">
              <div className="lg:col-span-4">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent block mb-2">
                  01 // Overview
                </span>
                <h2 className="font-display text-2xl sm:text-3xl text-text-primary">
                  Architectural Intent &amp; Strategy
                </h2>
              </div>
              <div className="lg:col-span-8 space-y-5 text-sm sm:text-base leading-relaxed text-text-secondary font-sans">
                {project.overview.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 3 & 4. Verified Architectural Drawings (Floor Plans) */}
        {project.drawings && project.drawings.length > 0 && (
          <section aria-label="Architectural Floor Plans" className="mb-20 sm:mb-28 border-t border-border pt-12">
            <div className="mb-12">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent block mb-2">
                02 // Architectural Drawings
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-text-primary">
                Technical Floor Plans &amp; Dimensional Linework
              </h2>
              <p className="mt-3 text-sm text-text-secondary font-sans max-w-2xl">
                Extracted directly from the verified design documents by CIVI ARCHER DESIGNS. Dimensions, orientation, room labels, and annotations are preserved in their original state.
              </p>
            </div>

            <div className="space-y-16">
              {project.drawings.map((drawing, idx) => (
                <DrawingViewer key={drawing.id} drawing={drawing} index={idx} />
              ))}
            </div>
          </section>
        )}

        {/* 5. Spatial Organization & Functional Zoning */}
        {project.spatialZoning && project.spatialZoning.length > 0 && (
          <section aria-label="Spatial Organization" className="mb-20 sm:mb-28 border-t border-border pt-12">
            <div className="mb-10">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent block mb-2">
                03 // Spatial Organization
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-text-primary">
                Programmatic Zoning &amp; Circulation
              </h2>
              <p className="mt-3 text-sm text-text-secondary font-sans max-w-2xl">
                Analysis of the bungalow&apos;s spatial layout derived strictly from the confirmed floor plans, highlighting functional separations between formal, private, and wellness areas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.spatialZoning.map((zone) => (
                <div
                  key={zone.zone}
                  className="card-architectural p-6 sm:p-7 bg-surface border border-border rounded-sm flex flex-col justify-between"
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

        {/* 6. Architectural Render Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <section aria-label="Project Visual Gallery" className="mb-20 sm:mb-28 border-t border-border pt-12">
            <div className="mb-10">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent block mb-2">
                04 // Architectural Visualizations
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-text-primary">
                Exterior Perspectives &amp; Courtyard Landscape
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {project.gallery.map((img, idx) => (
                <div
                  key={idx}
                  className={`${
                    idx === 0
                      ? "lg:col-span-12"
                      : "lg:col-span-6"
                  } card-architectural overflow-hidden bg-surface p-3 border border-border rounded-sm`}
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xs bg-surface-raised">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 800px"
                      className="object-cover object-center transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  {img.caption && (
                    <p className="mt-3 text-xs text-text-secondary font-sans border-t border-border pt-2">
                      {img.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Source Documentation & Archive Notes */}
        {project.sourceNotes && (
          <section aria-label="Archive Documentation" className="mb-20 border-t border-border pt-12">
            <div className="card-architectural p-6 sm:p-8 bg-surface border border-border rounded-sm max-w-4xl">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent block mb-2">
                Archive Documentation &bull; Source Integrity
              </span>
              <p className="text-sm leading-relaxed text-text-secondary font-sans mb-4">
                {project.sourceNotes}
              </p>
              {project.externalLinks && project.externalLinks.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border">
                  <span className="text-xs uppercase tracking-wider text-text-tertiary block mb-2 font-medium">
                    Google Drive Source References (Permissions Required):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.externalLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1 text-xs border border-border bg-surface-raised text-text-secondary hover:text-accent hover:border-accent rounded-xs transition-colors"
                      >
                        <span>{link.label}</span>
                        <span className="text-[10px]">&nearr;</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 7. Previous & Next Project Navigation */}
        <footer className="border-t border-border pt-12 mt-16">
          {(prevProject || nextProject) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {prevProject ? (
                <Link
                  href={`/work/${prevProject.slug}`}
                  className="group p-6 rounded-sm border border-border bg-surface hover:border-accent hover:bg-surface-raised transition-all flex flex-col justify-between outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span className="text-[11px] font-mono text-text-tertiary uppercase tracking-wider group-hover:text-accent transition-colors">
                    &larr; Previous Monograph
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
                    Next Monograph &rarr;
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

          <div className="mt-12 flex justify-center">
            <Button
              href="/#work"
              variant="outline"
              size="md"
              className="uppercase tracking-widest text-xs"
            >
              &larr; Return to Selected Works
            </Button>
          </div>
        </footer>
      </Container>
    </article>
  );
}
