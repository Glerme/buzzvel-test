import type { ComponentType, SVGProps } from "react";
import { Step1Icon, Step2Icon, Step3Icon } from "@/components/icons";
import { Container, Eyebrow } from "@/components/ui";
import { HOW_IT_WORKS_CONTENT } from "@/content/how-it-works";
import { cn } from "@/lib/cn";
import type { HowItWorksStep } from "@/types";

const STEP_ICONS: Record<
  HowItWorksStep["variant"],
  { Icon: ComponentType<SVGProps<SVGSVGElement>>; className: string }
> = {
  focus: { Icon: Step1Icon, className: "h-14 w-14" },
  experience: { Icon: Step2Icon, className: "h-[67px] w-[67px]" },
  practice: { Icon: Step3Icon, className: "h-14 w-14" },
};

/** Three-step process section with responsive horizontal (desktop) and vertical (mobile) connectors. */
export function HowItWorks() {
  const steps = HOW_IT_WORKS_CONTENT.steps;

  return (
    <section id="how-it-works" className="bg-cream py-[60px] xl:py-[100px]">
      <Container>
        <div className="text-center">
          <Eyebrow>{HOW_IT_WORKS_CONTENT.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-display-32 font-extrabold text-ink xl:text-display-48">
            {HOW_IT_WORKS_CONTENT.heading}
          </h2>
        </div>

        <ol className="mt-10 grid grid-cols-1 lg:mt-16 lg:grid-cols-3 lg:gap-12 xl:mt-20 xl:gap-[80px] xl:py-7">
          {steps.map((item, index) => {
            const { Icon, className } = STEP_ICONS[item.variant];
            const hasConnector = index < steps.length - 1;

            return (
              <li key={item.step} className={cn("relative", hasConnector && "pb-[76px] lg:pb-0")}>
                {hasConnector && (
                  <>
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-7 h-12 w-px bg-line lg:hidden"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute top-7 left-7 z-0 hidden h-px bg-line lg:block lg:w-[calc(100%+3rem)] xl:w-[calc(100%+5rem)]"
                    />
                  </>
                )}

                <div className="relative z-10 flex h-14 w-14 items-center justify-center">
                  <Icon className={cn("shrink-0", className)} />
                </div>

                <p className="mt-6 text-eyebrow font-semibold text-muted uppercase">{item.step}</p>
                <h3 className="mt-2 font-display text-title-20 font-bold text-ink">{item.title}</h3>
                <p className="mt-3 text-body-14 text-muted xl:text-body-16">{item.description}</p>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
