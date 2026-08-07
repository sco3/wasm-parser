import { test, expect } from '@playwright/test';

test('click Rust button and verify output changes', async ({ page }) => {
  // Go to the page
  await page.goto('/');
  
  // Wait for page to load and elements to be ready
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
      return output && output.textContent.trim() !== initial.trim();
    },
    { initial: initialText },
    { timeout: 15000 }
  );
  
  // Get the output text
  const output = await page.textContent('#output');
  
  // Verify that the output has changed and contains expected content
  expect(output).toBeTruthy();
  expect(output).toContain('Rust WASM:');
  expect(output).toContain('Result:');
  expect(output).toContain('Time:');
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
      return output && output.textContent.trim() !== initial.trim();
    },
    { initial: initialText },
    { timeout: 15000 }
  );
  
  // Get the output text
  const output = await page.textContent('#output');
  
  // Verify that the output has changed and contains expected content
  expect(output).toBeTruthy();
  expect(output).toContain('JavaScript:');
  expect(output).toContain('Result:');
  expect(output).toContain('Time:');
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
