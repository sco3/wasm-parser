import { test, expect } from '@playwright/test';

test.describe('WASM Parser Tests', () => {
  test('page loads with correct title and buttons', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    await new Promise(r => setTimeout(r, 2000)); // Wait for WASM initialization
    
    // Check page title
    await expect(page).toHaveTitle(/WASM Parser/);
    
    // Check that buttons exist
    const rustButton = page.locator('#rustBtn');
    const jsButton = page.locator('#jsBtn');
    
    await expect(rustButton).toBeVisible();
    await expect(jsButton).toBeVisible();
    
    // Check initial output
    const output = page.locator('#output');
    await expect(output).toBeVisible();
    
    // Get initial text
    const initialText = await output.textContent();
    expect(initialText).toContain('Waiting for input');
  });

  test('click Rust button and check output updates', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await new Promise(r => setTimeout(r, 2000));
    
    const output = page.locator('#output');
    const rustButton = page.locator('#rustBtn');
    
    // Click the Rust button
    await rustButton.click();
    
    // Wait for output to update
    await page.waitForFunction(
      () => {
        const output = document.getElementById('output');
        return output && !output.textContent.includes('Waiting for input');
      },
      { timeout: 10000 }
    );
    
    // Verify output contains expected content
    const outputText = await output.textContent();
    expect(outputText).toContain('Rust');
    expect(outputText).toContain('Result');
  });

  test('click JS button and check output updates', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await new Promise(r => setTimeout(r, 2000));
    
    const output = page.locator('#output');
    const jsButton = page.locator('#jsBtn');
    
    // Click the JS button
    await jsButton.click();
    
    // Wait for output to update
    await page.waitForFunction(
      () => {
        const output = document.getElementById('output');
        return output && !output.textContent.includes('Waiting for input');
      },
      { timeout: 10000 }
    );
    
    // Verify output contains expected content
    const outputText = await output.textContent();
    expect(outputText).toContain('JavaScript');
    expect(outputText).toContain('Result');
  });
});
