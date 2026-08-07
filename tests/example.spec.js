import { test, expect } from '@playwright/test';

test('click Rust button and verify output', async ({ page }) => {
  // Go to the page
  await page.goto('/');
  
  // Wait for page to load
  await page.waitForSelector('#rustBtn');
  
  // Click the Rust WASM button
  await page.click('#rustBtn');
  
  // Wait for output to update
  await page.waitForSelector('#output');
  
  // Get the output text
  const output = await page.textContent('#output');
  
  // Verify that the output contains expected content
  expect(output).toContain('Rust WASM:');
  expect(output).toContain('Result:');
  expect(output).toContain('Time:');
});

test('click JS button and verify output', async ({ page }) => {
  // Go to the page
  await page.goto('/');
  
  // Wait for page to load
  await page.waitForSelector('#jsBtn');
  
  // Click the JavaScript button
  await page.click('#jsBtn');
  
  // Wait for output to update
  await page.waitForSelector('#output');
  
  // Get the output text
  const output = await page.textContent('#output');
  
  // Verify that the output contains expected content
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
