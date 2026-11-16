import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface FieldProps {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}

/** Accessible form field wrapper linking label, control, and inline error message. */
export function Field({ id, label, error, className, children }: FieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-body-14 font-bold text-ink">
        {label}
      </label>
      {children}
      {error ? (
        <p id={errorId} role="alert" className="text-body-13 font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
