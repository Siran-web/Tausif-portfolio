import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/data/portfolio";
import { Button } from "@/components/ui/Button";

export interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const targetHref = project.link || `/work/${project.slug}`;
  const displayImage = project.coverImage?.src || project.image;
  const imageAlt = project.coverImage?.alt || `${project.title} architectural visualization`;
  const formattedIndex = String(index + 1).padStart(2, "0");
  const isEven = index % 2 === 1;

  return (
    <article
      className="group relative overflow-hidden rounded-sm border border-border bg-surface transition-all duration-300 hover:border-accent hover:shadow-2xl"
      aria-labelledby={`project-title-${project.slug}`}
    >
      <div className={`grid grid-cols-1 lg:grid-cols-12 items-stretch ${isEven ? "lg:flex-row-reverse" : ""}`}>
        {/* Architectural Visual Preview */}
        {displayImage && (
          <div
            className={`relative lg:col-span-7 overflow-hidden border-b lg:border-b-0 ${
              isEven ? "lg:col-start-6 lg:border-l border-border" : "lg:border-r border-border"
            } bg-surface-raised min-h-[300px] sm:min-h-[400px] lg:min-h-[460px]`}
          >
            <Link
              href={targetHref}
              className="relative block h-full w-full outline-none focus-visible:ring-2 focus-visible:ring-accent"
              tabIndex={-1}
              aria-hidden="true"
            >
              <Image
                src={displayImage}
                alt={imageAlt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center transition-transform duration-700 ease-out will-change-transform group-hover:scale-105"
                priority={index === 0}
              />
              {/* Subtle dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-surface/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-surface/40" />

              {/* Architectural drafting marks */}
              <span className="absolute top-3.5 left-3.5 text-xs font-mono text-accent select-none pointer-events-none">
                +
              </span>
              <span className="absolute top-3.5 right-3.5 text-xs font-mono text-accent select-none pointer-events-none">
                +
              </span>
              <span className="absolute bottom-3.5 left-3.5 text-xs font-mono text-accent select-none pointer-events-none">
                +
              </span>

              {/* Status and Category Pill Overlay */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-text-primary bg-canvas/85 backdrop-blur-xs px-2.5 py-1 rounded-xs border border-border">
                  {project.category}
                </span>
                {project.status && (
                  <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-wider text-accent bg-canvas/90 backdrop-blur-xs px-2.5 py-1 rounded-xs border border-border">
                    {project.status.includes("Complete") ? "Documented" : "Active"}
                  </span>
                )}
              </div>
            </Link>
          </div>
        )}

        {/* Narrative & Specification Column */}
        <div
          className={`lg:col-span-5 p-7 sm:p-9 lg:p-10 flex flex-col justify-between ${
            isEven ? "lg:col-start-1 lg:row-start-1" : ""
          }`}
        >
          <div>
            {/* Header / Editorial Index & Tag */}
            <div className="flex items-center justify-between gap-4 border-b border-border pb-4 mb-6">
              <span className="font-mono text-xs font-semibold text-accent tracking-[0.25em]">
                INDEX // {formattedIndex}
              </span>
              <span className="text-xs font-mono text-text-tertiary uppercase tracking-wider">
                {project.location} &bull; {project.year}
              </span>
            </div>

            {/* Title & Subtitle */}
            <h3
              id={`project-title-${project.slug}`}
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-text-primary group-hover:text-accent transition-colors duration-200"
            >
              <Link
                href={targetHref}
                className="outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm block"
              >
                {project.title}
              </Link>
            </h3>

            {project.subtitle && (
              <p className="mt-2 text-xs font-sans font-medium text-text-tertiary uppercase tracking-wider">
                {project.subtitle}
              </p>
            )}

            {/* Concept Narrative */}
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-text-secondary font-sans">
              {project.description}
            </p>

            {/* Architectural Specification Tags */}
            <div className="mt-6 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-sm border border-border bg-surface-raised px-2.5 py-1 text-[11px] font-mono tracking-wider text-text-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Architectural Highlights / Spec Summary */}
            <div className="mt-6 pt-5 border-t border-border grid grid-cols-2 gap-3 text-xs font-sans">
              <div>
                <span className="block text-[10px] font-mono uppercase tracking-widest text-text-tertiary">
                  Typology
                </span>
                <span className="font-medium text-text-primary mt-0.5 block">
                  {project.typology}
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-mono uppercase tracking-widest text-text-tertiary">
                  Discipline
                </span>
                <span className="font-medium text-text-primary mt-0.5 block">
                  {project.role}
                </span>
              </div>
            </div>
          </div>

          {/* Action Links & CAD Status */}
          <div className="mt-8 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
            <Button
              href={targetHref}
              variant="primary"
              size="sm"
              className="text-xs uppercase tracking-wider font-semibold"
            >
              Explore Project &rarr;
            </Button>

            {project.drawings && project.drawings.length > 0 && (
              <Link
                href={targetHref}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-accent hover:text-text-primary transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span>{project.drawings.length} Schematic Plans Available</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
