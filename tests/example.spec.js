import { test, expect } from '@playwright/test';

test('click Rust button and verify output changes', async ({ page }) => {
  // Go to the page
  await page.goto('/');
  
  // Wait for page to load
  await page.waitForSelector('#rustBtn');
  await page.waitForSelector('#output');
  
  // Get initial text
  const initialText = await page.textContent('#output');
  
  // Click the Rust WASM button
  await page.click('#rustBtn');
  
  // Wait for output to change (not equal to initial)
  await page.waitForFunction(
    ({ initial }) => {
      const output = document.getElementById('output');
      return output && output.textContent !== initial;
    },
    { initial: initialText },
    { timeout: 10000 }
  );
  
  // Get the output text
  const output = await page.textContent('#output');
  
  // Verify that the output has changed and contains some result
  expect(output).toBeTruthy();
  expect(output.length).toBeGreaterThan(5);
  // Check for common result indicators
  expect(output.toLowerCase()).toMatch(/(result|time|ms|executed|completed|iterations)/);
});

test('click JS button and verify output changes', async ({ page }) => {
  // Go to the page
  await page.goto('/');
  
  // Wait for page to load
  await page.waitForSelector('#jsBtn');
  await page.waitForSelector('#output');
  
  // Get initial text
  const initialText = await page.textContent('#output');
  
  // Click the JavaScript button
  await page.click('#jsBtn');
  
  // Wait for output to change
  await page.waitForFunction(
    ({ initial }) => {
      const output = document.getElementById('output');
      return output && output.textContent !== initial;
    },
    { initial: initialText },
    { timeout: 10000 }
  );
  
  // Get the output text
  const output = await page.textContent('#output');
  
  // Verify that the output has changed and contains some result
  expect(output).toBeTruthy();
  expect(output.length).toBeGreaterThan(5);
  // Check for common result indicators
  expect(output.toLowerCase()).toMatch(/(result|time|ms|executed|completed|iterations)/);
});

test('verify initial page load', async ({ page }) => {
  await page.goto('/');
  
  // Check that the page title is correct
  await expect(page).toHaveTitle(/Parser Benchmark/);
  
  // Check that the main elements exist
  await expect(page.locator('#rustBtn')).toBeVisible();
  await expect(page.locator('#jsBtn')).toBeVisible();
  await expect(page.locator('#output')).toBeVisible();
});
