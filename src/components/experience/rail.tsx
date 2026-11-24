"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { scrollState } from "@/lib/scroll-state";

/** `offset` is how far into the act (as a fraction of its spacer) to land. */
const CHAPTERS = [
  { id: "hero", n: "01", label: "Star", offset: 0 },
  { id: "about", n: "02", label: "About", offset: 0.06 },
  { id: "projects", n: "03", label: "Projects", offset: 0.5 },
  { id: "contact", n: "04", label: "Contact", offset: 0 },
];

/**
 * The chapter rail: four ticks on the chart's left rule, one per act. The
 * tick of the act the reader is in grows and shows its label; hovering any
 * tick shows its label too. Anchors go through the page's Lenis handler.
 *
 * On phones the rail is hidden and the pill nav (nav.tsx) takes over, so the
 * active state is mirrored onto the pill's links; the hero highlights
 * nothing there, since the pill has no link for it.
 */
export function Rail() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const links = Array.from(root.querySelectorAll<HTMLAnchorElement>("a[data-nav]"));
      const pill = Array.from(document.querySelectorAll<HTMLAnchorElement>(".nav-links a[data-nav]"));
      let current = "";

      const tick = () => {
        const s = scrollState;
        let next = "hero";
        if (s.outro > 0.55 || s.contact > 0) next = "contact";
        else if (s.projHeader > 0.05) next = "projects";
        else if (s.traverse > 0.6) next = "about";
        if (next === current) return;
        current = next;
        links.forEach((l) => l.classList.toggle("on", l.dataset.nav === next));
        pill.forEach((l) => l.classList.toggle("on", l.dataset.nav === next));
      };
      gsap.ticker.add(tick);
      return () => gsap.ticker.remove(tick);
    },
    { scope: ref }
  );

  return (
    <nav ref={ref} className="rail" aria-label="Chapters">
      {CHAPTERS.map((c) => (
        <a key={c.id} href={`#${c.id}`} data-nav={c.id} data-offset={c.offset || undefined}>
          <i aria-hidden="true" />
          <em>
            <b>{c.n}</b>
            {c.label}
          </em>
        </a>
      ))}
    </nav>
  );
}
