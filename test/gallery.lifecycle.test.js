import fs from 'fs';
import path from 'path';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import puppeteer from 'puppeteer-core';

const pageMarkup = fs.readFileSync(path.join(__dirname, 'gallery.lifecycle.html'), { encoding: 'utf8' });
const galleryScript = fs.readFileSync(path.join(__dirname, '../lib-iife/mibreitGalleryTs.min.js'), {
  encoding: 'utf8',
});

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({ channel: 'chrome', headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  page = await browser.newPage();
  await page.setContent(pageMarkup);
  await page.evaluate((code) => {
    const script = document.createElement('script');
    script.textContent = code;
    document.head.appendChild(script);
  }, galleryScript);
});

afterAll(async () => {
  await browser.close();
});

async function createGallery(index) {
  return page.evaluate((index) => {
    const gallery = document.createElement('mbg-gallery');
    gallery.innerHTML = `
      <mbg-title></mbg-title>
      <mbg-images>
        <img src="/demo/images/Detroit.jpg" title="Gallery ${index} title" width="815" height="1280" />
      </mbg-images>
    `;
    document.getElementById('galleries').appendChild(gallery);
    return window.mbgGalleryObjects.length;
  }, index);
}

describe('Web Component Gallery Lifecycle', () => {
  it('connects title elements to their own galleries', async () => {
    await createGallery(1);
    await createGallery(2);

    const titles = await page.$$eval('mbg-gallery > mbg-title', (elements) => elements.map((element) => element.textContent));
    expect(titles).toEqual(['Gallery 1 title', 'Gallery 2 title']);
  });

  it('removes disconnected galleries from the global list and can re-add the element', async () => {
    const countAfterConnect = await page.evaluate(() => window.mbgGalleryObjects.length);
    expect(countAfterConnect).toBe(2);

    await page.evaluate(() => {
      const galleries = document.querySelectorAll('mbg-gallery');
      galleries[1].remove();
    });

    await page.waitForFunction(() => window.mbgGalleryObjects.length === 1);

    const remainingTitle = await page.$eval('mbg-gallery > mbg-title', (element) => element.textContent);
    expect(remainingTitle).toBe('Gallery 1 title');

    await createGallery(3);
    await page.waitForFunction(() => window.mbgGalleryObjects.length === 2);

    const titles = await page.$$eval('mbg-gallery > mbg-title', (elements) => elements.map((element) => element.textContent));
    expect(titles).toEqual(['Gallery 1 title', 'Gallery 3 title']);
  });
});
