import { test, expect } from "@playwright/test";

const statuses = ["Saved", "Applied", "Interview", "Offer", "Rejected"];
const fixture = [
  [1, "Saved"], [2, "Saved"], [3, "Saved"], [4, "Saved"],
  [5, "Applied"], [6, "Applied"], [7, "Applied"], [8, "Interview"],
].map(([id, status]) => ({
  id, status, company: `Company ${id}`, position: "Frontend", salary: "$2000", date: "2026-10-21",
}));
const card = (page, id) => page.locator(`a[href="/vacancies/${id}"]`);
const column = (page, status) => page.locator("h2").filter({ hasText: new RegExp(`^${status} `) }).locator("..");
const order = (page, status) => column(page, status).locator('a[href^="/vacancies/"]').evaluateAll(
  (cards) => cards.map((element) => Number(element.getAttribute("href").split("/").pop())),
);

async function seed(page, items = fixture) {
  await page.goto("/vacancies");
  await page.evaluate((rows) => localStorage.setItem("vacancies", JSON.stringify(rows)), items);
  await page.reload();
}

// All coordinates are actual cursor positions, not the dragged card's centre.
async function dragTo(page, id, point, { pickup = 0.5, cancel = false } = {}) {
  // Wait for dnd-kit's previous drop feedback to finish before measuring.
  await expect(page.locator("[data-dnd-dragging], [data-dnd-dropping]")).toHaveCount(0);
  const rect = await card(page, id).boundingBox();
  const x = rect.x + rect.width * 0.25;
  const y = rect.y + rect.height * pickup;
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + 12, y, { steps: 4 });
  await page.waitForTimeout(180);
  await expect(page.locator(`[data-vacancy-id="${id}"][data-dnd-dragging]`)).toBeVisible();
  await page.mouse.move(point.x, point.y, { steps: 24 });
  await page.waitForTimeout(200);
  if (cancel) await page.keyboard.press("Escape");
  await page.mouse.up();
  await expect(page.locator("[data-dnd-dragging], [data-dnd-dropping]")).toHaveCount(0);
}

async function dropOn(page, source, target, half, options) {
  const rect = await card(page, target).boundingBox();
  await dragTo(page, source, {
    x: rect.x + rect.width / 2,
    y: rect.y + rect.height * (half === "before" ? 0.25 : 0.75),
  }, options);
}

async function expectOrder(page, status, ids) {
  await expect.poll(() => order(page, status)).toEqual(ids);
  await expect.poll(() => page.evaluate((s) => JSON.parse(localStorage.getItem("vacancies"))
    .filter((row) => row.status === s).map((row) => row.id), status)).toEqual(ids);
}

test.beforeEach(async ({ page }) => {
  page.on("pageerror", (error) => { throw error; });
  page.on("console", (message) => {
    if (message.type() === "error") throw new Error(message.text());
  });
  await seed(page);
});

const cases = [
  { name: "down before target", source: 1, target: 3, half: "before", expected: [2, 1, 3, 4] },
  { name: "up after target", source: 4, target: 2, half: "after", expected: [1, 2, 4, 3] },
  { name: "neighbour before is a no-op", source: 1, target: 2, half: "before", expected: [1, 2, 3, 4] },
  { name: "neighbour after is a no-op", source: 2, target: 1, half: "after", expected: [1, 2, 3, 4] },
  { name: "last to beginning", source: 4, target: 1, half: "before", expected: [4, 1, 2, 3] },
  { name: "first to end", source: 1, target: 4, half: "after", expected: [2, 3, 4, 1] },
  { name: "cross-column before first", source: 5, target: 1, half: "before", expected: [5, 1, 2, 3, 4] },
  { name: "cross-column after middle", source: 5, target: 2, half: "after", expected: [1, 2, 5, 3, 4] },
  { name: "cross-column after last", source: 5, target: 4, half: "after", expected: [1, 2, 3, 4, 5] },
];
for (const scenario of cases) {
  test(scenario.name, async ({ page }) => {
    await dropOn(page, scenario.source, scenario.target, scenario.half);
    await expectOrder(page, "Saved", scenario.expected);
  });
}

test("gap between cards inserts in that gap", async ({ page }) => {
  const a = await card(page, 2).boundingBox();
  const b = await card(page, 3).boundingBox();
  await dragTo(page, 5, { x: a.x + a.width / 2, y: (a.y + a.height + b.y) / 2 });
  await expectOrder(page, "Saved", [1, 2, 5, 3, 4]);
});

test("column heading inserts at beginning; free space below cards appends", async ({ page }) => {
  const heading = await column(page, "Applied").locator("h2").boundingBox();
  await dragTo(page, 1, { x: heading.x + heading.width / 2, y: heading.y + heading.height / 2 });
  await expectOrder(page, "Applied", [1, 5, 6, 7]);
  const rect = await card(page, 7).boundingBox();
  await dragTo(page, 2, { x: rect.x + rect.width / 2, y: rect.y + rect.height + 12 });
  await expectOrder(page, "Applied", [1, 5, 6, 7, 2]);
});

test("cursor half wins even when picked up near opposite card edge", async ({ page }) => {
  await dropOn(page, 5, 2, "after", { pickup: 0.1 });
  await expectOrder(page, "Saved", [1, 2, 5, 3, 4]);
  await dropOn(page, 7, 2, "before", { pickup: 0.9 });
  await expectOrder(page, "Saved", [1, 7, 2, 5, 3, 4]);
});

