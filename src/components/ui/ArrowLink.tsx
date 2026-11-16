import type { AnchorHTMLAttributes } from "react";
import { ArrowIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

export interface ArrowLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  tone?: "dark" | "light";
}

/** Text link paired with a right-pointing arrow that nudges on hover. */
export function ArrowLink({ tone = "dark", className, children, ...props }: ArrowLinkProps) {
  return (
    <a
      className={cn(
        "group inline-flex items-center gap-2 text-body-14 font-bold",
        "motion-safe:transition-colors motion-safe:duration-200",
        tone === "dark" ? "text-ink hover:text-primary" : "text-white hover:text-white/85",
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      <ArrowIcon className="h-5 w-5 shrink-0 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-1" />
    </a>
  );
}
