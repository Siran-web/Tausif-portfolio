import React from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";
import { TextReveal } from "@/components/animations/TextReveal";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center" | "split";
  size?: "sm" | "md" | "lg";
  animateTitle?: boolean;
  className?: string;
  id?: string;
}

const titleSizes = {
  sm: "text-2xl sm:text-3xl md:text-4xl",
  md: "text-3xl sm:text-4xl md:text-5xl",
  lg: "text-4xl sm:text-5xl md:text-6xl",
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  size = "md",
  animateTitle = false,
  className,
  id,
}: SectionHeadingProps) {
  const titleClass = cn(
    "font-display font-normal text-text-primary tracking-tight leading-[1.1]",
    titleSizes[size]
  );

  const renderedTitle =
    animateTitle && typeof title === "string" ? (
      <TextReveal
        text={title}
        as="h2"
        id={id}
        className={titleClass}
        triggerOnScroll={true}
        duration={0.8}
        stagger={0.04}
      />
    ) : (
      <h2 id={id} className={titleClass}>
        {title}
      </h2>
    );

  if (align === "split") {
    return (
      <div
        className={cn(
          "grid grid-cols-1 gap-6 pb-8 md:grid-cols-12 md:items-end border-b border-border mb-12",
          className
        )}
      >
        <div className="md:col-span-7">
          {eyebrow && (
            <Eyebrow variant="line" className="mb-3">
              {eyebrow}
            </Eyebrow>
          )}
          {renderedTitle}
        </div>
        {description && (
          <div className="md:col-span-5 md:pl-6">
            <p className="text-sm sm:text-base leading-relaxed text-text-secondary font-sans">
              {description}
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "mb-12",
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
        className
      )}
    >
      {eyebrow && (
        <Eyebrow
          variant="line"
          className={cn("mb-3", align === "center" && "justify-center")}
        >
          {eyebrow}
        </Eyebrow>
      )}
      {renderedTitle}
      {description && (
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-text-secondary font-sans">
          {description}
        </p>
      )}
    </div>
  );
}