test("final half after hovering both halves determines insertion", async ({ page }) => {
  const start = await card(page, 5).boundingBox();
  const target = await card(page, 2).boundingBox();
  await page.mouse.move(start.x + start.width / 2, start.y + start.height / 2);
  await page.mouse.down();
  await page.mouse.move(start.x + start.width / 2 + 12, start.y + start.height / 2, { steps: 4 });
  await expect(page.locator('[data-vacancy-id="5"][data-dnd-dragging]')).toBeVisible();
  await page.mouse.move(target.x + target.width / 2, target.y + target.height * 0.25, { steps: 24 });
  await page.waitForTimeout(200);
  // Same target ID, different intended slot. Release without waiting for a frame.
  await page.mouse.move(target.x + target.width / 2, target.y + target.height * 0.75);
  await page.mouse.up();
  await expectOrder(page, "Saved", [1, 2, 5, 3, 4]);
});

test("12 consecutive moves preserve every column and exact order after reload", async ({ page }) => {
  const moves = [
    [1, 3, "before", "Saved", [2, 1, 3, 4]],
    [4, 2, "after", "Saved", [2, 4, 1, 3]],
    [5, 1, "after", "Saved", [2, 4, 1, 5, 3]],
    [3, 6, "before", "Applied", [3, 6, 7]],
    [7, 8, "after", "Interview", [8, 7]],
    [8, 2, "before", "Saved", [8, 2, 4, 1, 5]],
    [2, 7, "after", "Interview", [7, 2]],
    [6, 5, "before", "Saved", [8, 4, 1, 6, 5]],
    [8, 3, "after", "Applied", [3, 8]],
    [4, 2, "before", "Interview", [7, 4, 2]],
    [2, 1, "after", "Saved", [1, 2, 6, 5]],
    [5, 3, "before", "Applied", [5, 3, 8]],
  ];
  for (const [source, target, half, status, expected] of moves) {
    await dropOn(page, source, target, half);
    await expectOrder(page, status, expected);
    const rows = await page.evaluate(() => JSON.parse(localStorage.getItem("vacancies")));
    expect(rows).toHaveLength(8);
    expect(new Set(rows.map((row) => row.id)).size).toBe(8);
    for (const s of statuses) expect(await order(page, s)).toEqual(rows.filter((row) => row.status === s).map((row) => row.id));
  }
  await page.reload();
  await expectOrder(page, "Saved", [1, 2, 6]);
  await expectOrder(page, "Applied", [5, 3, 8]);
  await expectOrder(page, "Interview", [7, 4]);
});

test("search preserves hidden slots and their relative order", async ({ page }) => {
  await seed(page, fixture.map((row) => ({ ...row, company: row.id === 2 ? "Hidden" : `Match ${row.id}` })));
  await page.getByPlaceholder("Search vacancies...").fill("Match");
  await dropOn(page, 1, 3, "before");
  await expect.poll(() => order(page, "Saved")).toEqual([1, 3, 4]);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem("vacancies"))
    .filter((row) => row.status === "Saved").map((row) => row.id))).toEqual([1, 2, 3, 4]);
  await dropOn(page, 5, 3, "after");
  await expect.poll(() => order(page, "Saved")).toEqual([1, 3, 5, 4]);
  await page.getByPlaceholder("Search vacancies...").fill("");
  await expectOrder(page, "Saved", [1, 2, 3, 5, 4]);
});

test("cancel after moving through both halves leaves all records unchanged", async ({ page }) => {
  await dropOn(page, 5, 2, "after", { cancel: true });
  await expectOrder(page, "Saved", [1, 2, 3, 4]);
  await expectOrder(page, "Applied", [5, 6, 7]);
});

test("card routing and CRUD still work after a cross-column drop", async ({ page }) => {
  await dropOn(page, 5, 2, "after");
  await card(page, 5).click();
  await expect(page).toHaveURL(/\/vacancies\/5$/);
  await page.getByRole("link", { name: "Edit", exact: true }).click();
  await page.locator('[name="company"]').fill("Edited company");
  await page.locator('[name="status"]').selectOption("Offer");
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(page.getByText("Edited company", { exact: true })).toBeVisible();
  await page.getByRole("link", { name: "Back to vacancies" }).click();
  await expectOrder(page, "Offer", [5]);
  await page.getByRole("link", { name: "Add vacancy" }).click();
  await page.locator('[name="company"]').fill("Created company");
  await page.locator('[name="position"]').fill("Frontend");
  await page.locator('[name="date"]').fill("2026-10-22");
  await page.getByRole("button", { name: "Create", exact: true }).click();
  const created = page.locator('[data-vacancy-id]').filter({ hasText: "Created company" });
  const id = Number(await created.getAttribute("data-vacancy-id"));
  await created.click();
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "Delete", exact: true }).click();
  await expect(page).toHaveURL(/\/vacancies$/);
  await expect(card(page, id)).toHaveCount(0);
  await page.reload();
  await expectOrder(page, "Offer", [5]);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem("vacancies")).length)).toBe(8);
});

for (const from of statuses) {
  for (const to of statuses.filter((status) => status !== from)) {
    test(`${from} -> ${to}: filled and empty destination`, async ({ page }) => {
      const items = statuses.flatMap((status, index) => [1, 2].map((offset) => ({
        ...fixture[0], id: index * 2 + offset, status,
      })));
      await seed(page, items);
      const source = statuses.indexOf(from) * 2 + 1;
      const target = statuses.indexOf(to) * 2 + 1;
      await dropOn(page, source, target, "after");
      await expectOrder(page, to, [target, source, target + 1]);
      // Empty the original column, then return a card into it.
      await dropOn(page, source + 1, target, "before");
      const empty = await column(page, from).locator("div").first().boundingBox();
      await dragTo(page, source, { x: empty.x + empty.width / 2, y: empty.y + empty.height / 2 });
      await expectOrder(page, from, [source]);
    });
  }
}
