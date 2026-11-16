import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Header } from "@/components/layout";

describe("Header & MobileMenu", () => {
  it("toggles aria-expanded and opens/closes the mobile menu", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const toggle = screen.getByRole("button", { name: "Open menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAttribute("aria-controls", "mobile-menu");
    expect(document.getElementById("mobile-menu")).not.toBeInTheDocument();

    await user.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveAttribute("aria-label", "Close menu");
    const menu = document.getElementById("mobile-menu");
    expect(menu).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");

    const mobileNav = within(menu!).getByRole("navigation", { name: "Mobile navigation" });
    expect(within(mobileNav).getByRole("link", { name: "Courses" })).toBeInTheDocument();
    expect(within(menu!).getByRole("link", { name: "Log in" })).toBeInTheDocument();
    expect(within(menu!).getByRole("link", { name: "Start learning" })).toBeInTheDocument();

    await user.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAttribute("aria-label", "Open menu");
    expect(document.getElementById("mobile-menu")).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
  });

  it("closes on Escape and returns focus to the toggle button", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const toggle = screen.getByRole("button", { name: "Open menu" });
    await user.click(toggle);

    const menu = document.getElementById("mobile-menu");
    expect(menu).toBeInTheDocument();

    const firstLink = within(menu!).getByRole("link", { name: "Courses" });
    firstLink.focus();
    expect(firstLink).toHaveFocus();

    await user.keyboard("{Escape}");

    expect(document.getElementById("mobile-menu")).not.toBeInTheDocument();
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveFocus();
    expect(document.body.style.overflow).toBe("");
  });

  it("closes when clicking a link inside the mobile menu", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const toggle = screen.getByRole("button", { name: "Open menu" });
    await user.click(toggle);

    const menu = document.getElementById("mobile-menu");
    expect(menu).toBeInTheDocument();

    await user.click(within(menu!).getByRole("link", { name: "Courses" }));

    expect(document.getElementById("mobile-menu")).not.toBeInTheDocument();
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(document.body.style.overflow).toBe("");
  });
});
