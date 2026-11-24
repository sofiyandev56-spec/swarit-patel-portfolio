"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { scrollState } from "@/lib/scroll-state";

const WORDS = ["Curious", "Hands-on", "Persistent", "Building"];

/** Seconds the counter takes on a first visit: ~1.1s per word, long enough to read. */
const FULL = 4.4;
/** On a reload within the same session the intro is a short reprise. */
const REPRISE = 1.8;
/** Held on 100 before the dissolve. */
const HOLD = 0.5;
const SEEN_KEY = "star-intro-seen";

/**
 * The opening: four words in the centre, one after another, while a serif
 * counter runs to 100 and a mint line fills along the bottom. The word on
 * screen is derived from the counter's own timeline, so the two can never
 * drift apart, and each word crossfades into the next (all four are in the
 * DOM; CSS moves them between past, current and next).
 *
 * The first visit in a session plays it in full; a reload in the same session
 * gets a short reprise that lands straight on the last word. Scrolling is
 * locked until it is done; then the screen dissolves into a grid of shrinking
 * dots (the .dither mask) while the cosmos settles in beneath, and
 * `html.is-ready` starts the chrome drawing itself in. Under reduced motion it
 * is dismissed at once. The whole thing is decorative, so it is hidden from
 * assistive technology.
 */
export function Loader() {
  const ref = useRef<HTMLDivElement>(null);
  const [word, setWord] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = ref.current;
    const count = root?.querySelector<HTMLElement>(".loader-count");
    const bar = root?.querySelector<HTMLElement>(".loader-bar");

    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      // Storage blocked: always play the full intro.
    }
    const duration = seen ? REPRISE : FULL;
    const firstWord = seen ? WORDS.length - 1 : 0;

    let finished = false;
    let dissolve: gsap.core.Tween | null = null;
    const finish = () => {
      if (finished) return;
      finished = true;
      // Only an intro that actually played through counts as seen.
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        // Storage blocked: nothing to remember.
      }
      scrollState.ready = true;
      document.documentElement.classList.remove("is-loading");
      document.documentElement.classList.add("is-ready");
      getLenis()?.start();
      if (reduce || !root) {
        setDone(true);
        return;
      }
      const dots = { go: 100 };
      dissolve = gsap.to(dots, {
        go: 0,
        duration: 1,
        ease: "power2.inOut",
        onUpdate: () => root.style.setProperty("--go", `${dots.go.toFixed(1)}%`),
        onComplete: () => setDone(true),
      });
    };

    if (reduce) {
      finish();
      return;
    }

    // The story starts at the top, even on reload.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    document.documentElement.classList.add("is-loading");
    window.scrollTo(0, 0);

    // A hidden or throttled tab starves the ticker; never hold the page
    // hostage to it — the loader ends a few seconds after it should have.
    const safety = window.setTimeout(finish, (duration + HOLD + 3) * 1000);

    const state = { n: 0 };
    // -1 so the first tick sets the opening word (the reprise opens on the
    // last one); every word starts invisible, so nothing flashes before it.
    let shown = -1;
    const slot = duration / (WORDS.length - firstWord);
    const tl = gsap.timeline({ onComplete: finish });
    tl.to(state, {
      n: 100,
      duration,
      ease: "power1.inOut",
      onUpdate: () => {
        if (count) count.textContent = String(Math.round(state.n)).padStart(3, "0");
        if (bar) bar.style.transform = `scaleX(${(state.n / 100).toFixed(4)})`;
        const next = Math.min(WORDS.length - 1, firstWord + Math.floor(tl.time() / slot));
        if (next !== shown) {
          shown = next;
          setWord(next);
        }
      },
    });
    tl.to({}, { duration: HOLD });

    return () => {
      tl.kill();
      dissolve?.kill();
      window.clearTimeout(safety);
      document.documentElement.classList.remove("is-loading");
    };
  }, []);

  return (
    <div ref={ref} className={`loader dither ${done ? "done" : ""}`} aria-hidden="true">
      <span className="loader-brand">Swarit Patel</span>
      <span className="loader-words serif">
        {WORDS.map((w, i) => (
          <span
            key={w}
            className={`loader-word ${i === word ? "on" : i < word ? "past" : ""}`}
          >
            {w}
          </span>
        ))}
      </span>
      <span className="loader-count serif">000</span>
      <span className="loader-bar" />
    </div>
  );
}
