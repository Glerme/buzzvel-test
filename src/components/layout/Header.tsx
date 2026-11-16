"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LogoMark, MenuIcon } from "@/components/icons";
import { Button, Container } from "@/components/ui";
import { AUTH_NAV_LINKS, PRIMARY_NAV_LINKS } from "@/content/nav";
import { MobileMenu } from "./MobileMenu";

/** Sticky top navigation bar matching desktop (70px) and mobile (69px) Figma specs. */
export function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 80rem)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setOpen(false);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <header className="sticky top-0 z-40 h-[69px] border-b border-line bg-cream xl:h-[70px]">
      <Container className="flex h-full items-center justify-between xl:grid xl:grid-cols-[1fr_auto_1fr]">
        <a
          href="#top"
          aria-label="Luma home"
          className="inline-flex shrink-0 items-center text-ink xl:justify-self-start"
        >
          <LogoMark />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 xl:flex">
          {PRIMARY_NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-body-14 text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 xl:flex xl:justify-self-end">
          <a
            href={AUTH_NAV_LINKS.login.href}
            className="px-4 py-2.5 text-body-14 text-muted transition-colors hover:text-ink"
          >
            {AUTH_NAV_LINKS.login.label}
          </a>
          <Button href={AUTH_NAV_LINKS.cta.href} variant="primary" size="sm">
            {AUTH_NAV_LINKS.cta.label}
          </Button>
        </div>

        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md p-1.5 text-ink transition-colors hover:bg-ink/5 xl:hidden"
        >
          <MenuIcon className="h-6 w-6" />
        </button>
      </Container>

      <MobileMenu open={open} onClose={handleClose} toggleRef={toggleRef} />
    </header>
  );
}
