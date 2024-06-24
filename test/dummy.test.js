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
  it('Creates children and applies CSS correctly', async () => {
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

  it('Creates children and applies size correctly', async () => {
    await page.setContent('<div id="container"></div>');

    await page.evaluate(() => {
      const container = document.getElementById('container');
      container.style.width = '10rem';
      const child = document.createElement('div');
      child.style.width = '100%';
      container.appendChild(child);
    });

    const child = await page.$('#container > div');
    const width = await page.evaluate((el) => getComputedStyle(el).width, child);

    expect(width).toBe('160px');
  });
});
