import people01 from "@/assets/images/people-01.jpg";
import people02 from "@/assets/images/people-02.jpg";
import people03 from "@/assets/images/people-03.jpg";
import people04 from "@/assets/images/people-04.jpg";
import people05 from "@/assets/images/people-05.jpg";
import people06 from "@/assets/images/people-06.jpg";
import people07 from "@/assets/images/people-07.jpg";
import people08 from "@/assets/images/people-08.jpg";
import people09 from "@/assets/images/people-09.jpg";
import people10 from "@/assets/images/people-10.jpg";
import type { CollagePhoto } from "@/types";

export const PEOPLE_CONTENT = {
  eyebrow: "The people",
  heading: "Meet international students & teachers",
  description:
    "Morbi sit egestas dignissim pharetra, sed amet. Tempus justo senectus risus ac vel, velit, nunc. Eget commodo eget in aliquam facilisi facilisi nec magna hendrerit. Placerat ipsum sit tellus urna, faucibus aenean lorem faucibus integer.",
  cta: { label: "Explore teachers and students", href: "#contact" },
  figcaption:
    "Collage of international Luma students and instructors learning, collaborating, and teaching together",
  photos: [
    {
      id: "people-01",
      src: people01,
      alt: "Student waving during an online study session",
      column: 0,
      desktopWidth: 103,
      desktopHeight: 154,
      mobileWidth: 72,
      mobileHeight: 96,
    },
    {
      id: "people-02",
      src: people02,
      alt: "Group of students collaborating around laptops",
      column: 0,
      desktopWidth: 138,
      desktopHeight: 207,
      mobileWidth: 94,
      mobileHeight: 129,
    },
    {
      id: "people-03",
      src: people03,
      alt: "Student reading course notes in a library",
      column: 1,
      desktopWidth: 103,
      desktopHeight: 170,
      mobileWidth: 72,
      mobileHeight: 106,
    },
    {
      id: "people-04",
      src: people04,
      alt: "Two learners discussing a project in a bright studio",
      column: 1,
      desktopWidth: 103,
      desktopHeight: 173,
      mobileWidth: 72,
      mobileHeight: 108,
    },
    {
      id: "people-05",
      src: people05,
      alt: "Student writing notes while watching a lesson",
      column: 1,
      desktopWidth: 103,
      desktopHeight: 128,
      mobileWidth: 72,
      mobileHeight: 80,
    },
    {
      id: "people-06",
      src: people06,
      alt: "Smiling graduate holding a diploma",
      column: 2,
      desktopWidth: 103,
      desktopHeight: 137,
      mobileWidth: 72,
      mobileHeight: 86,
    },
    {
      id: "people-07",
      src: people07,
      alt: "Learner studying on a laptop at a wooden desk",
      column: 2,
      desktopWidth: 103,
      desktopHeight: 138,
      mobileWidth: 72,
      mobileHeight: 86,
    },
    {
      id: "people-08",
      src: people08,
      alt: "Remote mentoring session on a desktop monitor",
      column: 2,
      desktopWidth: 103,
      desktopHeight: 154,
      mobileWidth: 72,
      mobileHeight: 96,
    },
    {
      id: "people-09",
      src: people09,
      alt: "Student holding notebooks outdoors on campus",
      column: 3,
      desktopWidth: 128,
      desktopHeight: 205,
      mobileWidth: 88,
      mobileHeight: 128,
    },
    {
      id: "people-10",
      src: people10,
      alt: "Learner smiling while walking with study materials",
      column: 3,
      desktopWidth: 103,
      desktopHeight: 132,
      mobileWidth: 72,
      mobileHeight: 82,
    },
  ] satisfies CollagePhoto[],
} as const;
