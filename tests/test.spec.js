import { test, expect } from "@playwright/test";
import fs from "fs";

test("Simple benchmark test with screenshot", async ({ page }) => {
  console.log("🚀 Starting test...");

  // Убедимся что папка существует
  if (!fs.existsSync("screenshots")) {
    fs.mkdirSync("screenshots", { recursive: true });
  }

  await page.goto("http://localhost:3000");
  console.log("✅ Page loaded");

  // Ждем загрузки страницы
  await page.waitForLoadState("networkidle");

  // Проверяем что инпут существует
  const inputExists = await page.locator("#input").count();
  console.log(`Input exists: ${inputExists > 0}`);

  // Вводим число
  await page.fill("#input", "1234.56");
  console.log("✅ Input filled");

  // Скриншот до
  await page.screenshot({
    path: "screenshots/before.png",
    fullPage: true,
  });
  console.log("✅ Screenshot before saved");

  // Нажимаем кнопку
  console.log("🔘 Clicking benchmark button...");
  await page.click("#benchmarkBtn");
  console.log("✅ Button clicked");

  // Ждем результат
  await page.waitForTimeout(3000);

  // Проверяем что output обновился
  const outputText = await page.textContent("#output");
  console.log("📊 Output:", outputText);

  // Скриншот после
  await page.screenshot({
    path: "screenshots/after.png",
    fullPage: true,
  });
  console.log("✅ Screenshot after saved");

  // Проверяем
  expect(outputText).toContain("Benchmark");
  expect(outputText).toContain("Winner:");

  console.log("✅ Test passed!");
});

test("Quick Rust test", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.fill("#input", "1234.56");
  await page.click("#rustBtn");
  await page.waitForTimeout(1000);

  const output = await page.textContent("#output");
  console.log("Rust output:", output);
  expect(output).toContain("Result:");
});
