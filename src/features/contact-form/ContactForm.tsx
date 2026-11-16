"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Button, Field, Input, Textarea } from "@/components/ui";
import { CONTACT_CONTENT } from "@/content/contact";
import {
  hasContactErrors,
  validateContactForm,
  type ContactFormErrors,
  type ContactFormField,
  type ContactFormValues,
} from "./validation";

const INITIAL_VALUES: ContactFormValues = {
  fullName: "",
  email: "",
  question: "",
};

const FIELD_IDS: Record<ContactFormField, string> = {
  fullName: "contact-full-name",
  email: "contact-email",
  question: "contact-question",
};

const SUBMIT_DELAY_MS = 400;

/** Interactive contact form with client-side validation, mock async submission, and accessible feedback. */
export function ContactForm() {
  const { form } = CONTACT_CONTENT;
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "submitted">("idle");

  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const questionRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const focusFirstError = (nextErrors: ContactFormErrors) => {
    if (nextErrors.fullName) {
      fullNameRef.current?.focus();
    } else if (nextErrors.email) {
      emailRef.current?.focus();
    } else if (nextErrors.question) {
      questionRef.current?.focus();
    }
  };

  const handleChange =
    (field: ContactFormField) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const nextValue = event.target.value;
      setValues((prev) => ({ ...prev, [field]: nextValue }));

      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const nextErrors = validateContactForm(values);
    if (hasContactErrors(nextErrors)) {
      setErrors(nextErrors);
      focusFirstError(nextErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");

    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      setStatus("submitted");
    }, SUBMIT_DELAY_MS);
  };

  const handleReset = () => {
    setValues(INITIAL_VALUES);
    setErrors({});
    setStatus("idle");
  };

  const isSubmitting = status === "submitting";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="font-display text-title-20 leading-8 font-bold text-ink">{form.title}</h3>
        <p className="text-body-14 text-muted">{form.description}</p>
      </div>

      {status === "submitted" ? (
        <div
          role="status"
          aria-live="polite"
          className="flex flex-col items-start gap-4 rounded-xl border border-indigo-50 bg-cream p-6"
        >
          <div className="flex flex-col gap-1.5">
            <p className="font-display text-title-20 font-bold text-ink">{form.successTitle}</p>
            <p className="text-body-14 text-muted">{form.successMessage}</p>
          </div>
          <Button type="button" variant="secondary" size="sm" onClick={handleReset}>
            Send another message
          </Button>
        </div>
      ) : (
        <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-5">
            <Field
              id={FIELD_IDS.fullName}
              label={form.fields.fullName.label}
              error={errors.fullName}
            >
              <Input
                ref={fullNameRef}
                id={FIELD_IDS.fullName}
                name="fullName"
                type="text"
                autoComplete="name"
                required
                placeholder={form.fields.fullName.placeholder}
                value={values.fullName}
                onChange={handleChange("fullName")}
                hasError={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? `${FIELD_IDS.fullName}-error` : undefined}
              />
            </Field>

            <Field id={FIELD_IDS.email} label={form.fields.email.label} error={errors.email}>
              <Input
                ref={emailRef}
                id={FIELD_IDS.email}
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder={form.fields.email.placeholder}
                value={values.email}
                onChange={handleChange("email")}
                hasError={Boolean(errors.email)}
                aria-describedby={errors.email ? `${FIELD_IDS.email}-error` : undefined}
              />
            </Field>

            <Field
              id={FIELD_IDS.question}
              label={form.fields.question.label}
              error={errors.question}
            >
              <Textarea
                ref={questionRef}
                id={FIELD_IDS.question}
                name="question"
                required
                placeholder={form.fields.question.placeholder}
                value={values.question}
                onChange={handleChange("question")}
                hasError={Boolean(errors.question)}
                aria-describedby={errors.question ? `${FIELD_IDS.question}-error` : undefined}
              />
            </Field>
          </div>

          <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full">
            {isSubmitting ? form.submittingLabel : form.submitLabel}
          </Button>
        </form>
      )}
    </div>
  );
}
