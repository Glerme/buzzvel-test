import type { HowItWorksStep } from "@/types";

export const HOW_IT_WORKS_CONTENT = {
  eyebrow: "How Luma works",
  heading: "Less browsing. More learning.",
  steps: [
    {
      step: "Step 01",
      title: "Choose your focus",
      description:
        "Find courses based on the skill you want to build, not endless content categories.",
      variant: "focus",
    },
    {
      step: "Step 02",
      title: "Learn from experience",
      description: "Follow concise lessons created by professionals who use these skills.",
      variant: "experience",
    },
    {
      step: "Step 03",
      title: "Put it into practice",
      description:
        "Every course includes practical exercises designed to turn knowledge into action.",
      variant: "practice",
    },
  ] satisfies HowItWorksStep[],
} as const;
