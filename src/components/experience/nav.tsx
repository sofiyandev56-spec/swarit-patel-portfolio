"use client";

import React from "react";
import { NAV_LINK } from "@/data/social";
import { STAR_PATH } from "@/lib/site";
import { ThemeToggle } from "@/components/experience/theme-toggle";

/** `offset` is how far into the act (as a fraction of its spacer) to land. */
const LINKS = [
  { id: "about", label: "About", href: "#about", offset: 0.06 },
  { id: "projects", label: "Projects", href: "#projects", offset: 0.5 },
  { id: "contact", label: "Contact", href: "#contact", offset: 0 },
];

/**
 * Brand and the email link at the top. The star before the name draws itself in
 * after the loader (CSS on html.is-ready). On desktop the chapter rail
 * (rail.tsx) is the navigation; on phones these three links become the pill
 * at the bottom of the screen, and the rail marks whichever one matches the
 * current act.
 */
export function Nav() {
  return (
    <nav className="nav" aria-label="Primary">
      <a className="nav-brand" href="#hero" data-magnetic="6">
        <svg className="brand-star" viewBox="-1.2 -1.2 2.4 2.4" aria-hidden="true">
          <path d={STAR_PATH} pathLength={1} />
        </svg>
        Swarit Patel
      </a>
      <div className="nav-links">
        {LINKS.map((l) => (
          <a key={l.id} href={l.href} data-nav={l.id} data-offset={l.offset || undefined} data-magnetic="6">
            {l.label}
          </a>
        ))}
      </div>
      <div className="nav-end">
        <ThemeToggle />
        <a className="nav-cv" href={NAV_LINK.href}>
          {NAV_LINK.label} ↗
        </a>
      </div>
    </nav>
  );
}
