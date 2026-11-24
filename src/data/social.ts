export interface SocialLink {
  name: string;
  url: string;
  handle: string;
  icon: "linkedin" | "instagram" | "github" | "mail";
  primary?: boolean;
}

export const EMAIL = "swaritpatel1409@gmail.com";

/** The link in the top-right corner of the nav. */
export const NAV_LINK = { label: "Email", href: `mailto:${EMAIL}` };

/**
 * Add LinkedIn / Instagram here once they are confirmed; the contact
 * section lists every entry that is not the email.
 */
export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/swaritpatel1409",
    handle: "swaritpatel1409",
    icon: "github",
    primary: true,
  },
  {
    name: "Email",
    url: `mailto:${EMAIL}`,
    handle: EMAIL,
    icon: "mail",
    primary: true,
  },
];
