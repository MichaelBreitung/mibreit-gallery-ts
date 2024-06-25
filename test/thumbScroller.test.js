import fs from 'fs';
import path from 'path';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import puppeteer from 'puppeteer';

// Globals

const thumbScrollerPageMarkup = fs.readFileSync(path.join(__dirname, 'thumbScroller.html'), { encoding: 'utf8' });
const iifeGalleryScript = fs.readFileSync(path.join(__dirname, '../lib-iife/mibreitGalleryTs.min.js'), {
  encoding: 'utf8',
});
const thumbScrollerSetupCode = `
  mibreitGalleryTs.createThumbsScroller('#thumbContainer', '#thumbContainer > img', { numberOfVisibleThumbs: 7 });
  `;

function round3Decimal(floatIn) {
  return Math.round(floatIn * 1000) / 1000;
}

let browser;
let page;

beforeAll(async () => {
  console.log('thumbscroller beforeAll');
  browser = await puppeteer.launch({ headless: true });
  page = await browser.newPage();
  await page.setContent(thumbScrollerPageMarkup);

  await page.evaluate((code) => {
    const script = document.createElement('script');
    script.textContent = code;
    document.head.appendChild(script);
  }, iifeGalleryScript);

  await page.evaluate((code) => {
    const script = document.createElement('script');
    script.textContent = code;
    document.head.appendChild(script);
  }, thumbScrollerSetupCode);

  await page.waitForNetworkIdle();
});

afterAll(async () => {
  await browser.close();
});

// Tests

describe('ThumbScroller with 8 Images Test Suite', () => {
  it('thumbContainer display set to block', async () => {
    const thumbContainer = await page.$('#thumbContainer');
    const display = await page.evaluate((el) => getComputedStyle(el).display, thumbContainer);
    expect(display).toBe('flex');
  });
});
