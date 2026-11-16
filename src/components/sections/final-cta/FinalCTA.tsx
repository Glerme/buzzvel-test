import {
  CtaBoldIcon,
  CtaCashIcon,
  CtaChatIcon,
  CtaCircleOutlineLgIcon,
  CtaCircleOutlineMdIcon,
  CtaCircleOutlineSmIcon,
  CtaCircleOutlineXsIcon,
  CtaCircleSolidIcon,
  CtaCodepenIcon,
  CtaLampIcon,
  CtaSquareLeftIcon,
  CtaSquareOutlineIcon,
  CtaSquareSolidIcon,
} from "@/components/icons";
import { Reveal } from "@/components/motion";
import { AvatarStack, Button } from "@/components/ui";
import { FINAL_CTA_CONTENT } from "@/content/final-cta";

/** Closing full-bleed sun-tinted call-to-action banner with decorative desktop shapes. */
export function FinalCTA() {
  const { heading, description, primaryCta, secondaryCta, avatars } = FINAL_CTA_CONTENT;

  return (
    <section
      id="final-cta"
      aria-labelledby="final-cta-heading"
      className="relative overflow-hidden bg-sun-50 py-[60px] xl:py-[100px]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
        <CtaCircleOutlineLgIcon className="absolute top-[16px] left-[22px]" />
        <CtaCircleSolidIcon className="absolute top-[373px] left-[56px]" />
        <CtaSquareLeftIcon className="absolute top-[230px] -left-[33px]" />
        <CtaChatIcon className="absolute top-[214px] left-[141px]" />
        <CtaSquareOutlineIcon className="absolute top-[42px] left-[calc(50%-323px)]" />
        <CtaBoldIcon className="absolute top-[360px] left-[calc(50%-368px)]" />
        <CtaCircleOutlineMdIcon className="absolute top-[43px] left-[calc(50%+237px)]" />
        <CtaLampIcon className="absolute top-[82px] left-[calc(50%+376px)]" />
        <CtaCashIcon className="absolute top-[381px] left-[calc(50%+323px)]" />
        <CtaCircleOutlineSmIcon className="absolute top-[468px] left-[calc(50%+424px)]" />
        <CtaSquareSolidIcon className="absolute -top-[24px] right-0" />
        <CtaCodepenIcon className="absolute top-[220px] right-[48px] xl:right-[80px]" />
        <CtaCircleOutlineXsIcon className="absolute top-[429px] right-[40px]" />
      </div>

      <Reveal className="relative z-10 mx-auto flex max-w-[720px] flex-col items-center px-4 text-center md:px-8">
        <AvatarStack avatars={avatars} size={40} borderClassName="border-sun-50" />

        <h2
          id="final-cta-heading"
          className="mt-8 font-display text-display-36 font-extrabold text-ink xl:text-display-56"
        >
          {heading}
        </h2>

        <p className="mt-4 text-body-16 text-muted max-xl:leading-[26px] xl:text-body-18">
          {description}
        </p>

        <div className="mt-10 flex w-full flex-col items-center justify-center gap-3 md:w-auto md:flex-row">
          <Button href={primaryCta.href} variant="primary" fullWidthOnMobile>
            {primaryCta.label}
          </Button>
          <Button href={secondaryCta.href} variant="secondary" fullWidthOnMobile>
            {secondaryCta.label}
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
