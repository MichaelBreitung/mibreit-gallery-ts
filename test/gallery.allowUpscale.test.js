import fs from 'fs';
import path from 'path';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import puppeteer from 'puppeteer-core';
import { sleep } from '../src/tools/AsyncSleep';

const pageMarkup = fs.readFileSync(path.join(__dirname, 'gallery.allowUpscale.html'), { encoding: 'utf8' });
const iifeGalleryScript = fs.readFileSync(path.join(__dirname, '../lib-iife/mibreitGalleryTs.min.js'), {
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
  }, iifeGalleryScript);

  await page.waitForNetworkIdle();
  await sleep(1000);
});

afterAll(async () => {
  await browser.close();
});

describe('Allow Upscale Test Suite', () => {
  it('upscales an image to fit a larger stage', async () => {
    const imageStyle = await page.evaluate(() => {
      const image = document.querySelector('.mbg__img_stage > img');
      const stage = document.querySelector('.mbg__img_stage');
      const style = getComputedStyle(image);
      return {
        stageWidth: Number.parseFloat(getComputedStyle(stage).width),
        stageHeight: Number.parseFloat(getComputedStyle(stage).height),
        maxWidth: style.maxWidth,
        maxHeight: style.maxHeight,
        width: Number.parseFloat(style.width),
        height: Number.parseFloat(style.height),
      };
    });

    expect(imageStyle.stageWidth).toBe(1920);
    expect(imageStyle.stageHeight).toBe(1080);
    expect(imageStyle.maxWidth).toBe('none');
    expect(imageStyle.maxHeight).toBe('none');
    expect(imageStyle.height).toBeCloseTo(1080, 0);
    expect(imageStyle.width).toBeGreaterThan(1280);
  });
});
