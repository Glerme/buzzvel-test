export interface ContactFormValues {
  fullName: string;
  email: string;
  question: string;
}

export type ContactFormField = keyof ContactFormValues;

export type ContactFormErrors = Partial<Record<ContactFormField, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Validates a single contact form field and returns an error message when invalid. */
export function validateContactField(field: ContactFormField, value: string): string | undefined {
  const trimmed = value.trim();

  switch (field) {
    case "fullName":
      if (!trimmed) return "Please enter your full name.";
      if (trimmed.length < 2) return "Full name must be at least 2 characters.";
      return undefined;
    case "email":
      if (!trimmed) return "Please enter your email address.";
      if (!EMAIL_PATTERN.test(trimmed)) return "Please enter a valid email address.";
      return undefined;
    case "question":
      if (!trimmed) return "Please enter your question.";
      if (trimmed.length < 10) return "Your question must be at least 10 characters.";
      return undefined;
  }
}

/** Validates all contact form fields and returns a map of field errors. */
export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  (Object.keys(values) as ContactFormField[]).forEach((field) => {
    const error = validateContactField(field, values[field]);
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
}

/** Returns true when any field has a validation error. */
export function hasContactErrors(errors: ContactFormErrors): boolean {
  return Object.values(errors).some(Boolean);
}
