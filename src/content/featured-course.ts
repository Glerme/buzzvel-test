import featuredCourseImg from "@/assets/images/featured-course.jpg";

export const FEATURED_COURSE_CONTENT = {
  badge: "Featured Course",
  eyebrow: "Most popular this month",
  heading: "Designing products people understand.",
  description:
    "Learn how to turn complex workflows into simple, intentional product experiences through research, structure and thoughtful interaction design.",
  instructor: "with Maya Chen · Senior Product Designer",
  meta: ["8 lessons", "2h 40min", "Intermediate"],
  primaryCta: { label: "View course", href: "#contact" },
  secondaryCta: { label: "Browse all courses", href: "#categories" },
  image: {
    src: featuredCourseImg,
    alt: "Product design course — student working on interface designs and prototypes",
  },
} as const;
