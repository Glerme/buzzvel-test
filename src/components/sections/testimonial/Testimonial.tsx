import Image from "next/image";
import { QuoteIcon } from "@/components/icons";
import { CountUp, Reveal } from "@/components/motion";
import { Container } from "@/components/ui";
import { TESTIMONIAL_CONTENT } from "@/content/testimonial";

/** Customer testimonial quote paired with key Luma learning metrics. */
export function Testimonial() {
  const { quote, author, stats } = TESTIMONIAL_CONTENT;

  return (
    <section
      id="testimonial"
      aria-labelledby="testimonial-author"
      className="bg-white py-[60px] xl:py-[100px]"
    >
      <Container>
        <div className="flex flex-col gap-[60px] lg:flex-row lg:items-center lg:justify-between">
          <Reveal className="w-full max-w-[600px]">
            <figure>
              <QuoteIcon />
              <blockquote className="mt-4 font-display text-title-20 font-semibold text-ink max-xl:leading-8 xl:text-quote-30">
                {quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <Image
                  src={author.avatar}
                  alt={author.alt}
                  width={48}
                  height={48}
                  placeholder="blur"
                  className="h-12 w-12 shrink-0 rounded-full bg-indigo-50 object-cover"
                />
                <div>
                  <p
                    id="testimonial-author"
                    className="text-body-16 font-bold text-ink max-xl:leading-[26px]"
                  >
                    {author.name}
                  </p>
                  <p className="text-body-14 text-muted">{author.role}</p>
                </div>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delayMs={120} className="w-full lg:w-[360px] lg:shrink-0 xl:w-[401px]">
            <dl className="grid grid-cols-3 gap-5 lg:grid-cols-1 lg:border-l lg:border-line lg:pl-12">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <dt className="order-2 mt-1 text-body-14 text-muted-2">{stat.label}</dt>
                  <dd className="order-1 font-display text-display-40 font-extrabold text-primary xl:text-display-64">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
