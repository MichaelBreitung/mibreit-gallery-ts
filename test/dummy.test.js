import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import puppeteer from 'puppeteer';

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  page = await browser.newPage();
});

afterAll(async () => {
  await browser.close();
});

describe('POC DOM Manipulation Test Suite', () => {
  it('should create children and apply CSS correctly', async () => {
    await page.setContent('<div id="container"></div>');

    await page.evaluate(() => {
      const container = document.getElementById('container');
      const child = document.createElement('div');
      child.textContent = 'Child Element';
      child.style.color = 'red';
      container.appendChild(child);
    });

    const child = await page.$('#container > div');
    const text = await page.evaluate((el) => el.textContent, child);
    const color = await page.evaluate((el) => getComputedStyle(el).color, child);

    expect(text).toBe('Child Element');
    expect(color).toBe('rgb(255, 0, 0)'); // CSS color 'red' in RGB
  });
});
