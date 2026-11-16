"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export interface CountUpProps {
  value: number;
  suffix?: string;
  durationMs?: number;
  className?: string;
}

/**
 * Subtle count-up animation for stat numbers.
 * Renders the final value immediately for SSR, screen readers, and reduced motion.
 */
export function CountUp({ value, suffix = "", durationMs = 900, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [current, setCurrent] = useState(value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (reducedMotion || hasAnimated.current) {
      return;
    }

    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      return;
    }

    let frameId = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;
        observer.disconnect();

        const start = performance.now();
        const step = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / durationMs, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCurrent(Math.round(eased * value));
          if (progress < 1) {
            frameId = requestAnimationFrame(step);
          }
        };
        frameId = requestAnimationFrame(step);
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [durationMs, reducedMotion, value]);

  const displayValue = reducedMotion ? value : current;

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
      <span aria-hidden="true">
        {displayValue}
        {suffix}
      </span>
    </span>
  );
}
