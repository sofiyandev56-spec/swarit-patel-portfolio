/**
 * Single source of truth for the site's public URL and identity.
 *
 * Set NEXT_PUBLIC_SITE_URL once a custom domain is in place. On Vercel the
 * production URL is detected automatically, so link previews, robots.txt and
 * the sitemap all resolve correctly without any configuration.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

/** The four-point star, the site's mark, in a -1.2..1.2 box (see icon.tsx). */
export const STAR_PATH =
  "M0 -1.15 C0.06 -0.5 0.45 -0.07 0.95 0 C0.45 0.07 0.06 0.5 0 1.15 C-0.06 0.5 -0.45 0.07 -0.95 0 C-0.45 -0.07 -0.06 -0.5 0 -1.15 Z";

export const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Swarit Patel",
  url: siteUrl,
  jobTitle: "B.Tech (Hons.) ECE, VLSI Design student",
  description:
    "Swarit Patel is a first-year B.Tech (Hons.) Electronics & Communication Engineering student specialising in VLSI Design at UIT, Karnavati University, working on robotics, CAD and 3D printing, and the builder of the RoboReach robot for IIT Techfest 2026–27.",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Unitedworld Institute of Technology, Karnavati University",
  },
  email: "mailto:swaritpatel1409@gmail.com",
  nationality: "Indian",
  knowsAbout: [
    "Robotics",
    "VLSI Design",
    "SOLIDWORKS",
    "3D printing",
    "Blender",
    "Proteus",
    "Tinkercad Circuits",
    "C",
    "Arduino",
  ],
} as const;
