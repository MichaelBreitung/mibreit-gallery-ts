import fs from 'fs';
import path from 'path';
import { describe, it, expect, beforeAll } from 'vitest';
import puppeteer from 'puppeteer';
import { sleep } from '../src/tools/AsyncSleep';

// Globals

const galleryPageMarkup = fs.readFileSync(path.join(__dirname, 'gallery.webcomponent.html'), { encoding: 'utf8' });
const iifeGalleryScript = fs.readFileSync(path.join(__dirname, '../lib-iife/mibreitGalleryTs.min.js'), {
  encoding: 'utf8',
});
const slideshowWidthPx = 40 * 16;
const slideshowHeightPx = 30 * 16;
const numberOfVisibleThumbs = 4;

// Puppeteer Setup

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({ headless: true });
  page = await browser.newPage();
  await page.setContent(galleryPageMarkup);

  await page.evaluate((code) => {
    const script = document.createElement('script');
    script.textContent = code;
    document.head.appendChild(script);
  }, iifeGalleryScript);
});

afterAll(async () => {
  await browser.close();
});

// Tests

describe('Web Component Gallery Test Suite', () => {
  it('ImageStages are set up correctly', async () => {
    const imageStages = await page.$$('mbg-slideshow .mbg__img_stage');
    expect(imageStages.length).toBe(7);

    for (let i = 0; i < imageStages.length; i++) {
      const computedStyle = await page.evaluate((el) => {
        const style = getComputedStyle(el);
        return {
          opacity: style.opacity,
          width: style.width,
          height: style.height,
          top: style.top,
          left: style.left,
          overflow: style.overflow,
          position: style.position,
        };
      }, imageStages[i]);

      expect(computedStyle.width).toBe(`${slideshowWidthPx}px`);
      expect(computedStyle.height).toBe(`${slideshowHeightPx}px`);
      expect(computedStyle.top).toBe('0px');
      expect(computedStyle.left).toBe('0px');
      expect(computedStyle.overflow).toBe('hidden');
      expect(computedStyle.position).toBe('absolute');

      // At first, opacity should less than 1 because it should be animated in from 0
      expect(Number(computedStyle.opacity)).toBeLessThan(1);
    }

    // we wait for the animation to complete
    await sleep(1000);

    const computedStyle = await page.evaluate((el) => {
      const style = getComputedStyle(el);
      return { opacity: style.opacity };
    }, imageStages[0]);
    expect(computedStyle.opacity).toBe('1');

    for (let i = 1; i < imageStages.length; i++) {
      const computedStyle = await page.evaluate((el) => {
        const style = getComputedStyle(el);
        return {
          opacity: style.opacity,
        };
      }, imageStages[i]);

      expect(computedStyle.opacity).toBe('0');
    }
  });

  it('Thumb ImageStages are set up correctly', async () => {
    const thumbsViewerWidth = parseInt(
      await page.evaluate(() => {
        const thumbsViewer = document.querySelector('mbg-thumbs .mbg__thumbs_viewer');
        return getComputedStyle(thumbsViewer).width;
      })
    );
    const thumbSize = thumbsViewerWidth / numberOfVisibleThumbs / 16;

    const imageStagesStyles = await page.evaluate(() => {
      let styles = new Array();
      const imageStages = document.querySelectorAll('mbg-thumbs .mbg__img_stage');

      imageStages.forEach((imageStage) => {
        const style = getComputedStyle(imageStage);
        styles.push({
          opacity: style.opacity,
          width: imageStage.style.getPropertyValue('width'),
          height: imageStage.style.getPropertyValue('height'),
          marginLeft: imageStage.style.getPropertyValue('margin-left'),
          marginRight: imageStage.style.getPropertyValue('margin-right'),
          overflow: style.overflow,
          position: style.position,
        });
      });

      return styles;
    });

    expect(imageStagesStyles.length).toBe(7);

    imageStagesStyles.forEach((style) => {
      expect(style.width).toBe(`${thumbSize * 0.9}rem`);
      expect(style.height).toBe(`${thumbSize * 0.9}rem`);
      expect(style.marginLeft).toBe(`${thumbSize * 0.05}rem`);
      expect(style.marginRight).toBe(`${thumbSize * 0.05}rem`);
      expect(style.overflow).toBe('hidden');
      expect(style.position).toBe('relative');
      expect(Number(style.opacity)).toBe(1);
    });
  });
});
