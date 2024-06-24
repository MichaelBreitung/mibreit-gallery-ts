import fs from 'fs';
import path from 'path';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import puppeteer from 'puppeteer';

const galleryPageMarkup = fs.readFileSync(path.join(__dirname, 'gallery.withSingleImage.html'), { encoding: 'utf8' });
const iifeGalleryScript = fs.readFileSync(path.join(__dirname, '../lib-iife/mibreitGalleryTs.min.js'), {
  encoding: 'utf8',
});
const gallerySetupCode = `
  const gallery = mibreitGalleryTs.createGallery('#slideshowContainer', '#slideshowContainer > img', {
    thumbContainerSelector: '#thumbContainer',
    thumbSelector: '#thumbContainer > img',
    numberOfVisibleThumbs: 7,
    preloaderBeforeSize: 1,
    preloaderAfterSize: 2,
  });
  `;

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  page = await browser.newPage();
});

afterAll(async () => {
  await browser.close();
});

describe('Gallery with Single Image Test Suite', () => {
  it('thumbContainer display set to none', async () => {
    await page.setContent(galleryPageMarkup);

    await page.evaluate((code) => {
      const script = document.createElement('script');
      script.textContent = code;
      document.head.appendChild(script);
    }, iifeGalleryScript);

    await page.evaluate((code) => {
      const script = document.createElement('script');
      script.textContent = code;
      document.head.appendChild(script);
    }, gallerySetupCode);

    const content = await page.content();
    console.log('->', content);
    const thumbContainer = await page.$('#thumbContainer');
    const display = await page.evaluate((el) => getComputedStyle(el).display, thumbContainer);

    expect(display).toBe('none');
  });
});
