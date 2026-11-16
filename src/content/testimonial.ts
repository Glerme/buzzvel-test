import alexMorgan from "@/assets/images/alex-morgan.jpg";
import type { StatItem } from "@/types";

export const TESTIMONIAL_CONTENT = {
  quote:
    "The lessons are short enough to fit into my week, but detailed enough that I actually leave with something I can use.",
  author: {
    name: "Alex Morgan",
    role: "Product Manager",
    avatar: alexMorgan,
    alt: "Portrait of Alex Morgan, Product Manager",
  },
  stats: [
    { value: 24, suffix: "K+", display: "24K+", label: "active learners" },
    { value: 120, suffix: "+", display: "120+", label: "expert-led courses" },
    { value: 92, suffix: "%", display: "92%", label: "complete their first course" },
  ] satisfies StatItem[],
} as const;
