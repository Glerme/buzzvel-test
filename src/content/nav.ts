import type { NavLink } from "@/types";

export const PRIMARY_NAV_LINKS: NavLink[] = [
  { label: "Courses", href: "#categories" },
  { label: "For Teams", href: "#featured-course" },
  { label: "Community", href: "#people" },
  { label: "About", href: "#how-it-works" },
];

export const AUTH_NAV_LINKS = {
  login: { label: "Log in", href: "#contact" },
  cta: { label: "Start learning", href: "#categories" },
} as const;
