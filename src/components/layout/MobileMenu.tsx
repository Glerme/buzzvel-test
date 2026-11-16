"use client";

import { useEffect, type RefObject } from "react";
import { Button, Container } from "@/components/ui";
import { AUTH_NAV_LINKS, PRIMARY_NAV_LINKS } from "@/content/nav";

export interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  toggleRef: RefObject<HTMLButtonElement | null>;
}

/** Full-width mobile navigation drawer rendered below the sticky header. */
export function MobileMenu({ open, onClose, toggleRef }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose, toggleRef]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div
      id="mobile-menu"
      className="absolute inset-x-0 top-full z-40 border-b border-line bg-cream shadow-float xl:hidden"
    >
      <Container className="py-5">
        <nav aria-label="Mobile navigation" className="flex flex-col">
          {PRIMARY_NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={onClose}
              className="py-3 text-body-16 font-medium text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="mt-3 flex flex-col gap-3 border-t border-line-soft pt-4">
          <a
            href={AUTH_NAV_LINKS.login.href}
            onClick={onClose}
            className="py-2.5 text-center text-body-14 font-medium text-muted transition-colors hover:text-ink"
          >
            {AUTH_NAV_LINKS.login.label}
          </a>
          <Button
            href={AUTH_NAV_LINKS.cta.href}
            variant="primary"
            size="sm"
            onClick={onClose}
            className="w-full"
          >
            {AUTH_NAV_LINKS.cta.label}
          </Button>
        </div>
      </Container>
    </div>
  );
}
