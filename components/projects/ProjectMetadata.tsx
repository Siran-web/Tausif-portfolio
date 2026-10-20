import React from "react";
import { cn } from "@/lib/utils";

export interface MetadataItem {
  label: string;
  value: React.ReactNode;
}

export interface ProjectMetadataProps {
  items: MetadataItem[];
  layout?: "grid" | "row" | "inline";
  className?: string;
}

export function ProjectMetadata({
  items,
  layout = "grid",
  className,
}: ProjectMetadataProps) {
  if (!items || items.length === 0) return null;

  if (layout === "inline") {
    return (
      <div
        className={cn(
          "flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-sans",
          className
        )}
      >
        {items.map((item, idx) => (
          <div key={item.label} className="flex items-center gap-2">
            {idx > 0 && (
              <span className="text-border select-none" aria-hidden="true">
                &bull;
              </span>
            )}
            <span className="text-text-tertiary uppercase tracking-wider font-medium">
              {item.label}:
            </span>
            <span className="text-text-primary font-semibold">{item.value}</span>
          </div>
        ))}
      </div>
    );
  }

  if (layout === "row") {
    return (
      <div
        className={cn(
          "divide-y divide-border border-y border-border font-sans text-sm",
          className
        )}
      >
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between py-2.5"
          >
            <span className="text-text-tertiary uppercase tracking-wider text-xs font-medium">
              {item.label}
            </span>
            <span className="text-text-primary font-semibold text-right">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 border-t border-border pt-4 font-sans",
        className
      )}
    >
      {items.map((item) => (
        <div key={item.label} className="flex flex-col">
          <dt className="text-[11px] font-semibold uppercase tracking-widest text-text-tertiary">
            {item.label}
          </dt>
          <dd className="mt-1 text-sm font-medium text-text-primary">
            {item.value}
          </dd>
        </div>
      ))}
    </div>
  );
}
