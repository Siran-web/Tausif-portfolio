"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Container } from "./Container";
import { Button } from "@/components/ui/Button";
import { portfolioData } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import {
  scrollToSection,
  resolveSectionId,
  getIsNavigating,
} from "@/lib/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();

  // Hide the main header/navbar completely on individual project detail pages
  // (Project detail pages use their own dedicated sticky "← RETURN TO SELECTED WORKS" bar)
  const isProjectDetailPage = pathname?.startsWith("/work/");

  const { personal, navigation } = portfolioData;
  const [activeSection, setActiveSection] = useState<string>("home");

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = resolveSectionId(href);

    if (pathname === "/") {
      scrollToSection(targetId, {
        smooth: true,
        onComplete: (id) => setActiveSection(id),
      });
    } else {
      router.push(`/#${targetId}`);
    }
  };

  // Passive scroll handler & deterministic active section tracking
  useEffect(() => {
    if (isProjectDetailPage) return;

    const handleScroll = () => {
      const currentScrollY =
        window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

      // Skip observer overrides while programmatic navigation is actively animating
      if (getIsNavigating()) return;

      // 1. User is at the top of the page
      if (currentScrollY < 100) {
        setActiveSection("home");
        return;
      }

      // 2. User is near the bottom of the page (guarantee Contact is active)
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      if (currentScrollY + windowHeight >= docHeight - 70) {
        setActiveSection("contact");
        return;
      }

      // 3. Evaluate sections in order from bottom to top
      const readingLine = currentScrollY + 120;
      const sectionOrder = ["contact", "projects", "about", "home"] as const;

      for (const id of sectionOrder) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + currentScrollY;
          if (readingLine >= top) {
            setActiveSection(id);
            return;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Handle deep-link scrolling with retry to ensure DOM and GSAP instances have mounted
    const attemptScrollToHash = (retries = 3, delay = 60) => {
      if (typeof window === "undefined") return;
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;
      const targetId = resolveSectionId(hash);
      const success = scrollToSection(targetId, {
        smooth: true,
        onComplete: (id) => setActiveSection(id),
      });
      if (!success && retries > 0) {
        setTimeout(() => attemptScrollToHash(retries - 1, delay * 1.5), delay);
      }
    };

    const handleHashEvent = () => attemptScrollToHash(2, 50);

    window.addEventListener("hashchange", handleHashEvent);
    window.addEventListener("popstate", handleHashEvent);

    if (typeof window !== "undefined" && window.location.hash) {
      attemptScrollToHash(3, 80);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashEvent);
      window.removeEventListener("popstate", handleHashEvent);
    };
  }, [isProjectDetailPage]);

  // If on project detail route, render nothing (navbar completely hidden)
  if (isProjectDetailPage) {
    return null;
  }

  return (
    <header
      id="site-header"
      className="sticky top-0 z-50 w-full border-b border-border bg-[#111210]/95 bg-canvas/95 backdrop-blur-md py-3.5 sm:py-5 transition-colors"
    >
      <Container className="flex items-center justify-between">
        {/* Personal Brand Logo / Architect Wordmark */}
        <Link
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="group flex items-baseline outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas rounded-sm py-1 shrink-0"
          aria-label={`${personal.name} Home`}
        >
          <span className="font-display text-lg sm:text-2xl font-normal tracking-tight text-text-primary group-hover:text-accent transition-colors">
            {personal.name}
          </span>
        </Link>

        {/* Desktop Navigation (Hidden on mobile < md, visible on desktop >= md) */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-8"
        >
          {navigation.map((item) => {
            const sectionTarget = resolveSectionId(item.href);
            const isActive = activeSection === sectionTarget;

            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative py-1 text-xs font-semibold uppercase tracking-[0.18em] transition-colors outline-none",
                  "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas rounded-sm",
                  isActive
                    ? "text-text-primary font-bold"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent rounded-full transition-all duration-200"
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}

          <Button
            href="#contact"
            onClick={(e) =>
              handleNavClick(
                e as unknown as React.MouseEvent<HTMLAnchorElement>,
                "#contact"
              )
            }
            variant="primary"
            size="sm"
            magnetic
            className="text-xs uppercase tracking-wider ml-2"
          >
            Inquire
          </Button>
        </nav>
      </Container>
    </header>
  );
}
