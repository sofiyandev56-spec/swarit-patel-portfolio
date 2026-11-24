/**
 * The project cards. Each is one beat of the scroll: a framed visual, a small
 * label, a serif title and two sentences. Cards with an `href` are links (the
 * cursor says "visit"); the others are static.
 *
 * Adding a card here is all it takes: the scroll gives it its own beat.
 */
export interface ProjectGraphic {
  /** Small mono line at the top of the frame. */
  kicker: string;
  /** The headline in the frame. */
  title: string;
  /** Up to four [label, value] tiles. */
  cells: [string, string][];
  /** Small mono line at the bottom of the frame. */
  foot: string;
}

export interface Project {
  id: string;
  label: string;
  title: string;
  blurb: string;
  href?: string;
  /** A real capture of the product. Absent when none exists. */
  image?: { src: string; alt: string; width: number; height: number };
  /** The drawn stand-in when there is no capture. */
  graphic?: ProjectGraphic;
}

export const projects: Project[] = [
  {
    id: "roboreach",
    label: "IIT Techfest 2026–27 · Robotics",
    title: "RoboReach",
    blurb:
      "A wireless mobile manipulator: a mecanum-wheel robot car carrying a servo-driven robotic arm and gripper, built to compete in Techfest’s RoboReach event.",
    graphic: {
      kicker: "iit techfest · 2026–27 · roboreach",
      title: "Wireless mobile manipulator",
      cells: [
        ["drive", "Mecanum wheels"],
        ["arm", "Servo-driven"],
        ["end", "Gripper"],
        ["control", "Wireless"],
      ],
      foot: "mobile base · robotic arm · gripper",
    },
  },
  {
    id: "artificial-heart",
    label: "School project · Biomedical",
    title: "Artificial Heart",
    blurb:
      "A school project on the artificial heart: a machine that takes over the heart’s job of pumping blood around the body when a person’s own heart is too badly damaged to do it.",
    graphic: {
      kicker: "school project",
      title: "A machine that pumps like a heart",
      cells: [
        ["job", "Pump blood"],
        ["for", "Failing hearts"],
        ["field", "Biomedical"],
        ["type", "School project"],
      ],
      foot: "how a mechanical heart keeps the body going",
    },
  },
  {
    id: "toolkit",
    label: "Skills · CAD · Circuits · Fabrication",
    title: "From design to hardware",
    blurb:
      "Modelling parts in SOLIDWORKS and Blender, 3D printing them, and simulating circuits in Proteus, CircuitLab and Tinkercad before wiring sensors and motors. Programming in C and Arduino as a beginner, and building a personal cloud server.",
    graphic: {
      kicker: "toolkit",
      title: "Model, print, simulate, wire",
      cells: [
        ["cad", "SOLIDWORKS"],
        ["make", "3D printing"],
        ["circuits", "Proteus · Tinkercad"],
        ["code", "C · Arduino"],
      ],
      foot: "blender · robot assembly · sensors & motors",
    },
  },
  {
    id: "education",
    label: "Education · UIT, Karnavati University",
    title: "B.Tech (Hons.) ECE, VLSI Design",
    blurb:
      "Semester 1 of Electronics & Communication Engineering, specialising in VLSI Design, graduating in 2030. Class XII (GSEB, PCM) with 70% in 2026 and Class X (GSEB) with 85% in 2024.",
    graphic: {
      kicker: "education",
      title: "Where I study",
      cells: [
        ["degree", "B.Tech (Hons.) ECE"],
        ["major", "VLSI Design"],
        ["class xii · gseb", "70% (PCM)"],
        ["class x · gseb", "85%"],
      ],
      foot: "unitedworld institute of technology · graduating 2030",
    },
  },
  {
    id: "record",
    label: "Training · Leadership · Achievements",
    title: "Beyond the projects",
    blurb:
      "Zonal topper with a school-level gold in the SOF Science Olympiad, a bronze-level student ambassador at IIT, and a Jio AI certification. Took part in the PDEU National Science Fair, BYJU’S Discovery School Super League and an ethical hacking workshop by Vaultofcodes.",
    graphic: {
      kicker: "training · leadership · achievements",
      title: "Olympiads, fairs and workshops",
      cells: [
        ["sof olympiad", "Gold · Zonal topper"],
        ["iit", "Bronze ambassador"],
        ["certificate", "Jio AI (JioPC)"],
        ["science fair", "PDEU national"],
      ],
      foot: "google doodle · g3q quiz · cicon 2026 · youth seminar",
    },
  },
];
