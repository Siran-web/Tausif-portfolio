"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Container } from "./Container";
import { Button } from "@/components/ui/Button";
import { portfolioData } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const { personal, navigation } = portfolioData;
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Lock scroll detection during active programmatic smooth scrolls
  const isNavigatingRef = useRef(false);
  const navTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Coordinated smooth navigation to any target section from any scroll position.
   * Accounts for fixed navbar height, reduced-motion preferences, and updates history.
   */
  const scrollToTarget = useCallback((targetId: string, smooth: boolean = true) => {
    // Graceful aliases for legacy references: work -> projects, hero -> home
    const resolvedId =
      targetId === "work" ? "projects" : targetId === "hero" ? "home" : targetId;
    const targetElement = document.getElementById(resolvedId);

    if (!targetElement) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const shouldSmooth = smooth && !prefersReducedMotion;
    const headerOffset = 80; // Height of fixed navbar with breathing clearance

    // For home, target is top of document (0)
    let targetY = 0;
    if (resolvedId !== "home") {
      const rect = targetElement.getBoundingClientRect();
      const currentScrollY =
        window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      targetY = Math.max(0, rect.top + currentScrollY - headerOffset);
    }

    // Lock observer updates so intermediate passing sections don't hijack active state
    isNavigatingRef.current = true;
    setActiveSection(resolvedId);

    if (navTimeoutRef.current) {
      clearTimeout(navTimeoutRef.current);
    }

    window.scrollTo({
      top: targetY,
      behavior: shouldSmooth ? "smooth" : "auto",
    });

    // Keep URL hash synchronized without jumping
    if (typeof window !== "undefined" && window.location.hash !== `#${resolvedId}`) {
      window.history.pushState(null, "", `#${resolvedId}`);
    }

    // Release navigation lock once smooth scroll has settled
    navTimeoutRef.current = setTimeout(
      () => {
        isNavigatingRef.current = false;
      },
      shouldSmooth ? 850 : 50
    );
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.slice(1);
      scrollToTarget(targetId, true);

      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }
  };

  // Passive scroll handler & deterministic active section tracking
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY =
        window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(currentScrollY > 50);

      // Skip observer overrides while programmatic navigation is animating
      if (isNavigatingRef.current) return;

      // 1. User is at the top of the page
      if (currentScrollY < 120) {
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
      const readingLine = currentScrollY + 140; // comfortable view line below navbar
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

    // Handle browser Back / Forward buttons
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        scrollToTarget(hash, true);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handleHashChange);

    // Deep link on initial page load
    if (typeof window !== "undefined" && window.location.hash) {
      const initialHash = window.location.hash.replace("#", "");
      setTimeout(() => {
        scrollToTarget(initialHash, false);
      }, 100);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handleHashChange);
      if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    };
  }, [scrollToTarget]);

  // Keyboard accessibility for mobile menu (Escape key, Focus management, Scroll lock)
  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = "";
      return undefined;
    }

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }

      // Focus trap inside drawer
      if (e.key === "Tab" && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length > 0) {
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <header
      id="site-header"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out",
        isScrolled
          ? "border-b border-border bg-canvas/90 backdrop-blur-md shadow-xs py-3.5 sm:py-4"
          : "border-b border-transparent bg-transparent py-5 sm:py-6"
      )}
    >
      <Container className="flex items-center justify-between">
        {/* Architect Wordmark / Brand */}
        <Link
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="group flex items-baseline gap-2 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas rounded-sm py-1"
          aria-label={`${personal.name} Studio Home`}
        >
          <span className="font-display text-xl sm:text-2xl font-normal tracking-tight text-text-primary group-hover:text-accent transition-colors">
            {personal.name}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-accent inline-block transition-transform group-hover:scale-125" />
          <span className="hidden sm:inline-block text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-text-tertiary">
            Studio
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-8"
        >
          {navigation.map((item) => {
            const sectionTarget = item.href.replace("#", "");
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

        {/* Mobile Hamburger Trigger */}
        <div className="flex md:hidden items-center gap-3">
          <button
            ref={menuButtonRef}
            type="button"
            id="mobile-menu-toggle"
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            onClick={() => setMobileMenuOpen(true)}
            className="inline-flex items-center justify-center p-2 rounded-sm border border-border bg-surface text-text-primary hover:bg-surface-raised focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas outline-none transition-colors"
          >
            <span className="sr-only">Open Navigation</span>
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.75"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </Container>

      {/* Mobile Menu Backdrop & Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Drawer"
        >
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-canvas/80 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <div
            ref={drawerRef}
            id="mobile-navigation-drawer"
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-surface border-l border-border p-6 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-in-out"
          >
            <div>
              {/* Drawer Header with Clear Close Action */}
              <div className="flex items-center justify-between border-b border-border pb-5">
                <span className="font-display text-lg text-text-primary">
                  {personal.name}
                </span>
                <button
                  ref={closeButtonRef}
                  type="button"
                  id="mobile-menu-close"
                  aria-label="Close navigation menu"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    menuButtonRef.current?.focus();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-border bg-surface-raised text-xs font-semibold uppercase tracking-wider text-text-primary hover:bg-surface focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas outline-none transition-colors"
                >
                  <span>Close</span>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="mt-8 flex flex-col space-y-4 font-sans">
                {navigation.map((item) => {
                  const sectionTarget = item.href.replace("#", "");
                  const isActive = activeSection === sectionTarget;

                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between py-3 px-3 rounded-sm border transition-all outline-none",
                        "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
                        isActive
                          ? "border-accent/40 bg-surface-raised text-text-primary font-bold shadow-xs"
                          : "border-transparent text-text-secondary hover:text-text-primary hover:bg-surface-raised/50"
                      )}
                    >
                      <span className="text-sm font-semibold uppercase tracking-widest">
                        {item.label}
                      </span>
                      {isActive ? (
                        <span className="h-2 w-2 rounded-full bg-accent" />
                      ) : (
                        <span className="text-border text-sm">&rarr;</span>
                      )}
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Footer Actions */}
            <div className="pt-6 border-t border-border">
              <p className="text-xs text-text-tertiary mb-4 font-sans">
                {personal.role} &bull; {personal.location}
              </p>
              <Button
                href="#contact"
                onClick={(e) =>
                  handleNavClick(
                    e as unknown as React.MouseEvent<HTMLAnchorElement>,
                    "#contact"
                  )
                }
                variant="primary"
                size="md"
                className="w-full uppercase tracking-wider text-xs"
              >
                Initiate Project Commission &rarr;
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
