import { test, expect } from "@playwright/test";

const fixture = [
  { id: 1, company: "Vercel", status: "Interview" },
  { id: 2, company: "Linear", status: "Applied" },
  { id: 3, company: "Sber", status: "Rejected" },
  { id: 4, company: "OpenAi", status: "Rejected" },
  { id: 5, company: "Microsoft", status: "Interview" },
].map((v) => ({ ...v, position: "Frontend", salary: "$2000", date: "2026-10-21" }));

const column = (page, status) => page.locator("h2").filter({ hasText: new RegExp(`^${status} `) }).locator("..");
const card = (page, id) => page.locator(`a[href="/vacancies/${id}"]`);
const saved = (page) => page.evaluate(() => JSON.parse(localStorage.getItem("vacancies")));
async function order(page, status) {
  return column(page, status).locator('a[href^="/vacancies/"]').evaluateAll(
    (elements) => elements.map((element) => Number(element.getAttribute("href").split("/").pop())),
  );
}

async function drag(page, source, target, { cancel = false, outside = false } = {}) {
  const a = await source.boundingBox();
  const b = outside ? { x: 1500, y: 920, width: 10, height: 10 } : await target.boundingBox();
  await page.mouse.move(a.x + a.width / 2, a.y + a.height / 2);
  await page.mouse.down();
  await page.mouse.move(a.x + a.width / 2 + 12, a.y + a.height / 2, { steps: 5 });
  await page.waitForTimeout(180);
  // Deliberately cross other populated columns: this reproduced the DOM crash.
  await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 30 });
  await page.waitForTimeout(500);
  if (cancel) await page.keyboard.press("Escape");
  await page.mouse.up();
  await page.waitForTimeout(500);
}

test.beforeEach(async ({ page }) => {
  await page.goto("/vacancies");
  await page.evaluate((items) => localStorage.setItem("vacancies", JSON.stringify(items)), fixture);
  await page.reload();
  // Fail on both uncaught exceptions and React console errors.
  page.on("pageerror", (error) => { throw error; });
  page.on("console", (message) => {
    if (message.type() === "error") throw new Error(message.text());
  });
});

test("empty column after crossing populated columns, persistence and return", async ({ page }) => {
  await drag(page, card(page, 2), column(page, "Offer").locator("div").first());
  await expect.poll(() => order(page, "Offer")).toEqual([2]);
  await page.reload();
  expect(await order(page, "Offer")).toEqual([2]);
  await drag(page, card(page, 2), column(page, "Applied").locator("div").first());
  await expect.poll(() => order(page, "Applied")).toEqual([2]);
  expect((await saved(page)).length).toBe(5);
});

test("occupied column insertion and sorting both directions survive reload", async ({ page }) => {
  await drag(page, card(page, 2), card(page, 5));
  expect(await order(page, "Interview")).toEqual([1, 2, 5]);
  await drag(page, card(page, 1), card(page, 5));
  expect(await order(page, "Interview")).toEqual([2, 5, 1]);
  await drag(page, card(page, 1), card(page, 2));
  expect(await order(page, "Interview")).toEqual([1, 2, 5]);
  await page.reload();
  expect(await order(page, "Interview")).toEqual([1, 2, 5]);
});

test("escape, outside drop and dropping on self keep storage unchanged", async ({ page }) => {
  const before = await saved(page);
  await drag(page, card(page, 2), card(page, 5), { cancel: true });
  expect(await saved(page)).toEqual(before);
  await drag(page, card(page, 2), null, { outside: true });
  expect(await saved(page)).toEqual(before);
  await drag(page, card(page, 2), card(page, 2));
  expect(await saved(page)).toEqual(before);
});

test("search sorts visible cards without reordering hidden cards", async ({ page }) => {
  await page.evaluate((items) => localStorage.setItem("vacancies", JSON.stringify([
    { ...items[0], company: "Match A" },
    { ...items[1], status: "Interview", company: "Hidden" },
    { ...items[4], company: "Match B" },
  ])), fixture);
  await page.reload();
  await page.getByPlaceholder("Search vacancies...").fill("Match");
  await drag(page, card(page, 1), card(page, 5));
  expect(await order(page, "Interview")).toEqual([5, 1]);
  await page.getByPlaceholder("Search vacancies...").fill("");
  expect(await order(page, "Interview")).toEqual([5, 2, 1]);
});

test("corrupt rows are isolated; IDs, invalid status and optional fields repaired", async ({ page }) => {
  await page.evaluate((items) => localStorage.setItem("vacancies", JSON.stringify([
    null, {}, { ...items[0], id: "1", status: "broken", salary: null },
    items[0], { ...items[1], date: "bad date" }, items[4],
  ])), fixture);
  await page.reload();
  expect(await order(page, "Saved")).toEqual([1]);
  expect(await order(page, "Interview")).toEqual([5]);
  expect((await saved(page)).map((item) => item.id)).toEqual([1, 5]);
  await drag(page, card(page, 1), card(page, 5));
  expect(await order(page, "Interview")).toEqual([1, 5]);
});

for (const value of ["broken JSON", "null", "{}", "[]"]) {
  test(`storage payload ${value} does not crash`, async ({ page }) => {
    await page.evaluate((payload) => localStorage.setItem("vacancies", payload), value);
    await page.reload();
    await expect(column(page, "Saved")).toBeVisible();
    expect((await saved(page)).length).toBe(value === "[]" ? 0 : 5);
  });
}

test("denied storage keeps board usable in memory", async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new DOMException("Denied", "SecurityError"); };
    Storage.prototype.setItem = () => { throw new DOMException("Full", "QuotaExceededError"); };
  });
  await page.reload();
  await drag(page, card(page, 2), column(page, "Offer").locator("div").first());
  expect(await order(page, "Offer")).toEqual([2]);
});
