import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/data/portfolio";
import { ProjectMetadata } from "./ProjectMetadata";
import { Button } from "@/components/ui/Button";

export interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const metadataItems = [
    project.year ? { label: "Year", value: project.year } : null,
    project.typology ? { label: "Typology", value: project.typology } : null,
    project.location ? { label: "Location", value: project.location } : null,
    project.client
      ? { label: "Client", value: project.client }
      : project.role
      ? { label: "Role", value: project.role }
      : null,
  ].filter(Boolean) as { label: string; value: React.ReactNode }[];

  const targetHref = project.link || `/work/${project.slug}`;
  const displayImage = project.coverImage?.src || project.image;
  const imageAlt = project.coverImage?.alt || `${project.title} architectural visualization`;

  return (
    <article className="card-architectural group relative flex flex-col justify-between overflow-hidden bg-surface border border-border rounded-sm transition-all duration-300 hover:border-accent hover:shadow-2xl">
      {/* Architectural Visual Preview if available */}
      {displayImage && (
        <Link
          href={targetHref}
          className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-surface-raised block outline-none focus-visible:ring-2 focus-visible:ring-accent"
          tabIndex={-1}
          aria-hidden="true"
        >
          <Image
            src={displayImage}
            alt={imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
            className="object-cover object-center transition-transform duration-700 ease-out will-change-transform group-hover:scale-105"
          />
          {/* Subtle gradient overlay to enhance legibility and depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60" />

          {/* Corner Registration Mark */}
          <span className="absolute top-3 left-3 text-[10px] font-mono text-accent select-none pointer-events-none">
            +
          </span>
          <span className="absolute top-3 right-3 text-[10px] font-mono text-text-tertiary uppercase tracking-wider bg-canvas/80 backdrop-blur-xs px-2 py-0.5 rounded-xs border border-border">
            {project.category}
          </span>
        </Link>
      )}

      {/* Card Content */}
      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Subtitle */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
              {project.category}
            </span>
            <span className="text-[11px] font-mono text-text-tertiary">
              {project.year}
            </span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-normal tracking-tight text-text-primary group-hover:text-accent transition-colors duration-200">
            <Link
              href={targetHref}
              className="outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            >
              {project.title}
            </Link>
          </h3>

          {project.subtitle && (
            <p className="mt-1 text-xs font-sans font-medium text-text-tertiary uppercase tracking-wider">
              {project.subtitle}
            </p>
          )}

          <p className="mt-4 text-sm leading-relaxed text-text-secondary font-sans line-clamp-3">
            {project.description}
          </p>

          {/* Architectural Specification Tags */}
          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-sm border border-border bg-surface-raised px-2.5 py-1 text-[11px] font-medium tracking-wider text-text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 space-y-6">
          {/* Metadata Grid */}
          <ProjectMetadata items={metadataItems} layout="grid" />

          {/* Action Links */}
          <div className="flex items-center justify-between gap-4 pt-4 border-t border-border">
            <Button
              href={targetHref}
              variant="primary"
              size="sm"
              className="text-xs uppercase tracking-wider"
            >
              View Case Study &rarr;
            </Button>

            {project.drawings && project.drawings.length > 0 && (
              <span className="text-[11px] font-mono text-accent uppercase tracking-wider">
                {project.drawings.length} CAD Plans
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
