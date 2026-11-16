import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { CONTACT_CONTENT } from "@/content/contact";
import { ContactForm } from "@/features/contact-form";

describe("ContactForm", () => {
  it("shows accessible inline validation errors when submitted empty", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: CONTACT_CONTENT.form.submitLabel }));

    const fullNameInput = screen.getByLabelText(CONTACT_CONTENT.form.fields.fullName.label);
    const emailInput = screen.getByLabelText(CONTACT_CONTENT.form.fields.email.label);
    const questionInput = screen.getByLabelText(CONTACT_CONTENT.form.fields.question.label);

    const fullNameError = screen.getByText("Please enter your full name.");
    const emailError = screen.getByText("Please enter your email address.");
    const questionError = screen.getByText("Please enter your question.");

    expect(fullNameInput).toHaveAttribute("aria-invalid", "true");
    expect(fullNameInput).toHaveAttribute("aria-describedby", fullNameError.id);

    expect(emailInput).toHaveAttribute("aria-invalid", "true");
    expect(emailInput).toHaveAttribute("aria-describedby", emailError.id);

    expect(questionInput).toHaveAttribute("aria-invalid", "true");
    expect(questionInput).toHaveAttribute("aria-describedby", questionError.id);
  });

  it("validates invalid email format and minimum lengths", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(CONTACT_CONTENT.form.fields.fullName.label), "A");
    await user.type(screen.getByLabelText(CONTACT_CONTENT.form.fields.email.label), "not-an-email");
    await user.type(screen.getByLabelText(CONTACT_CONTENT.form.fields.question.label), "Too short");

    await user.click(screen.getByRole("button", { name: CONTACT_CONTENT.form.submitLabel }));

    expect(screen.getByText("Full name must be at least 2 characters.")).toBeInTheDocument();
    expect(screen.getByText("Please enter a valid email address.")).toBeInTheDocument();
    expect(screen.getByText("Your question must be at least 10 characters.")).toBeInTheDocument();
  });

  it("clears field errors as soon as the user edits the invalid input", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: CONTACT_CONTENT.form.submitLabel }));
    expect(screen.getByText("Please enter your email address.")).toBeInTheDocument();

    const emailInput = screen.getByLabelText(CONTACT_CONTENT.form.fields.email.label);
    await user.type(emailInput, "alex@luma.com");

    expect(screen.queryByText("Please enter your email address.")).not.toBeInTheDocument();
    expect(emailInput).not.toHaveAttribute("aria-invalid");
    expect(emailInput).not.toHaveAttribute("aria-describedby");
  });

  it("disables submit during mock submission, announces success in aria-live region, and resets", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(
      screen.getByLabelText(CONTACT_CONTENT.form.fields.fullName.label),
      "Alex Morgan",
    );
    await user.type(
      screen.getByLabelText(CONTACT_CONTENT.form.fields.email.label),
      "alex@example.com",
    );
    await user.type(
      screen.getByLabelText(CONTACT_CONTENT.form.fields.question.label),
      "Do you offer team plans for product designers?",
    );

    const submitButton = screen.getByRole("button", { name: CONTACT_CONTENT.form.submitLabel });
    await user.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent(CONTACT_CONTENT.form.submittingLabel);

    await waitFor(
      () => {
        const statusBanner = screen.getByRole("status");
        expect(statusBanner).toHaveAttribute("aria-live", "polite");
        expect(statusBanner).toHaveTextContent(CONTACT_CONTENT.form.successTitle);
        expect(statusBanner).toHaveTextContent(CONTACT_CONTENT.form.successMessage);
      },
      { timeout: 1500 },
    );

    await user.click(screen.getByRole("button", { name: "Send another message" }));

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(screen.getByLabelText(CONTACT_CONTENT.form.fields.fullName.label)).toHaveValue("");
    expect(screen.getByLabelText(CONTACT_CONTENT.form.fields.email.label)).toHaveValue("");
    expect(screen.getByLabelText(CONTACT_CONTENT.form.fields.question.label)).toHaveValue("");
  });
});
