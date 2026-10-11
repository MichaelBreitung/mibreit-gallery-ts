import fs from 'fs';
import path from 'path';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import puppeteer from 'puppeteer-core';
import { sleep } from '../src/tools/AsyncSleep';

const pageMarkup = fs.readFileSync(path.join(__dirname, 'fullscreenOnly.scaleMode.html'), { encoding: 'utf8' });
const iifeGalleryScript = fs.readFileSync(path.join(__dirname, '../lib-iife/mibreitGalleryTs.min.js'), {
  encoding: 'utf8',
});

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({ channel: 'chrome', headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.setContent(pageMarkup);

  await page.evaluate((code) => {
    const script = document.createElement('script');
    script.textContent = code;
    document.head.appendChild(script);
  }, iifeGalleryScript);

  await page.evaluate(() => {
    mibreitGalleryTs.createFullscreenOnlyGallery('#none > img', {
      scaleMode: mibreitGalleryTs.EImageScaleMode.NONE,
    });
    mibreitGalleryTs.createFullscreenOnlyGallery('#fitAspect > img', {
      scaleMode: mibreitGalleryTs.EImageScaleMode.FIT_ASPECT,
    });
    mibreitGalleryTs.createFullscreenOnlyGallery('#stretch > img', {
      scaleMode: mibreitGalleryTs.EImageScaleMode.STRETCH,
    });
    mibreitGalleryTs.createFullscreenOnlyGallery('#expand > img', {
      scaleMode: mibreitGalleryTs.EImageScaleMode.EXPAND,
    });
  });

  await sleep(250);
});

afterAll(async () => {
  await browser.close();
});

async function getImageStyle(alt) {
  return page.evaluate((alt) => {
    const image = [...document.querySelectorAll('body > div > .mbg__img_stage > img')].find((image) =>
      image.getAttribute('alt').includes(alt)
    );
    const style = getComputedStyle(image);
    return { width: style.width, height: style.height };
  }, alt);
}

describe('Fullscreen Only Gallery Scale Mode Test Suite', () => {
  it('Global exposes only the fullscreen-only factory and scale mode', async () => {
    const globalKeys = await page.evaluate(() => Object.keys(mibreitGalleryTs).sort());
    expect(globalKeys).toEqual(['EImageScaleMode', 'createFullscreenOnlyGallery']);
  });

  it('NONE keeps the image size', async () => {
    const style = await getImageStyle('Detroit');
    expect(style.width).toBe('815px');
    expect(style.height).toBe('1280px');
  });

  it('FIT_ASPECT fits the image by height', async () => {
    const style = await getImageStyle('Essaouira Surf');
    expect(style.width).toBe('100%');
    expect(style.height).toBe('auto');
  });

  it('STRETCH fills the viewport', async () => {
    const style = await getImageStyle('Bastion');
    expect(style.width).toBe('100%');
    expect(style.height).toBe('100%');
  });

  it('EXPAND covers the viewport by height', async () => {
    const style = await getImageStyle('Salt');
    expect(style.width).toBe('auto');
    expect(style.height).toBe('100%');
  });
});
