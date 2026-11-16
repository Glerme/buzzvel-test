import Image from "next/image";
import { HeroDecoCircleIcon, HeroDecoPeachIcon } from "@/components/icons";
import { AvatarStack, Button, Container, Eyebrow, StarRating } from "@/components/ui";
import { HERO_CONTENT } from "@/content/hero";

/** Above-the-fold hero section with value proposition, dual CTAs, social proof, and visual showcase. */
export function Hero() {
  return (
    <section id="hero" className="bg-cream py-[60px] xl:py-[100px]">
      <Container>
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:items-start lg:gap-12 xl:grid-cols-[560px_500px] xl:gap-[60px]">
          <div className="order-2 lg:order-1">
            <Eyebrow>{HERO_CONTENT.eyebrow}</Eyebrow>

            <h1 className="mt-4 font-display text-display-40 font-extrabold text-ink xl:text-display-64">
              {HERO_CONTENT.heading}
            </h1>

            <p className="mt-6 max-w-[480px] text-body-16 leading-[26px] text-muted xl:text-body-18 xl:leading-[28px]">
              {HERO_CONTENT.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center">
              <Button href={HERO_CONTENT.primaryCta.href} variant="primary" fullWidthOnMobile>
                {HERO_CONTENT.primaryCta.label}
              </Button>
              <Button href={HERO_CONTENT.secondaryCta.href} variant="secondary" fullWidthOnMobile>
                {HERO_CONTENT.secondaryCta.label}
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-3 lg:justify-start">
              <AvatarStack
                avatars={HERO_CONTENT.avatars}
                size={32}
                borderClassName="border-cream"
              />
              <p className="text-body-14">
                <strong className="font-bold text-ink">{HERO_CONTENT.trustedPrefix}</strong>{" "}
                <span className="text-muted">{HERO_CONTENT.trustedSuffix}</span>
              </p>
            </div>
          </div>

          <div className="relative order-1 mx-auto w-full max-w-[362px] lg:order-2 lg:mx-0 lg:max-w-none">
            <HeroDecoPeachIcon
              className="pointer-events-none absolute top-6 -right-2.5 h-[342px] w-[272px] rounded-xl xl:-right-[39px] xl:h-[468px] xl:w-[89px]"
              preserveAspectRatio="none"
            />

            <HeroDecoCircleIcon className="pointer-events-none absolute bottom-3 -left-2.5 h-16 w-16 xl:bottom-[11px] xl:-left-[45px] xl:h-[106px] xl:w-[106px]" />

            <figure className="relative mx-2 h-[380px] overflow-hidden rounded-xl bg-indigo-50 lg:mx-0 lg:h-[460px] xl:h-[520px] xl:w-[500px] xl:rounded-2xl">
              <Image
                src={HERO_CONTENT.image.src}
                alt={HERO_CONTENT.image.alt}
                fill
                sizes="(max-width: 1023px) 92vw, 500px"
                loading="eager"
                fetchPriority="high"
                placeholder="blur"
                className="object-cover"
              />
            </figure>

            <div className="absolute top-1.5 left-0 z-10 flex items-center gap-3 rounded-lg bg-white px-4 py-3 shadow-float motion-safe:animate-float xl:top-4 xl:-left-[22px]">
              <span className="inline-flex h-8 items-center justify-center rounded-md bg-indigo-50 px-1.5 text-body-14 font-bold text-primary">
                {HERO_CONTENT.coursesBadge.count}
              </span>
              <span className="text-body-14 whitespace-nowrap text-ink">
                {HERO_CONTENT.coursesBadge.label}
              </span>
            </div>

            <div className="absolute -right-[11px] bottom-[35px] z-10 flex items-center gap-2 rounded-lg bg-white px-4 py-3 shadow-float motion-safe:animate-float motion-safe:[animation-delay:1.5s] xl:-right-[57px] xl:bottom-9">
              <StarRating
                count={HERO_CONTENT.ratingBadge.stars}
                label={HERO_CONTENT.ratingBadge.label}
              />
              <span className="text-body-14 whitespace-nowrap text-ink">
                {HERO_CONTENT.ratingBadge.label}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
