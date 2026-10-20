"use client";

import React, { useState, useMemo, useRef } from "react";
import type { Project } from "@/data/portfolio";
import { ProjectCard } from "./ProjectCard";
import { gsap, useGSAP } from "@/lib/gsap";

export interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const gridContainerRef = useRef<HTMLDivElement>(null);

  // Derive unique categories from active project data
  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ["All", ...Array.from(set)];
  }, [projects]);

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return projects;
    return projects.filter(
      (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [projects, selectedCategory]);

  // GSAP animation on filter change
  useGSAP(
    () => {
      if (!gridContainerRef.current) return;

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.set(".project-grid-item", {
          opacity: 1,
          y: 0,
          clearProps: "all",
        });
        return;
      }

      gsap.fromTo(
        ".project-grid-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.08,
          ease: "power2.out",
          overwrite: "auto",
        }
      );
    },
    { dependencies: [selectedCategory], scope: gridContainerRef }
  );

  return (
    <div className="space-y-10" ref={gridContainerRef}>
      {/* Category Filter Navigation Bar - only show if verified projects exist */}
      {projects.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
          <div
            role="tablist"
            aria-label="Filter architectural projects by category"
            className="flex flex-wrap items-center gap-2"
          >
            {categories.map((category) => {
              const isSelected = selectedCategory === category;
              const count =
                category === "All"
                  ? projects.length
                  : projects.filter(
                      (p) =>
                        p.category.toLowerCase() === category.toLowerCase()
                    ).length;

              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  id={`filter-tab-${category.toLowerCase().replace(/\s+/g, "-")}`}
                  aria-selected={isSelected}
                  aria-controls="project-grid-items"
                  onClick={() => setSelectedCategory(category)}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    isSelected
                      ? "bg-accent text-canvas shadow-xs font-bold"
                      : "border border-border bg-surface text-text-secondary hover:text-text-primary hover:border-accent hover:bg-surface-raised"
                  }`}
                >
                  <span>{category === "All" ? "All Projects" : category}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-xs font-mono ${
                      isSelected ? "bg-canvas/20 text-canvas" : "text-text-tertiary"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Total Project Counter / Spec Label */}
          <div className="text-xs font-mono text-text-tertiary tracking-wider hidden sm:block">
            SHOWING {filteredProjects.length} OF {projects.length} {projects.length === 1 ? "MONOGRAPH" : "MONOGRAPHS"}
          </div>
        </div>
      )}

      {/* Projects Grid Container */}
      <div
        id="project-grid-items"
        role="region"
        aria-live="polite"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8"
      >
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div
              key={project.slug}
              className={`project-grid-item col-span-1 ${
                filteredProjects.length === 1
                  ? "md:col-span-2 lg:col-span-8 lg:col-start-3"
                  : "md:col-span-1 lg:col-span-6"
              } flex flex-col`}
            >
              <ProjectCard project={project} />
            </div>
          ))
        ) : projects.length === 0 ? (
          <div className="col-span-12 py-16 text-center border border-dashed border-border rounded-sm bg-surface p-8">
            <p className="font-display text-xl text-text-primary mb-2">
              No Projects Available
            </p>
            <p className="text-sm text-text-secondary max-w-sm mx-auto">
              There are currently no verified architectural projects indexed in this portfolio.
            </p>
          </div>
        ) : (
          <div className="col-span-12 py-16 text-center border border-dashed border-border rounded-sm bg-surface p-8">
            <p className="font-display text-xl text-text-primary mb-2">
              No Projects Found
            </p>
            <p className="text-sm text-text-secondary max-w-sm mx-auto mb-6">
              There are currently no projects indexed under the &ldquo;{selectedCategory}&rdquo; category.
            </p>
            <button
              type="button"
              onClick={() => setSelectedCategory("All")}
              className="text-xs uppercase tracking-widest text-accent hover:underline font-semibold"
            >
              Reset to All Projects &rarr;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
