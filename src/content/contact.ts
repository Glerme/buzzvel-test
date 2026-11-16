import { CONTACT_EMAIL } from "@/lib/constants";

export const CONTACT_CONTENT = {
  eyebrow: "CONTACT",
  heading: "Get in touch",
  description:
    "Have a question? We’re here to help. Whether you’re looking for the right course, learning with your team or interested in teaching with Luma, we’d love to hear from you.",
  cards: [
    {
      id: "email",
      title: "Email",
      value: CONTACT_EMAIL,
      href: `mailto:${CONTACT_EMAIL}`,
    },
    {
      id: "response-time",
      title: "Response Time",
      value: "Up to 24 hours on business days",
    },
  ],
  form: {
    title: "Contact us",
    description: "Fill out the fields and we will get in touch.",
    fields: {
      fullName: { label: "Full name", placeholder: "Your name" },
      email: { label: "Email", placeholder: "youremail@example.com" },
      question: { label: "Your question", placeholder: "Tell us how we can help..." },
    },
    submitLabel: "Send message",
    submittingLabel: "Sending...",
    successTitle: "Message sent",
    successMessage:
      "Thanks for reaching out. Our team will get back to you within 24 hours on business days.",
  },
} as const;
