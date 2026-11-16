import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "number" | "tag" | "pill";
}

const VARIANT_CLASSES: Record<NonNullable<BadgeProps["variant"]>, string> = {
  number: "bg-indigo-50 text-primary text-xs leading-4 font-semibold px-2 py-1 rounded-sm",
  tag: "bg-sun text-ink text-eyebrow font-semibold uppercase px-3 py-1.5 rounded-sm",
  pill: "border border-white/40 text-white text-body-14 px-[14px] py-[6px] rounded-md",
};

/** Small status/number/metadata badge matching Figma chip tokens. */
export function Badge({ variant = "number", className, children, ...props }: BadgeProps) {
  return (
    <span className={cn("inline-flex items-center", VARIANT_CLASSES[variant], className)} {...props}>
      {children}
    </span>
  );
}
