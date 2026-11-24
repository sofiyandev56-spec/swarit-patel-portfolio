"use client";

import { useSyncExternalStore } from "react";

/**
 * Light / dark theme.
 *
 * The resolved theme is always written to <html data-theme="light|dark">, and
 * every colour in globals.css (and the cosmos canvas) reads from it.
 *
 * Where it comes from:
 *  1. A choice the visitor made with the toggle, saved in localStorage.
 *  2. Otherwise the operating system's preference, followed live.
 *
 * Picking the theme the OS already uses clears the saved choice, so the site
 * quietly goes back to following the system. THEME_INIT_SCRIPT runs in <head>
 * before first paint so there is never a flash of the wrong theme.
 */

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "star-theme";

const THEME_COLOR: Record<Theme, string> = { dark: "#0a0a0a", light: "#f4f5f1" };

export const THEME_INIT_SCRIPT = `(function(){try{var d=document.documentElement,p=null;try{p=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY
)})}catch(e){}if(p!=="light"&&p!=="dark"){p=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}d.setAttribute("data-theme",p);d.style.colorScheme=p}catch(e){}})();`;

function systemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function savedTheme(): Theme | null {
  try {
    const v = localStorage.getItem(THEME_STORAGE_KEY);
    return v === "light" || v === "dark" ? v : null;
  } catch {
    return null;
  }
}

function readTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function apply(theme: Theme, animate: boolean) {
  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (animate && !reduce) {
    root.classList.add("theme-switching");
    window.setTimeout(() => root.classList.remove("theme-switching"), 600);
  }
  root.setAttribute("data-theme", theme);
  root.style.colorScheme = theme;
  document
    .querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
    .forEach((m) => (m.content = THEME_COLOR[theme]));
}

/** Flip the theme. Matching the system clears the saved choice. */
export function toggleTheme() {
  const next: Theme = readTheme() === "light" ? "dark" : "light";
  try {
    if (next === systemTheme()) localStorage.removeItem(THEME_STORAGE_KEY);
    else localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // Storage blocked: the choice still applies for this visit.
  }
  apply(next, true);
}

/**
 * Follows the OS while the visitor has not made a choice of their own.
 * Returns the cleanup.
 */
export function followSystemTheme() {
  const mql = window.matchMedia("(prefers-color-scheme: light)");
  const onChange = () => {
    if (!savedTheme()) apply(systemTheme(), true);
  };
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

/** The resolved theme, kept in step with <html data-theme>. Dark on the server. */
export function useTheme(): Theme {
  return useSyncExternalStore(
    (onChange) => {
      const observer = new MutationObserver(onChange);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
      });
      return () => observer.disconnect();
    },
    readTheme,
    () => "dark"
  );
}
