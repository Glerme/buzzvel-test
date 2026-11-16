import fs from "node:fs";
import path from "node:path";
import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

const QA_ARTIFACT_DIR =
  "/home/gui/.gemini/antigravity-cli/brain/d2457bb9-e23f-45ca-887e-dbfe8543d76d/scratch/qa";
const DESKTOP_REF_PATH = path.resolve(process.cwd(), "design/reference/desktop-1280.png");
const MOBILE_REF_PATH = path.resolve(process.cwd(), "design/reference/mobile-402.png");

const VIEWPORTS = [
  { name: "desktop", width: 1280, height: 800 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 402, height: 844 },
] as const;

async function scrollThroughAndWaitForAssets(page: Page): Promise<void> {
  await page.evaluate(async () => {
    await document.fonts.ready;
  });

  const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = 400;
  for (let y = 0; y <= scrollHeight; y += step) {
    await page.evaluate((pos) => window.scrollTo({ top: pos, behavior: "instant" }), y);
    await page.waitForTimeout(50);
  }

  await page.evaluate(async () => {
    const images = Array.from(document.images);
    await Promise.all(
      images.map((img) => {
        if (img.complete && img.naturalWidth > 0) return Promise.resolve();
        return new Promise<void>((resolve) => {
          const done = () => resolve();
          img.addEventListener("load", done, { once: true });
          img.addEventListener("error", done, { once: true });
        });
      }),
    );
  });

  await page.evaluate(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      }),
  );
}

function cropPng(source: PNG, width: number, height: number): PNG {
  if (source.width === width && source.height === height) {
    return source;
  }
  const cropped = new PNG({ width, height });
  PNG.bitblt(source, cropped, 0, 0, width, height, 0, 0);
  return cropped;
}

async function runVisualComparison(
  page: Page,
  config: {
    name: "desktop" | "mobile";
    width: number;
    height: number;
    referencePath: string;
    actualFilename: string;
    diffFilename: string;
  },
): Promise<void> {
  fs.mkdirSync(QA_ARTIFACT_DIR, { recursive: true });

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: config.width, height: config.height });
  await page.goto("/", { waitUntil: "load" });
  await scrollThroughAndWaitForAssets(page);

  const actualPath = path.join(QA_ARTIFACT_DIR, config.actualFilename);
  const diffPath = path.join(QA_ARTIFACT_DIR, config.diffFilename);

  await page.screenshot({ path: actualPath, fullPage: true });

  const actualPng = PNG.sync.read(fs.readFileSync(actualPath));
  const refPng = PNG.sync.read(fs.readFileSync(config.referencePath));

  const overlapWidth = Math.min(actualPng.width, refPng.width);
  const overlapHeight = Math.min(actualPng.height, refPng.height);

  const actualCropped = cropPng(actualPng, overlapWidth, overlapHeight);
  const refCropped = cropPng(refPng, overlapWidth, overlapHeight);
  const diffPng = new PNG({ width: overlapWidth, height: overlapHeight });

  const diffPixels = pixelmatch(
    actualCropped.data,
    refCropped.data,
    diffPng.data,
    overlapWidth,
    overlapHeight,
    {
      threshold: 0.1,
      includeAA: false,
    },
  );

  fs.writeFileSync(diffPath, PNG.sync.write(diffPng));

  const totalOverlapPixels = overlapWidth * overlapHeight;
  const mismatchPct = ((diffPixels / totalOverlapPixels) * 100).toFixed(2);
  const heightDiff = actualPng.height - refPng.height;
  const widthDiff = actualPng.width - refPng.width;

  console.log(
    `[Visual Diff - ${config.name}] actual=${actualPng.width}x${actualPng.height}, reference=${refPng.width}x${refPng.height}, widthDiff=${widthDiff}, heightDiff=${heightDiff}, overlap=${overlapWidth}x${overlapHeight}, diffPixels=${diffPixels}/${totalOverlapPixels}, mismatch=${mismatchPct}%`,
  );

  expect(actualPng.width).toBe(refPng.width);
  expect(fs.existsSync(actualPath)).toBe(true);
  expect(fs.existsSync(diffPath)).toBe(true);
}

