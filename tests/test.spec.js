import { test, expect } from '@playwright/test';

test('Rust parser works', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Вводим число
  await page.fill('#input', '1234.56');
  
  // Жмем кнопку Rust
  await page.click('#rustBtn');
  
  // Ждем результат
  await page.waitForSelector('#output');
  
  // Проверяем что есть результат
  const output = await page.textContent('#output');
  expect(output).toContain('Result: 1234.56');
  console.log('✅ Rust parser test passed!');
});

test('JavaScript parser works', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  await page.fill('#input', '1234.56');
  await page.click('#jsBtn');
  await page.waitForSelector('#output');
  
  const output = await page.textContent('#output');
  expect(output).toContain('Result: 1234.56');
  console.log('✅ JavaScript parser test passed!');
});

test('Both parsers give same result', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  const testValues = ['1234.56', '0.0', '-123.45', '1e10'];
  
  for (const value of testValues) {
    await page.fill('#input', value);
    
    // Rust
    await page.click('#rustBtn');
    await page.waitForSelector('#output');
    const rustOutput = await page.textContent('#output');
    const rustMatch = rustOutput.match(/Result: ([^\n<]+)/);
    const rustResult = rustMatch ? parseFloat(rustMatch[1]) : null;
    
    // JS
    await page.click('#jsBtn');
    await page.waitForSelector('#output');
    const jsOutput = await page.textContent('#output');
    const jsMatch = jsOutput.match(/Result: ([^\n<]+)/);
    const jsResult = jsMatch ? parseFloat(jsMatch[1]) : null;
    
    expect(rustResult).toBe(jsResult);
    console.log(`✅ ${value} -> Rust: ${rustResult}, JS: ${jsResult}`);
  }
});

test('Benchmark runs without errors', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  await page.fill('#input', '1234.56');
  await page.click('#benchmarkBtn');
  await page.waitForSelector('#output');
  
  const output = await page.textContent('#output');
  expect(output).toContain('Benchmark');
  expect(output).toContain('Winner:');
  console.log('✅ Benchmark test passed!');
});