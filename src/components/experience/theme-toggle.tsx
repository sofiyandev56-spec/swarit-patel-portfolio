"use client";

import React, { useEffect } from "react";
import { followSystemTheme, toggleTheme, useTheme } from "@/lib/theme";

/**
 * A small sun / moon switch in the nav. Shows the theme you would switch to,
 * and keeps the page following the OS until it is used.
 */
export function ThemeToggle() {
  const theme = useTheme();
  const isLight = theme === "light";
  useEffect(() => followSystemTheme(), []);

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      title={isLight ? "Dark theme" : "Light theme"}
      data-magnetic="6"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="theme-icon">
        {/* Sun: the disc and rays fade in for light, the bite slides in for dark. */}
        <mask id="theme-moon-bite">
          <rect x="0" y="0" width="24" height="24" fill="#fff" />
          <circle className="theme-bite" cx={isLight ? 30 : 16.5} cy={isLight ? -6 : 7.5} r="7" fill="#000" />
        </mask>
        <circle className="theme-disc" cx="12" cy="12" r={isLight ? 4.6 : 7.4} mask="url(#theme-moon-bite)" />
        <g className="theme-rays" style={{ opacity: isLight ? 1 : 0 }}>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <line key={a} x1="12" y1="2.2" x2="12" y2="4.4" transform={`rotate(${a} 12 12)`} />
          ))}
        </g>
      </svg>
    </button>
  );
}
