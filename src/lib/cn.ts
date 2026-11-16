import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display-64",
            "display-56",
            "display-48",
            "display-40",
            "display-36",
            "display-32",
            "quote-30",
            "title-20",
            "body-18",
            "body-16",
            "body-14",
            "body-13",
            "eyebrow",
          ],
        },
      ],
    },
  },
});

/** Merge Tailwind CSS class names without style conflicts, preserving custom @theme font-size tokens. */
export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
