import { ChatIcon, ClockIcon } from "@/components/icons";
import { Reveal } from "@/components/motion";
import { Container, Eyebrow } from "@/components/ui";
import { CONTACT_CONTENT } from "@/content/contact";
import { ContactForm } from "@/features/contact-form";

/** Contact section pairing direct email/response-time cards with the interactive ContactForm. */
export function Contact() {
  const { eyebrow, heading, description, cards } = CONTACT_CONTENT;
  const emailCard = cards[0];
  const responseCard = cards[1];

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-white py-[60px] xl:py-[100px]"
    >
      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12 xl:gap-[100px]">
          <Reveal className="flex w-full flex-col gap-8 lg:max-w-[480px] lg:gap-10">
            <div className="flex flex-col gap-4">
              <Eyebrow>{eyebrow}</Eyebrow>
              <h2
                id="contact-heading"
                className="font-display text-display-32 font-extrabold text-ink xl:text-display-48"
              >
                {heading}
              </h2>
              <p className="text-body-14 text-muted xl:text-body-18">{description}</p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 rounded-xl bg-cream p-4 xl:p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-indigo-50 text-primary">
                  <ChatIcon className="h-6 w-6" />
                </div>
                <div className="flex flex-col gap-0.5 xl:gap-1">
                  <p className="text-body-14 text-ink">{emailCard.title}</p>
                  <address className="not-italic">
                    <a
                      href={emailCard.href}
                      className="text-body-14 text-primary underline-offset-4 hover:underline"
                    >
                      {emailCard.value}
                    </a>
                  </address>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl bg-cream p-4 xl:p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-indigo-50 text-primary">
                  <ClockIcon className="h-5 w-5" />
                </div>
                <div className="flex flex-col gap-0.5 xl:gap-1">
                  <p className="text-body-14 text-ink">{responseCard.title}</p>
                  <p className="text-body-14 text-muted">{responseCard.value}</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delayMs={120} className="w-full lg:max-w-[540px]">
            <div className="rounded-2xl border border-line bg-white p-6 shadow-form md:p-10">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
