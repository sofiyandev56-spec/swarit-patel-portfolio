"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { scrollToTarget, setLenisInstance } from "@/lib/lenis";

/**
 * Scroll physics for the whole page.
 *
 * Lenis smooths wheel input with a fixed-duration exponential ease and is
 * driven from GSAP's ticker, so the scroll position, every ScrollTrigger and
 * the cosmos canvas advance on one clock. Touch devices and reduced-motion
 * users scroll natively; ScrollTrigger listens to native scroll on its own.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(pointer: coarse)").matches;

    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    if (!reduce && !touch) {
      lenis = new Lenis({
        duration: 1.45,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.9,
      });
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time: number) => lenis!.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      setLenisInstance(lenis);
    }

    // In-page anchors go through the same physics as everything else. An act
    // begins the moment its spacer reaches the top of the viewport, so a link
    // may carry `data-offset`, a fraction of the target's height, to land a
    // little way into it rather than on its first, still-empty frame.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      const anchor = (e.target as HTMLElement)?.closest("a");
      const href = anchor?.getAttribute("href");
      if (!href || !href.startsWith("#") || href.length < 2) return;
      const el = document.querySelector<HTMLElement>(href);
      if (!el) return;
      e.preventDefault();
      const fraction = Number(anchor?.dataset.offset) || 0;
      scrollToTarget(el, { offset: fraction * el.offsetHeight });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      if (tick) gsap.ticker.remove(tick);
      setLenisInstance(null);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
