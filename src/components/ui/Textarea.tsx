import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

/** Multi-line textarea styled to match Figma's contact form field. */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { hasError = false, className, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      aria-invalid={hasError || undefined}
      className={cn(
        "min-h-[120px] w-full resize-y rounded-md border bg-cream px-4 py-[14px] text-body-14 text-ink placeholder:text-muted-3",
        "motion-safe:transition-colors motion-safe:duration-150",
        "focus:bg-white focus:outline-2 focus:outline-offset-0 focus:outline-primary",
        hasError ? "border-danger" : "border-line hover:border-ink/30",
        className,
      )}
      {...props}
    />
  );
});
