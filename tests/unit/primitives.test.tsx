import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CountUp } from "@/components/motion";
import { Button } from "@/components/ui";

describe("Button primitive", () => {
  it("renders a link when href is provided and a button otherwise", () => {
    render(
      <>
        <Button href="#categories" variant="primary">
          Explore courses
        </Button>
        <Button type="submit" variant="accent">
          View course
        </Button>
      </>,
    );

    const link = screen.getByRole("link", { name: "Explore courses" });
    expect(link).toHaveAttribute("href", "#categories");

    const button = screen.getByRole("button", { name: "View course" });
    expect(button).toHaveAttribute("type", "submit");
  });
});

describe("CountUp reduced motion", () => {
  it("displays the final value immediately when prefers-reduced-motion is reduce", () => {
    vi.mocked(window.matchMedia).mockImplementation((query: string) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(<CountUp value={92} suffix="%" />);
    expect(screen.getAllByText("92%").length).toBeGreaterThanOrEqual(1);
  });
});
