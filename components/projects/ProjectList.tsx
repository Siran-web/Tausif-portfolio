import React from "react";
import { ProjectGrid } from "./ProjectGrid";
import type { Project } from "@/data/portfolio";

export interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
  return <ProjectGrid projects={projects} />;
}

export { ProjectGrid };
