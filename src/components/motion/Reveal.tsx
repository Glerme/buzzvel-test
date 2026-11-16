"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export interface RevealProps {
  children: ReactNode;
  delayMs?: number;
  className?: string;
}

/**
 * Progressive scroll-reveal wrapper.
 * Content is always visible without JS or when `prefers-reduced-motion: reduce` is set.
 */
export function Reveal({ children, delayMs = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [revealed, setRevealed] = useState(() => typeof IntersectionObserver === "undefined");

  useEffect(() => {
    if (reducedMotion || revealed) return;

    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -48px 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion, revealed]);

  const style = delayMs ? ({ "--reveal-delay": `${delayMs}ms` } as CSSProperties) : undefined;

  return (
    <div
      ref={ref}
      data-reveal=""
      data-revealed={revealed || reducedMotion ? "true" : "false"}
      style={style}
      className={cn(className)}
    >
      {children}
    </div>
  );
}
