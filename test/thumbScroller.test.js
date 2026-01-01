import fs from 'fs';
import path from 'path';
import { describe, it, expect, beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import puppeteer from 'puppeteer';
import { sleep } from '../src/tools/AsyncSleep';

// Globals

const thumbScrollerPageMarkup = fs.readFileSync(path.join(__dirname, 'thumbScroller.html'), { encoding: 'utf8' });
const iifeGalleryScript = fs.readFileSync(path.join(__dirname, '../lib-iife/mibreitGalleryTs.min.js'), {
  encoding: 'utf8',
});
const expectedNumberOfThumbs = 7;

function round3Decimal(floatIn) {
  return Math.round(floatIn * 1000) / 1000;
}

let browser;
let page;

beforeAll(async () => {
  console.log('thumbscroller beforeAll');
  browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
});

beforeEach(async () => {
  page = await browser.newPage();
  await page.setContent(thumbScrollerPageMarkup);

  await page.evaluate((code) => {
    const script = document.createElement('script');
    script.textContent = code;
    document.head.appendChild(script);
  }, iifeGalleryScript);

  await page.waitForNetworkIdle();
});

afterEach(async () => {
  await page.close();
});

afterAll(async () => {
  await browser.close();
});

// Tests

describe('ThumbScroller with 7 Images Test Suite', () => {
  it('ThumbContainer display set to block', async () => {
    await page.evaluate(() => {
      mibreitGalleryTs.createThumbsScroller('#thumbContainer', '#thumbContainer > img', { numberOfVisibleThumbs: 6 });
    });

    const thumbContainer = await page.$('#thumbContainer');
    const display = await page.evaluate((el) => getComputedStyle(el).display, thumbContainer);
    expect(display).toBe('flex');
  });

  it('ThumbScroller Buttons set up correctly if number visible thumbs smaller number thumbs', async () => {
    await page.evaluate(() => {
      mibreitGalleryTs.createThumbsScroller('#thumbContainer', '#thumbContainer > img', { numberOfVisibleThumbs: 6 });
    });

    const previousButton = await page.$('.mbg__thumbs_scroller__previous_btn');
    const nextButton = await page.$('.mbg__thumbs_scroller__next_btn');

    expect(previousButton).toBeDefined();
    expect(nextButton).toBeDefined();
  });

  it('ThumbScroller Buttons omitted if number visible thumbs equals number thumbs', async () => {
    await page.evaluate(() => {
      mibreitGalleryTs.createThumbsScroller('#thumbContainer', '#thumbContainer > img', { numberOfVisibleThumbs: 7 });
    });

    const previousButton = await page.$('.mbg__thumbs_scroller__previous_btn');
    const nextButton = await page.$('.mbg__thumbs_scroller__next_btn');

    expect(previousButton).toBeNull();
    expect(nextButton).toBeNull();
  });

  it('ThumbStages are set up and resized correctly', async () => {
    await page.evaluate(() => {
      mibreitGalleryTs.createThumbsScroller('#thumbContainer', '#thumbContainer > img', { numberOfVisibleThumbs: 6 });
    });

    const thumbsViewer = await page.$('.mbg__thumbs_viewer');
    const container = await page.$('#container');
    const thumbStages = await page.$$('.mbg__img_stage');

    expect(thumbStages.length).toBe(expectedNumberOfThumbs);

    let thumbsViewerStyle = await page.evaluate((el) => {
      const style = getComputedStyle(el);
      return {
        width: style.width,
      };
    }, thumbsViewer);

    let firstThumbStageStyle = await page.evaluate((el) => {
      const style = getComputedStyle(el);
      return {
        width: style.width,
        height: style.height,
      };
    }, thumbStages[0]);

    // The width of the thumb is 90% of the available width because of margin.
    expect(firstThumbStageStyle.width).toBe(`${(parseInt(thumbsViewerStyle.width) * 9) / 60}px`);
    expect(firstThumbStageStyle.width).toBe(firstThumbStageStyle.height);

    await page.evaluate((el) => {
      el.style.width = '30.5rem';
    }, container);

    // ensures that the dom changes have been applied
    await sleep(250);

    thumbsViewerStyle = await page.evaluate((el) => {
      const style = getComputedStyle(el);
      return {
        width: style.width,
      };
    }, thumbsViewer);

    firstThumbStageStyle = await page.evaluate((el) => {
      const style = getComputedStyle(el);
      return {
        width: style.width,
      };
    }, thumbStages[0]);

    expect(firstThumbStageStyle.width).toBe(`${(parseInt(thumbsViewerStyle.width) * 9) / 60}px`);
  });

  it('ThumbStages are set up correctly when visible thumbs equals number of thumbs', async () => {
    const newContainerWidth = 43.75;
    const container = await page.$('#container');
    await page.evaluate(
      (container, newContainerWidth) => {
        container.style.width = `${newContainerWidth}rem`; // gives us even numbers for the calculated widhts and heights
      },
      container,
      newContainerWidth
    );

    await page.evaluate(() => {
      mibreitGalleryTs.createThumbsScroller('#thumbContainer', '#thumbContainer > img', { numberOfVisibleThumbs: 7 });
    });

    const thumbsViewer = await page.$('.mbg__thumbs_viewer');
    const thumbStages = await page.$$('.mbg__img_stage');

    expect(thumbStages.length).toBe(expectedNumberOfThumbs);

    let thumbsViewerStyle = await page.evaluate((el) => {
      const style = getComputedStyle(el);
      return {
        width: style.width,
      };
    }, thumbsViewer);

    let firstThumbStageStyle = await page.evaluate((el) => {
      const style = getComputedStyle(el);
      return {
        width: style.width,
        height: style.height,
      };
    }, thumbStages[0]);

    expect(thumbsViewerStyle.width).toBe(`${newContainerWidth * 16}px`);
    expect(firstThumbStageStyle.width).toBe(firstThumbStageStyle.height);
    expect(firstThumbStageStyle.width).toBe(`${(newContainerWidth * 16 * 9) / 70}px`);
  });
});
