import type { Metadata, Viewport } from "next";
import { Manrope, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { Cursor } from "@/components/experience/cursor";
import { PERSON_SCHEMA, siteUrl } from "@/lib/site";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
  weight: ["300", "400", "500", "700", "800"],
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument",
  weight: "400",
  style: ["normal", "italic"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#f4f5f1" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const TITLE = "Swarit Patel — ECE (VLSI Design) student";
const DESCRIPTION =
  "Swarit Patel is a first-year B.Tech (Hons.) Electronics & Communication Engineering student specialising in VLSI Design at UIT, Karnavati University, working on robotics, CAD and 3D printing, and the builder of the RoboReach robot for IIT Techfest 2026–27.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Swarit Patel",
    "B.Tech ECE",
    "VLSI Design",
    "Robotics",
    "IIT Techfest RoboReach",
    "SOLIDWORKS",
    "3D printing",
    "Arduino",
    "Student Portfolio",
    "UIT Karnavati University",
    "Portfolio",
  ],
  authors: [{ name: "Swarit Patel" }],
  creator: "Swarit Patel",
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "en_US",
    siteName: "Swarit Patel Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${instrument.variable}`}
      // data-theme is set by THEME_INIT_SCRIPT before hydration, so the client
      // sees an attribute the server never rendered — by design.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        {/* Keyboard users land here first and can jump past the fixed layers. */}
        <a href="#about" className="skip-link sr-only">
          Skip to content
        </a>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <Cursor />
        <script
          type="application/ld+json"
          // Tells search engines who this page is about, so a search for the
          // name can connect it to this page.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_SCHEMA) }}
        />
        <Analytics />
      </body>
    </html>
  );
}
