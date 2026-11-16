import type { StaticImageData } from "next/image";

export interface NavLink {
  label: string;
  href: string;
}

export interface AvatarItem {
  src: StaticImageData;
  alt: string;
}

export interface CategoryItem {
  number: string;
  title: string;
  description: string;
  href: string;
}

export interface HowItWorksStep {
  step: string;
  title: string;
  description: string;
  variant: "focus" | "experience" | "practice";
}

export interface StatItem {
  value: number;
  suffix: string;
  display: string;
  label: string;
}

export interface CollagePhoto {
  id: string;
  src: StaticImageData;
  alt: string;
  column: 0 | 1 | 2 | 3;
  desktopWidth: number;
  desktopHeight: number;
  mobileWidth: number;
  mobileHeight: number;
}

export interface FooterColumn {
  heading: string;
  links: NavLink[];
}