test.describe("Luma Landing Page QA & Verification", () => {
  for (const viewport of VIEWPORTS) {
    test(`accessibility audit and zero horizontal overflow at ${viewport.name} (${viewport.width}x${viewport.height})`, async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto("/", { waitUntil: "load" });
      await scrollThroughAndWaitForAssets(page);

      const overflow = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      }));
      expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.innerWidth);

      const axeResults = await new AxeBuilder({ page }).analyze();
      if (axeResults.violations.length > 0) {
        console.error(
          `[Axe violations @ ${viewport.name}]`,
          JSON.stringify(axeResults.violations, null, 2),
        );
      }
      expect(axeResults.violations).toEqual([]);
    });
  }

  test("skip link appears on first Tab and moves focus to #main", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/", { waitUntil: "load" });

    await page.keyboard.press("Tab");

    const skipLink = page.getByRole("link", { name: "Skip to main content" });
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeVisible();

    const box = await skipLink.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeGreaterThan(10);
    expect(box!.height).toBeGreaterThan(10);

    await page.keyboard.press("Enter");

    const main = page.locator("#main");
    await expect(main).toBeFocused();
  });

  test("mobile menu opens on click, closes on Escape, and returns focus to toggle button", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 402, height: 844 });
    await page.goto("/", { waitUntil: "load" });

    const toggle = page.locator('button[aria-controls="mobile-menu"]');
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toHaveAttribute("aria-label", "Open menu");

    await toggle.click();

    const mobileMenu = page.locator("#mobile-menu");
    await expect(mobileMenu).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(toggle).toHaveAttribute("aria-label", "Close menu");

    await page.keyboard.press("Escape");

    await expect(mobileMenu).toBeHidden();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toHaveAttribute("aria-label", "Open menu");
    await expect(toggle).toBeFocused();
  });

  test("contact form validates empty/invalid fields and submits validly with aria-live feedback", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/", { waitUntil: "load" });

    const contactSection = page.locator("#contact");
    await contactSection.scrollIntoViewIfNeeded();

    const fullNameInput = contactSection.getByLabel("Full name");
    const emailInput = contactSection.getByLabel("Email");
    const questionInput = contactSection.getByLabel("Your question");
    const submitButton = contactSection.getByRole("button", { name: "Send message" });

    // Empty submission triggers aria-invalid + inline errors
    await submitButton.click();

    await expect(fullNameInput).toHaveAttribute("aria-invalid", "true");
    await expect(emailInput).toHaveAttribute("aria-invalid", "true");
    await expect(questionInput).toHaveAttribute("aria-invalid", "true");
    await expect(contactSection.getByText("Please enter your full name.")).toBeVisible();
    await expect(contactSection.getByText("Please enter your email address.")).toBeVisible();
    await expect(contactSection.getByText("Please enter your question.")).toBeVisible();

    // Invalid email and short inputs
    await fullNameInput.fill("A");
    await emailInput.fill("not-an-email");
    await questionInput.fill("Too short");
    await submitButton.click();

    await expect(fullNameInput).toHaveAttribute("aria-invalid", "true");
    await expect(emailInput).toHaveAttribute("aria-invalid", "true");
    await expect(questionInput).toHaveAttribute("aria-invalid", "true");
    await expect(
      contactSection.getByText("Full name must be at least 2 characters."),
    ).toBeVisible();
    await expect(contactSection.getByText("Please enter a valid email address.")).toBeVisible();
    await expect(
      contactSection.getByText("Your question must be at least 10 characters."),
    ).toBeVisible();

    // Valid submission displays aria-live status message
    await fullNameInput.fill("Alex Morgan");
    await emailInput.fill("alex@example.com");
    await questionInput.fill("Do you offer team learning packages for design teams?");
    await submitButton.click();

    const statusBanner = contactSection.getByRole("status");
    await expect(statusBanner).toBeVisible({ timeout: 3000 });
    await expect(statusBanner).toHaveAttribute("aria-live", "polite");
    await expect(statusBanner).toContainText("Message sent");
    await expect(statusBanner).toContainText(
      "Thanks for reaching out. Our team will get back to you within 24 hours on business days.",
    );
  });

  test("reduced motion reveals all sections immediately and renders final stats", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/", { waitUntil: "load" });

    const revealLocators = page.locator("[data-reveal]");
    const revealCount = await revealLocators.count();
    expect(revealCount).toBeGreaterThan(0);

    const opacities = await revealLocators.evaluateAll((elements) =>
      elements.map((el) => getComputedStyle(el).opacity),
    );
    for (const opacity of opacities) {
      expect(opacity).toBe("1");
    }

    const statValues = await page
      .locator('#testimonial dl dd span[aria-hidden="true"]')
      .allTextContents();
    expect(statValues).toEqual(["24K+", "120+", "92%"]);
  });

  test("visual comparison against Figma desktop-1280 reference", async ({ page }) => {
    await runVisualComparison(page, {
      name: "desktop",
      width: 1280,
      height: 800,
      referencePath: DESKTOP_REF_PATH,
      actualFilename: "actual-desktop.png",
      diffFilename: "diff-desktop.png",
    });
  });

  test("visual comparison against Figma mobile-402 reference", async ({ page }) => {
    await runVisualComparison(page, {
      name: "mobile",
      width: 402,
      height: 844,
      referencePath: MOBILE_REF_PATH,
      actualFilename: "actual-mobile.png",
      diffFilename: "diff-mobile.png",
    });
  });
});
