import { SITE_TAGLINE } from "@/lib/constants";
import type { FooterColumn } from "@/types";

export const FOOTER_CONTENT = {
  tagline: SITE_TAGLINE,
  copyright: "© 2026 Luma Learning",
  columns: [
    {
      heading: "Explore",
      links: [
        { label: "Courses", href: "#categories" },
        { label: "Categories", href: "#categories" },
        { label: "Instructors", href: "#people" },
        { label: "For Teams", href: "#featured-course" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About", href: "#how-it-works" },
        { label: "Careers", href: "#people" },
        { label: "Journal", href: "#testimonial" },
      ],
    },
    {
      heading: "Support",
      links: [
        { label: "Help Center", href: "#contact" },
        { label: "Contact", href: "#contact" },
        { label: "Terms", href: "#top" },
        { label: "Privacy", href: "#top" },
      ],
    },
  ] satisfies FooterColumn[],
} as const;
