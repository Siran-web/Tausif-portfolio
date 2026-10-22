/**
 * Centralized Navigation Coordinator for Ar. Tausif Raza Portfolio
 * 
 * Manages canonical section IDs, smooth scrolling offsets, observer locks,
 * and cross-route transitions between the Homepage and Project Detail pages.
 */

export const SECTION_IDS = ["home", "about", "projects", "contact"] as const;
export type SectionId = (typeof SECTION_IDS)[number];

// Programmatic scroll lock: prevents intermediate passing sections from hijacking
// the active navbar indicator while smooth scroll animation is actively in flight.
let isNavigating = false;
let navigationTimer: NodeJS.Timeout | null = null;

export function getIsNavigating(): boolean {
  return isNavigating;
}

export function setIsNavigating(val: boolean, durationMs: number = 850): void {
  isNavigating = val;
  if (navigationTimer) clearTimeout(navigationTimer);
  if (val) {
    navigationTimer = setTimeout(() => {
      isNavigating = false;
    }, durationMs);
  }
}

/**
 * Normalizes input section references, resolving legacy aliases (#hero -> home, #work -> projects)
 */
export function resolveSectionId(rawId: string): string {
  const cleaned = rawId.replace(/^#/, "").replace(/^\//, "").replace(/^#/, "").trim();
  if (cleaned === "hero") return "home";
  if (cleaned === "work") return "projects";
  return cleaned;
}

/**
 * Coordinates smooth scrolling to any target section on the homepage.
 * Accounts for 80px fixed navbar clearance, reduced-motion preferences,
 * and synchronization of browser history without jumping.
 */
export function scrollToSection(
  rawTargetId: string,
  options: {
    smooth?: boolean;
    updateHash?: boolean;
    onComplete?: (targetId: string) => void;
  } = {}
): boolean {
  if (typeof window === "undefined") return false;

  const targetId = resolveSectionId(rawTargetId);
  const targetElement = document.getElementById(targetId);

  if (!targetElement) return false;

  const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const shouldSmooth = (options.smooth ?? true) && !prefersReducedMotion;
  // Sticky navbar clearance: ~56px on mobile logo header, ~75px on desktop navbar
  const isMobile = window.innerWidth < 768;
  const headerOffset = isMobile ? 56 : 75;

  let targetY = 0;
  if (targetId !== "home") {
    const rect = targetElement.getBoundingClientRect();
    const currentScrollY =
      window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    targetY = Math.max(0, rect.top + currentScrollY - headerOffset);
  }

  // Lock scroll observer to prevent intermediate state flicker
  setIsNavigating(true, shouldSmooth ? 850 : 50);

  window.scrollTo({
    top: targetY,
    behavior: shouldSmooth ? "smooth" : "auto",
  });

  if (options.updateHash !== false) {
    if (window.location.hash !== `#${targetId}`) {
      window.history.pushState(null, "", `#${targetId}`);
    }
  }

  if (options.onComplete) {
    options.onComplete(targetId);
  }

  return true;
}
