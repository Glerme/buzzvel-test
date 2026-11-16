import Image from "next/image";
import { ArrowLink, Badge, Button, Container, Eyebrow } from "@/components/ui";
import { FEATURED_COURSE_CONTENT } from "@/content/featured-course";

/** Highlighted featured course showcase on primary blue background. */
export function FeaturedCourse() {
  return (
    <section id="featured-course" className="bg-primary py-[60px] xl:py-[100px]">
      <Container>
        <div className="flex flex-col gap-[38px] lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 xl:grid-cols-[538px_minmax(0,1fr)] xl:gap-[60px]">
          <div className="relative">
            <figure className="relative h-[280px] w-full overflow-hidden rounded-xl bg-indigo-50 lg:h-[380px] xl:h-[408px] xl:w-[538px]">
              <Image
                src={FEATURED_COURSE_CONTENT.image.src}
                alt={FEATURED_COURSE_CONTENT.image.alt}
                fill
                sizes="(max-width: 1023px) 92vw, 538px"
                placeholder="blur"
                className="object-cover"
              />
            </figure>

            <Badge variant="tag" className="absolute -top-3 -left-3 z-10">
              {FEATURED_COURSE_CONTENT.badge}
            </Badge>
          </div>

          <div>
            <Eyebrow tone="white">{FEATURED_COURSE_CONTENT.eyebrow}</Eyebrow>

            <h2 className="mt-4 font-display text-display-32 font-extrabold text-white xl:text-display-48">
              {FEATURED_COURSE_CONTENT.heading}
            </h2>

            <p className="mt-5 text-body-14 text-white xl:text-body-16">
              {FEATURED_COURSE_CONTENT.description}
            </p>

            <p className="mt-6 text-body-14 text-white xl:text-body-16">
              {FEATURED_COURSE_CONTENT.instructor}
            </p>

            <ul className="mt-6 flex flex-wrap gap-3" aria-label="Course details">
              {FEATURED_COURSE_CONTENT.meta.map((item) => (
                <li key={item}>
                  <Badge variant="pill">{item}</Badge>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center">
              <Button
                href={FEATURED_COURSE_CONTENT.primaryCta.href}
                variant="accent"
                fullWidthOnMobile
              >
                {FEATURED_COURSE_CONTENT.primaryCta.label}
              </Button>
              <ArrowLink
                href={FEATURED_COURSE_CONTENT.secondaryCta.href}
                tone="light"
                className="justify-center px-4 py-[14px] md:justify-start"
              >
                {FEATURED_COURSE_CONTENT.secondaryCta.label}
              </ArrowLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
