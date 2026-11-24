"use client";

import React, { useEffect, useRef, useState } from "react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { EMAIL, socialLinks } from "@/data/social";
import { BIO, EDUCATION } from "@/data/constellation";
import { Line, Words } from "@/components/experience/split";

/**
 * The last act, in normal flow so the page has a real end: the bio and
 * education, an invitation,
 * the email (click copies it), the socials and the sign-off. Once the
 * starfield has settled it dithers in and its lines rise one after another
 * (CSS on `.visible`; see split.tsx).
 */
export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useGSAP(
    () => {
      const inner = ref.current?.querySelector<HTMLElement>(".contact-in");
      if (!inner) return;
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 60%",
        onEnter: () => inner.classList.add("visible"),
      });
    },
    { scope: ref }
  );

  const toastTimer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  // Click copies. The default (the mailto) has to be cancelled synchronously
  // — after an await it has already fired — so cancel first and fall back to
  // opening the mail app only if the clipboard refuses.
  const copy = (e: React.MouseEvent) => {
    if (!navigator.clipboard?.writeText) return;
    e.preventDefault();
    navigator.clipboard.writeText(EMAIL).then(
      () => {
        setCopied(true);
        window.clearTimeout(toastTimer.current);
        toastTimer.current = window.setTimeout(() => setCopied(false), 2000);
      },
      () => {
        window.location.href = `mailto:${EMAIL}`;
      }
    );
  };

  const socials = socialLinks.filter((s) => s.icon !== "mail");

  return (
    <section id="contact" ref={ref} className="contact" data-phase="contact">
      <div className="contact-in dither">
        <div className="contact-bio">
          {BIO.map((para, i) => (
            <p key={i}>
              <Line index={i}>{para}</Line>
            </p>
          ))}
          <p className="contact-edu">
            <Line index={BIO.length}>{EDUCATION}</Line>
          </p>
        </div>
        <div className="line serif">
          <Words text="Have an internship or a project in mind? Let’s talk." />
        </div>
        <span className="mail-wrap">
          <span className={`copy-toast ${copied ? "show" : ""}`} role="status">
            Copied ✓
          </span>
          <Line index={7}>
            <a className="mail" href={`mailto:${EMAIL}`} onClick={copy} data-magnetic="6">
              {EMAIL}
            </a>
          </Line>
        </span>
        <div className="mail-hint">
          <Line index={9}>click or tap to copy</Line>
        </div>
        {socials.length > 0 && (
        <div className="socials">
          {socials.map((s, i) => (
            <React.Fragment key={s.name}>
              {i > 0 && (
                <span className="soc-dot" aria-hidden="true">
                  ·
                </span>
              )}
              <Line index={10 + i}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" data-magnetic="6">
                  {s.name}
                </a>
              </Line>
            </React.Fragment>
          ))}
        </div>
        )}
      </div>
      <footer>© {new Date().getFullYear()} Swarit Patel. ECE · Robotics · Craft</footer>
    </section>
  );
}
