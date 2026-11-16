import Image from "next/image";
import { cn } from "@/lib/cn";
import type { AvatarItem } from "@/types";

export interface AvatarStackProps {
  avatars: readonly AvatarItem[];
  size?: 32 | 40;
  borderClassName?: string;
  className?: string;
}

/** Overlapping circular avatar stack with Figma drop shadow. */
export function AvatarStack({
  avatars,
  size = 32,
  borderClassName = "border-white",
  className,
}: AvatarStackProps) {
  const sizeClass = size === 40 ? "h-10 w-10 -ml-2 first:ml-0" : "h-8 w-8 -ml-2 first:ml-0";

  return (
    <div className={cn("flex items-center", className)}>
      {avatars.map((avatar, index) => (
        <span
          key={index}
          className={cn(
            "relative inline-block overflow-hidden rounded-full border-2 shadow-avatar",
            sizeClass,
            borderClassName,
          )}
        >
          <Image
            src={avatar.src}
            alt={avatar.alt}
            width={size}
            height={size}
            className="h-full w-full object-cover"
          />
        </span>
      ))}
    </div>
  );
}
