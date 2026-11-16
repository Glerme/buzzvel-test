import { StarIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

export interface StarRatingProps {
  count?: number;
  label?: string;
  className?: string;
}

/** Decorative 5-star row with an accessible rating label. */
export function StarRating({ count = 5, label, className }: StarRatingProps) {
  return (
    <div
      className={cn("inline-flex items-center gap-[2px]", className)}
      role="img"
      aria-label={label ?? `${count} out of 5 stars`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <StarIcon key={index} className="h-[14px] w-[14px]" />
      ))}
    </div>
  );
}
