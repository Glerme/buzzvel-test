import { ArrowIcon } from "@/components/icons";
import { Reveal } from "@/components/motion";
import { Badge, Container, Eyebrow } from "@/components/ui";
import { CATEGORIES_CONTENT } from "@/content/categories";

/** Course categories section with a 4-card responsive grid and staggered scroll reveal. */
export function Categories() {
  return (
    <section id="categories" className="bg-white py-[60px] xl:py-[100px]">
      <Container>
        <div className="max-w-[560px]">
          <Eyebrow>{CATEGORIES_CONTENT.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-display-32 font-extrabold text-ink xl:text-display-48">
            {CATEGORIES_CONTENT.heading}
          </h2>
          <p className="mt-4 text-body-16 leading-[26px] text-muted-2 xl:text-body-18 xl:leading-[28px]">
            {CATEGORIES_CONTENT.description}
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 xl:mt-10 xl:grid-cols-4 xl:gap-5">
          {CATEGORIES_CONTENT.items.map((item, index) => (
            <li key={item.number} className="flex">
              <Reveal delayMs={index * 75} className="flex w-full">
                <a
                  href={item.href}
                  className="group flex w-full flex-col justify-between rounded-xl border border-line-soft bg-white p-6 hover:border-primary/40 hover:shadow-form motion-safe:transition-[border-color,box-shadow] motion-safe:duration-200 xl:p-7"
                >
                  <div>
                    <Badge variant="number" aria-hidden="true">
                      {item.number}
                    </Badge>
                    <h3 className="mt-5 font-display text-title-20 font-bold text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-body-14 text-muted-2">{item.description}</p>
                  </div>

                  <span className="mt-6 inline-flex items-center gap-2 text-body-14 font-bold text-ink group-hover:text-primary motion-safe:transition-colors motion-safe:duration-200">
                    <span>Explore</span>
                    <ArrowIcon className="h-5 w-5 shrink-0 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-1" />
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
