import React from "react";
import Link from "next/link";
import { Container } from "./Container";
import { portfolioData } from "@/data/portfolio";

export function Footer() {
  const { personal, socials, navigation } = portfolioData;
  const currentYear = 2026;

  return (
    <footer className="mt-auto border-t border-border bg-canvas pt-16 pb-12 font-sans">
      <Container>
        <div className="grid grid-cols-1 gap-10 pb-12 md:grid-cols-12 md:gap-8 border-b border-border">
          {/* Brand & Studio Summary */}
          <div className="md:col-span-5">
            <Link
              href="/"
              className="inline-flex items-baseline gap-1 text-2xl font-display text-text-primary outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            >
              <span>{personal.name}</span>
              <span className="text-accent">&bull;</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-secondary">
              Architectural design, interior architecture, and thoughtful built-environment space planning. Translating vision into purposeful, evocative spaces.
            </p>
            <p className="mt-3 text-xs uppercase tracking-widest text-text-tertiary">
              {personal.location}
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-text-primary mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect / Socials */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-text-primary mb-4">
              Connect
            </h4>
            <div className="flex flex-col space-y-2.5">
              <a
                href={`mailto:${personal.email}`}
                className="text-sm text-text-secondary hover:text-accent transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              >
                {personal.email}
              </a>
              <div className="flex items-center space-x-5 pt-2">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-wider font-medium text-text-secondary hover:text-text-primary transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 text-xs text-text-tertiary sm:flex-row sm:items-center">
          <p>© {currentYear} {personal.name} Studio. All rights reserved.</p>
          <p className="tracking-wide">
            Designed with Obsidian, Linen &amp; Antique Brass.
          </p>
        </div>
      </Container>
    </footer>
  );
}
