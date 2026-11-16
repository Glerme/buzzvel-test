import { LogoMark } from "@/components/icons";
import { Container } from "@/components/ui";
import { FOOTER_CONTENT } from "@/content/footer";

/** Site footer with brand summary, 3 navigation columns, and copyright line. */
export function Footer() {
  return (
    <footer className="bg-ink pt-[60px] pb-[20px] xl:pt-[80px] xl:pb-[40px]">
      <Container>
        <div className="grid grid-cols-2 gap-x-10 gap-y-10 lg:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))] lg:gap-8 xl:grid-cols-[416px_repeat(3,minmax(0,1fr))]">
          <div className="col-span-2 lg:col-span-1">
            <a href="#top" aria-label="Luma home" className="inline-flex items-center text-white">
              <LogoMark />
            </a>
            <p className="mt-3 text-body-14 text-muted-3 xl:max-w-[240px]">
              {FOOTER_CONTENT.tagline}
            </p>
          </div>

          {FOOTER_CONTENT.columns.map((column, index) => (
            <nav
              key={column.heading}
              aria-label={column.heading}
              className={index === 2 ? "col-span-2 lg:col-span-1" : undefined}
            >
              <h2 className="text-eyebrow font-semibold text-white uppercase">{column.heading}</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-body-14 text-muted-3 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 border-t border-white/15 pt-6 text-center xl:mt-16 xl:text-left">
          <small className="block text-body-13 text-muted-3">{FOOTER_CONTENT.copyright}</small>
        </div>
      </Container>
    </footer>
  );
}
