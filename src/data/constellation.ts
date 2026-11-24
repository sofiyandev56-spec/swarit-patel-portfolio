import { siArduino, siBlender, siC, siTinkercad } from "simple-icons";

/**
 * The words that drift around the star in the About act.
 *
 * Positions are viewport percentages: dx/dy on desktop, mx/my on phones.
 * `at` is the window of the About phase (0..1) during which the word is on
 * screen; `depth` scales its parallax so nearer words move more.
 */
export type ConstellationItem =
  | { kind: "serif" | "sans"; text: string; dx: number; dy: number; mx: number; my: number; depth: number; at: [number, number] }
  | { kind: "logo"; name: string; path: string; dx: number; dy: number; mx: number; my: number; depth: number; at: [number, number] };

export const constellation: ConstellationItem[] = [
  { kind: "serif", text: "Curiosity", dx: 17, dy: 76, mx: 22, my: 80, depth: 1, at: [0.02, 0.3] },
  { kind: "sans", text: "Robotics", dx: 80, dy: 24, mx: 78, my: 18, depth: 0.7, at: [0.05, 0.32] },
  { kind: "logo", name: "Arduino", path: siArduino.path, dx: 24, dy: 22, mx: 22, my: 20, depth: 0.5, at: [0.08, 0.34] },
  { kind: "serif", text: "Initiative", dx: 80, dy: 78, mx: 74, my: 82, depth: 0.9, at: [0.22, 0.5] },
  { kind: "sans", text: "VLSI Design", dx: 14, dy: 36, mx: 24, my: 76, depth: 0.6, at: [0.26, 0.54] },
  { kind: "logo", name: "C", path: siC.path, dx: 85, dy: 60, mx: 80, my: 22, depth: 0.5, at: [0.3, 0.56] },
  { kind: "sans", text: "Teamwork", dx: 12, dy: 58, mx: 18, my: 30, depth: 0.45, at: [0.36, 0.62] },
  { kind: "serif", text: "Leadership", dx: 20, dy: 24, mx: 26, my: 20, depth: 0.85, at: [0.44, 0.72] },
  { kind: "logo", name: "Blender", path: siBlender.path, dx: 68, dy: 86, mx: 52, my: 14, depth: 0.55, at: [0.4, 0.66] },
  { kind: "sans", text: "Embedded systems", dx: 79, dy: 40, mx: 70, my: 80, depth: 0.7, at: [0.48, 0.76] },
  { kind: "serif", text: "Creativity", dx: 30, dy: 84, mx: 30, my: 78, depth: 0.5, at: [0.52, 0.78] },
  { kind: "logo", name: "Tinkercad", path: siTinkercad.path, dx: 70, dy: 14, mx: 76, my: 24, depth: 0.45, at: [0.56, 0.82] },
  { kind: "serif", text: "Hands-on", dx: 82, dy: 74, mx: 70, my: 80, depth: 1, at: [0.66, 0.94] },
  { kind: "sans", text: "3D printing", dx: 16, dy: 44, mx: 22, my: 22, depth: 0.65, at: [0.7, 0.96] },
  { kind: "sans", text: "Hardware", dx: 60, dy: 88, mx: 50, my: 78, depth: 0.5, at: [0.72, 0.96] },
];

/** The bio, shown in the contact section and read out to screen readers. */
export const BIO = [
  "I’m a first-year B.Tech (Hons.) Electronics & Communication Engineering student at UIT, Karnavati University, specialising in VLSI Design. I like turning ideas into hardware: robots, CAD models, 3D prints and circuits.",
  "I built RoboReach, a wireless mobile manipulator, to compete at IIT Techfest 2026–27. I’m interested in embedded systems, consumer electronics and hardware–software integration, and I’m looking for internships, team projects and competitions.",
];

export const EDUCATION =
  "B.Tech (Hons.) ECE, VLSI Design, UIT Karnavati University (2030) · Class XII (GSEB, PCM): 70% · Class X (GSEB): 85%";

export const ABOUT_TEXT = `About: ${BIO.join(" ")} Education: ${EDUCATION}. Based in Gandhinagar, Gujarat. Speaks Gujarati, Hindi and English. Working with SOLIDWORKS, Blender, 3D printing, Proteus, CircuitLab, Tinkercad Circuits, C and Arduino.`;
