import avatar1 from "@/assets/images/avatar-1.jpg";
import avatar2 from "@/assets/images/avatar-2.jpg";
import avatar3 from "@/assets/images/avatar-3.jpg";
import avatar4 from "@/assets/images/avatar-4.jpg";
import type { AvatarItem } from "@/types";

export const FINAL_CTA_CONTENT = {
  heading: "What will you learn next?",
  description: "Start with one course. Build from there.",
  primaryCta: { label: "Explore all courses", href: "#categories" },
  secondaryCta: { label: "Join Luma", href: "#contact" },
  avatars: [
    { src: avatar1, alt: "Luma community member" },
    { src: avatar2, alt: "Luma community member" },
    { src: avatar3, alt: "Luma community member" },
    { src: avatar4, alt: "Luma community member" },
  ] satisfies AvatarItem[],
} as const;
