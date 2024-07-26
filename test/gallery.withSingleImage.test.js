import fs from 'fs';
import path from 'path';
import { describe, it, expect, beforeAll } from 'vitest';
import puppeteer from 'puppeteer';
import { sleep } from '../src/tools/AsyncSleep';

// Globals

const galleryPageMarkup = fs.readFileSync(path.join(__dirname, 'gallery.withSingleImage.html'), { encoding: 'utf8' });
const iifeGalleryScript = fs.readFileSync(path.join(__dirname, '../lib-iife/mibreitGalleryTs.min.js'), {
  encoding: 'utf8',
});
const gallerySetupCode = `
  const gallery = mibreitGalleryTs.createGallery('#slideshowContainer', '#slideshowContainer > img', {
    thumbContainerSelector: '#thumbContainer',
    thumbSelector: '#thumbContainer > img',
    numberOfVisibleThumbs: 7,
    loaderWindowLeft: 1,
    loaderWindowRight: 2,
  });
  `;
const containerWidthPx = 40 * 16;
const containerHeightPx = 30 * 16;
const testTile = 'Test Title';
const imageWidth = 1200;
const imageHeight = 600;

// helpers

function round3Decimal(floatIn) {
  return Math.round(floatIn * 1000) / 1000;
}

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

  await page.evaluate((code) => {
    const script = document.createElement('script');
    script.textContent = code;
    document.head.appendChild(script);
  }, gallerySetupCode);
});

afterAll(async () => {
  await browser.close();
});

// Tests

describe('Gallery with Single Image Test Suite', () => {
  it('ThumbContainer display set to none', async () => {
    const thumbContainer = await page.$('#thumbContainer');
    const display = await page.evaluate((el) => getComputedStyle(el).display, thumbContainer);
    expect(display).toBe('none');
  });

  it('No Previous Next Buttons', async () => {
    const previousBtn = await page.$('.mbg__gallery__previous_btn');
    const nextBtn = await page.$('.mbg__gallery__next_btn');

    expect(previousBtn).toBeNull();
    expect(nextBtn).toBeNull();
  });

  it('ImageStage is set up correctly', async () => {
    const imageStages = await page.$$('.mbg__img_stage');
    expect(imageStages.length).toBe(1);

    let computedStyle = await page.evaluate((el) => {
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
    }, imageStages[0]);

    expect(computedStyle.width).toBe(`${containerWidthPx}px`);
    expect(computedStyle.height).toBe(`${containerHeightPx}px`);
    expect(computedStyle.top).toBe('0px');
    expect(computedStyle.left).toBe('0px');
    expect(computedStyle.overflow).toBe('hidden');
    expect(computedStyle.position).toBe('absolute');

    // At first, opacity should less than 1 because it should be animated in from 0
    expect(Number(computedStyle.opacity)).toBeLessThan(1);

    // we wait for the animation to complete
    await sleep(1000);

    computedStyle = await page.evaluate((el) => {
      const style = getComputedStyle(el);
      return { opacity: style.opacity };
    }, imageStages[0]);
    expect(computedStyle.opacity).toBe('1');
  });

  it('Image is set up correctly', async () => {
    const images = await page.$$('.mbg__img_stage > img');
    expect(images.length).toBe(1);

    let imageProps = await page.evaluate((el) => {
      const style = getComputedStyle(el);
      return {
        width: el.getAttribute('width'),
        height: el.getAttribute('height'),
        computedStyle: {
          width: style.width,
          height: style.height,
          maxWidth: style.maxWidth,
          maxHeight: style.maxHeight,
          marginLeft: style.marginLeft,
          marginTop: style.marginTop,
        },
      };
    }, images[0]);

    const imageAspectRatio = imageProps.width / imageProps.height;

    expect(imageProps.computedStyle.width).toBe(`${containerWidthPx}px`);
    expect(imageProps.computedStyle.height).toBe(`${round3Decimal(containerWidthPx / imageAspectRatio)}px`);
    expect(imageProps.computedStyle.marginLeft).toBe('0px');
    expect(imageProps.computedStyle.marginTop).toBe(
      `${round3Decimal((containerHeightPx - containerWidthPx / imageAspectRatio) / 2)}px`
    );
    expect(imageProps.computedStyle.maxWidth).toBe(`${imageProps.width}px`);
    expect(imageProps.computedStyle.maxHeight).toBe(`${imageProps.height}px`);
  });

  it('ImageInfo is Correct', async () => {
    const imageInfo = await page.evaluate(() => {
      const viewer = gallery.getImageViewer();
      const imageInfo = viewer.getImageInfo(viewer.getImageIndex());
      return {
        title: imageInfo.getTitle(),
        width: imageInfo.getWidth(),
        height: imageInfo.getHeight(),
      };
    });

    expect(imageInfo.title).toBe(testTile);
    expect(imageInfo.width).toBe(imageWidth);
    expect(imageInfo.height).toBe(imageHeight);
  });
});
