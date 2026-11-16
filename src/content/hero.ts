import avatar1 from "@/assets/images/avatar-1.jpg";
import avatar2 from "@/assets/images/avatar-2.jpg";
import avatar3 from "@/assets/images/avatar-3.jpg";
import heroLearner from "@/assets/images/hero-learner.jpg";
import type { AvatarItem } from "@/types";

export const HERO_CONTENT = {
  eyebrow: "Learn at your own pace",
  heading: "Build skills that actually move you forward.",
  description:
    "Practical courses taught by people who do the work every day. Learn design, technology, business and more — one focused lesson at a time.",
  primaryCta: { label: "Explore courses", href: "#categories" },
  secondaryCta: { label: "See how it works", href: "#how-it-works" },
  trustedPrefix: "Trusted by 24,000+",
  trustedSuffix: "learners",
  image: {
    src: heroLearner,
    alt: "Person focused on learning at their laptop in a sunlit workspace",
  },
  coursesBadge: {
    count: "120+",
    label: "expert-led courses",
  },
  ratingBadge: {
    stars: 5,
    label: "4.9 avg rating",
  },
  avatars: [
    { src: avatar1, alt: "Luma learner smiling" },
    { src: avatar2, alt: "Luma learner portrait" },
    { src: avatar3, alt: "Luma learner in studio" },
  ] satisfies AvatarItem[],
} as const;
