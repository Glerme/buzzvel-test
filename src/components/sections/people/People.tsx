import type { CSSProperties } from "react";
import Image from "next/image";
import { Reveal } from "@/components/motion";
import { Button, Container, Eyebrow } from "@/components/ui";
import { PEOPLE_CONTENT } from "@/content/people";
import { cn } from "@/lib/cn";
import type { CollagePhoto } from "@/types";

const COLUMN_ALIGNMENT: Record<CollagePhoto["column"], string> = {
  0: "items-end pt-12 xl:pt-16",
  1: "items-start xl:pt-[26px]",
  2: "items-start",
  3: "items-start",
};

const COLUMNS: readonly CollagePhoto["column"][] = [0, 1, 2, 3];

/** Community section pairing editorial copy with a 4-column staggered photo collage. */
export function People() {
  const { eyebrow, heading, description, cta, figcaption, photos } = PEOPLE_CONTENT;

  return (
    <section
      id="people"
      aria-labelledby="people-heading"
      className="bg-cream py-[60px] xl:py-[100px]"
    >
      <Container>
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between lg:gap-12 xl:gap-[60px]">
          <Reveal className="flex w-full flex-col gap-6 lg:max-w-[530px] lg:gap-8">
            <div className="flex flex-col gap-2">
              <Eyebrow>{eyebrow}</Eyebrow>
              <h2
                id="people-heading"
                className="font-display text-display-32 font-extrabold text-ink xl:text-display-48"
              >
                {heading}
              </h2>
            </div>

            <p className="text-body-16 text-muted max-xl:leading-[26px] xl:text-body-18">
              {description}
            </p>

            <Button href={cta.href} variant="secondary" className="self-start">
              {cta.label}
            </Button>
          </Reveal>

          <Reveal delayMs={120} className="w-full max-w-[362px] shrink-0 xl:max-w-[530px]">
            <figure className="relative flex min-h-[310px] w-full items-center justify-center xl:min-h-[522px]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-1/2 h-[348px] w-[348px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-50 xl:h-[500px] xl:w-[500px]"
              />

              <div className="relative z-10 flex items-center justify-center gap-3 xl:gap-4">
                {COLUMNS.map((colIndex) => {
                  const columnPhotos = photos.filter((photo) => photo.column === colIndex);

                  return (
                    <div
                      key={colIndex}
                      className={cn(
                        "flex flex-col gap-2 xl:gap-[13px]",
                        COLUMN_ALIGNMENT[colIndex],
                      )}
                    >
                      {columnPhotos.map((photo) => (
                        <div
                          key={photo.id}
                          style={
                            {
                              "--mw": `${photo.mobileWidth}px`,
                              "--mh": `${photo.mobileHeight}px`,
                              "--dw": `${photo.desktopWidth}px`,
                              "--dh": `${photo.desktopHeight}px`,
                            } as CSSProperties
                          }
                          className="relative h-[var(--mh)] w-[var(--mw)] overflow-hidden rounded-[6px] shadow-photo xl:h-[var(--dh)] xl:w-[var(--dw)]"
                        >
                          <Image
                            src={photo.src}
                            alt={photo.alt}
                            fill
                            sizes="(min-width: 1280px) 138px, 94px"
                            placeholder="blur"
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>

              <figcaption className="sr-only">{figcaption}</figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
