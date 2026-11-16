import { Footer, Header } from "@/components/layout";
import { Categories } from "@/components/sections/categories";
import { Contact } from "@/components/sections/contact";
import { FeaturedCourse } from "@/components/sections/featured-course";
import { FinalCTA } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { People } from "@/components/sections/people";
import { Testimonial } from "@/components/sections/testimonial";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Hero />
        <Categories />
        <FeaturedCourse />
        <HowItWorks />
        <Testimonial />
        <People />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
