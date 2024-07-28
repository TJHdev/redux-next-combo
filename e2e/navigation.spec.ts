import { test, expect } from "@playwright/test";

test("Navigate to feed page and verify content", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await expect(page.getByText("click the Feed link above to")).toBeVisible();
  await page.getByRole("link", { name: "Feed" }).click();

  await expect(page.getByRole("progressbar")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Recent Posts" })
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Robot 251" })).toBeVisible();
  await expect(page.getByText("Its waters cascading in a")).toBeVisible();
  await page.getByRole("heading", { name: "Robot 251" }).click();

  await expect(page.getByText("Its waters cascading in a")).toBeVisible();
  await page.getByRole("button", { name: "back" }).click();

  await expect(
    page.getByRole("heading", { name: "Recent Posts" })
  ).toBeVisible();
});

test("Infinte scroll", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await expect(page.getByText("click the Feed link above to")).toBeVisible();
  await page.getByRole("link", { name: "Feed" }).click();

  await expect(page.getByRole("progressbar")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Recent Posts" })
  ).toBeVisible();

  await expect(page.getByRole("heading", { name: "Robot 251" })).toBeVisible();
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect(page.getByRole("progressbar")).toBeVisible();

  await expect(page.getByRole("heading", { name: "Robot 231" })).toBeVisible();
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect(page.getByRole("progressbar")).toBeVisible();

  await expect(page.getByRole("heading", { name: "Robot 212" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Robot 211" })).toBeVisible();
});

test("Simulate real time message", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await expect(page.getByText("click the Feed link above to")).toBeVisible();
  await page.getByRole("link", { name: "Feed" }).click();

  await expect(page.getByRole("progressbar")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Recent Posts" })
  ).toBeVisible();

  await expect(page.getByRole("heading", { name: "Robot 251" })).toBeVisible();
  await page.getByLabel("add new post").click();

  await expect(page.getByRole("heading", { name: "Robot 252" })).toBeVisible();

  await page.getByLabel("add new post").click();
  await page.getByLabel("add new post").click();
  await page.getByLabel("add new post").click();

  await expect(page.getByRole("heading", { name: "Robot 255" })).toBeVisible();
});

test("Mock API response with error", async ({ page }) => {
  // await page.route("https://dummyjson.com/posts", async (route) => {
  await page.route(
    "https://dummyjson.com/posts?limit=20&skip=0&sortBy=id&order=desc&delay=1000",
    async (route) => {
      setTimeout(async () => {
        const thing = await route.fulfill({
          status: 500,
          contentType: "application/json",
          body: JSON.stringify({
            error: true,
            message: "Internal Server Error",
            code: 500,
          }),
        });
        return thing;
      }, 1000);
    }
  );

  await page.goto("http://localhost:3000/");

  await expect(page.getByText("click the Feed link above to")).toBeVisible();
  await page.getByRole("link", { name: "Feed" }).click();

  await expect(page.getByRole("progressbar")).toBeVisible();
  await expect(page.getByText("Error: Failed to fetch posts.")).toBeVisible();
});
