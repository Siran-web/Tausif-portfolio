"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Container } from "./Container";
import { portfolioData } from "@/data/portfolio";
import { scrollToSection, resolveSectionId } from "@/lib/navigation";

export function Footer() {
  const { personal, socials, navigation } = portfolioData;
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";
  const currentYear = 2026;

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    const targetId = resolveSectionId(href);

    if (isHomePage) {
      e.preventDefault();
      scrollToSection(targetId, { smooth: true });
    } else {
      // From project detail route, navigate to homepage section
      e.preventDefault();
      router.push(`/#${targetId}`);
    }
  };

  const handleBrandClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHomePage) {
      e.preventDefault();
      scrollToSection("home", { smooth: true });
    }
  };

  return (
    <footer className="mt-auto border-t border-border bg-canvas pt-16 pb-12 font-sans">
      <Container>
        <div className="grid grid-cols-1 gap-10 pb-12 md:grid-cols-12 md:gap-8 border-b border-border">
          {/* Personal Brand & Bio */}
          <div className="md:col-span-5">
            <Link
              href="/"
              onClick={handleBrandClick}
              className="inline-flex items-baseline text-2xl font-display text-text-primary outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              aria-label={`${personal.name} Home`}
            >
              <span>{personal.name}</span>
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
              {navigation.map((item) => {
                const targetId = resolveSectionId(item.href);
                const computedHref = isHomePage ? `#${targetId}` : `/#${targetId}`;

                return (
                  <li key={item.href}>
                    <a
                      href={computedHref}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="text-sm text-text-secondary hover:text-text-primary transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Connect / Socials */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-text-primary mb-4">
              Connect
            </h4>
            <div className="flex flex-col space-y-2.5">
              {/* Email & Gmail Compose */}
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                <a
                  href={personal.mailtoUrl}
                  className="text-sm text-text-secondary hover:text-accent transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                  aria-label={`Send direct email to ${personal.email}`}
                >
                  {personal.email}
                </a>
                <span className="text-text-tertiary text-xs" aria-hidden="true">
                  &bull;
                </span>
                <a
                  href={personal.gmailComposeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-accent hover:text-accent-hover underline decoration-accent/40 hover:decoration-accent underline-offset-2 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                  aria-label={`Open Gmail compose to ${personal.email} in a new tab`}
                >
                  Open in Gmail
                </a>
              </div>

              {/* Phone Number */}
              <div>
                <a
                  href={personal.phoneTel}
                  className="text-sm text-text-secondary hover:text-accent transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                  aria-label={`Call ${personal.phone}`}
                >
                  {personal.phone}
                </a>
              </div>

              {/* Socials / External Links */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.name} (opens in a new tab)`}
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
          <p>© {currentYear} {personal.name}. All rights reserved.</p>
          <p className="tracking-wide">
            Designed with Obsidian, Linen &amp; Antique Brass.
          </p>
        </div>
      </Container>
    </footer>
  );
}
