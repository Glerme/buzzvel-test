import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "accent";
export type ButtonSize = "sm" | "md";

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidthOnMobile?: boolean;
  className?: string;
};

type ButtonAsAnchor = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonAsNative = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export type ButtonProps = ButtonAsAnchor | ButtonAsNative;

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-hover active:translate-y-px",
  secondary:
    "bg-white text-ink border border-line hover:border-ink/30 hover:bg-cream/60 active:translate-y-px",
  accent:
    "bg-sun text-ink hover:bg-sun-hover active:translate-y-px",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-body-14 font-bold rounded-md",
  md: "px-7 py-[14px] text-body-14 font-bold rounded-md",
};

/** Polymorphic button/link primitive matching Figma CTA styles and focus ring. */
export function Button({
  variant = "primary",
  size = "md",
  fullWidthOnMobile = false,
  className,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center text-center whitespace-nowrap select-none",
    "motion-safe:transition-[background-color,border-color,transform,box-shadow] motion-safe:duration-200",
    "disabled:opacity-60 disabled:pointer-events-none cursor-pointer",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    fullWidthOnMobile && "w-full md:w-auto",
    className,
  );

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorProps } = props;
    return <a href={href} className={classes} {...anchorProps} />;
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return <button type={buttonProps.type ?? "button"} className={classes} {...buttonProps} />;
}
