import type { SVGProps } from "react";

/** Exported from Figma (icon-clock.svg). Decorative by default (aria-hidden). */
export function ClockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <g clipPath="url(#icon-clock-clip0_19_120)">
        <path
          d="M10 4.99962V10L13.3336 11.6668M18.334 10C18.334 14.6028 14.6028 18.334 10 18.334C5.39727 18.334 1.66602 14.6028 1.66602 10C1.66602 5.39727 5.39727 1.66602 10 1.66602C14.6028 1.66602 18.334 5.39727 18.334 10Z"
          strokeWidth="2"
          strokeLinecap="round"
          stroke="currentColor"
        />
      </g>
      <defs>
        <clipPath id="icon-clock-clip0_19_120">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
