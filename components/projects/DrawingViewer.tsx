"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import type { DrawingItem } from "@/data/portfolio";
import { Button } from "@/components/ui/Button";

export interface DrawingViewerProps {
  drawing: DrawingItem;
  index: number;
}

export function DrawingViewer({ drawing, index }: DrawingViewerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    if (!isModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  return (
    <div className="space-y-6">
      {/* Drawing Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-border pb-4">
        <div>
          <span className="text-[11px] font-mono text-accent uppercase tracking-widest block mb-1">
            DRAWING // 0{index + 1}
          </span>
          <h3 className="font-display text-2xl sm:text-3xl text-text-primary">
            {drawing.title}
          </h3>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono text-text-tertiary">
          {drawing.date && <span>DATE: {drawing.date}</span>}
          <span>&bull;</span>
          <span>AUTOCAD ARCHITECTURAL DWG</span>
        </div>
      </div>

      {drawing.description && (
        <p className="text-sm leading-relaxed text-text-secondary font-sans max-w-3xl">
          {drawing.description}
        </p>
      )}

      {/* Drawing Container with Framing and Drafting Registration Marks */}
      <div className="card-architectural relative overflow-hidden bg-surface p-2 sm:p-4 border border-border rounded-sm group">
        {/* Corner registration marks */}
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

        {/* Plan Preview */}
        <div
          onClick={() => setIsModalOpen(true)}
          className="relative aspect-[16/11] sm:aspect-[16/10] w-full overflow-hidden rounded-xs bg-white cursor-zoom-in group/img"
        >
          <Image
            src={drawing.src}
            alt={drawing.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 1200px"
            className="object-contain object-center transition-transform duration-500 group-hover/img:scale-[1.02]"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-canvas/0 group-hover/img:bg-canvas/10 transition-colors flex items-center justify-center pointer-events-none">
            <span className="opacity-0 group-hover/img:opacity-100 transition-opacity bg-canvas/90 text-text-primary border border-border px-3.5 py-1.5 rounded-sm text-xs uppercase tracking-wider font-semibold shadow-lg">
              Click to Inspect Full 4K Linework &rarr;
            </span>
          </div>
        </div>

        {/* Caption Bar & Expand Action */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs font-sans text-text-tertiary pt-2 border-t border-border">
          <p className="text-[11px] text-text-secondary italic">
            {drawing.alt}
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            className="text-[11px] uppercase tracking-wider py-1 px-3"
          >
            Enlarge High-Res Plan
          </Button>
        </div>
      </div>

      {/* Verified Space Schedule derived strictly from the drawings */}
      {drawing.spaces && drawing.spaces.length > 0 && (
        <div className="mt-6 border border-border bg-surface p-5 rounded-sm">
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">
            Identified Spaces &bull; Dimensional Schedule
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 text-xs font-sans">
            {drawing.spaces.map((sp) => (
              <div
                key={sp.name}
                className="p-2.5 rounded-xs bg-surface-raised border border-border/70 flex flex-col justify-between"
              >
                <span className="font-medium text-text-primary">
                  {sp.name}
                </span>
                {sp.dimension && (
                  <span className="font-mono text-[11px] text-accent mt-1">
                    {sp.dimension}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* High-Resolution Zoom Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${drawing.title} full resolution inspection`}
          className="fixed inset-0 z-50 flex flex-col bg-canvas/95 backdrop-blur-md p-4 sm:p-6"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
            <div>
              <h4 className="font-display text-xl text-text-primary">
                {drawing.title} — High-Resolution CAD Drawing
              </h4>
              <p className="text-xs text-text-tertiary font-mono">
                Preserving original room labels, linework, and dimensional annotations
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(false)}
              className="text-xs uppercase tracking-wider"
            >
              Close (Esc) &times;
            </Button>
          </div>

          {/* Modal Image Viewport */}
          <div className="relative flex-1 w-full overflow-auto rounded-sm bg-white border border-border flex items-center justify-center p-2">
            <div className="relative min-w-[1000px] sm:min-w-[1400px] min-h-[700px] w-full h-full">
              <Image
                src={drawing.src}
                alt={drawing.alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
