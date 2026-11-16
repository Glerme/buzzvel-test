import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

/** Text input styled to match Figma's cream-filled, 1px bordered field. */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { hasError = false, className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      aria-invalid={hasError || undefined}
      className={cn(
        "h-12 w-full rounded-md border bg-cream px-4 py-3 text-body-14 text-ink placeholder:text-muted-3",
        "motion-safe:transition-colors motion-safe:duration-150",
        "focus:bg-white focus:outline-2 focus:outline-offset-0 focus:outline-primary",
        hasError ? "border-danger" : "border-line hover:border-ink/30",
        className,
      )}
      {...props}
    />
  );
});
