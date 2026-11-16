import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface EyebrowProps extends HTMLAttributes<HTMLParagraphElement> {
  tone?: "primary" | "white";
}

/** Uppercase section eyebrow / overline label (Inter 600, 12px, tracking 1.44px). */
export function Eyebrow({ tone = "primary", className, children, ...props }: EyebrowProps) {
  return (
    <p
      className={cn(
        "text-eyebrow font-semibold uppercase",
        tone === "primary" ? "text-primary" : "text-white",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
