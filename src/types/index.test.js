import { describe, expect, it } from 'vitest';
import { checkThumbScrollerConfig, checkSlideshowConfig, checkGalleryConfig, checkFullscreenConfig } from './index';

describe('Config Test Test Suite', () => {
  it('checkThumbScrollerConfig fails for invalid numberOfVisibleThumbs input', async () => {
    expect(() => checkThumbScrollerConfig({ numberOfVisibleThumbs: '10' })).toThrowError();
  });

  it('checkThumbScrollerConfig fails for negative numberOfVisibleThumbs', async () => {
    expect(() => checkThumbScrollerConfig({ numberOfVisibleThumbs: -1 })).toThrowError();
  });

  it('checkThumbScrollerConfig fails for invalid initialIndex input', async () => {
    expect(() => checkThumbScrollerConfig({ initialIndex: '10' })).toThrowError();
  });

  it('checkThumbScrollerConfig fails for negative initialIndex', async () => {
    expect(() => checkThumbScrollerConfig({ initialIndex: -1 })).toThrowError();
  });

  it('checkThumbScrollerConfig succeeds for valid config', async () => {
    expect(() => checkThumbScrollerConfig({ initialIndex: 1, numberOfVisibleThumbs: 1 })).not.toThrowError();
  });

  it('checkSlideshowConfig fails for invalid scaleMode', async () => {
    expect(() => checkSlideshowConfig({ scaleMode: 'invalid' })).toThrowError();

    expect(() => checkSlideshowConfig({ scaleMode: -1 })).toThrowError();

    expect(() => checkSlideshowConfig({ scaleMode: 4 })).toThrowError();
  });

  it('checkSlideshowConfig succeeds for valid scaleMode', async () => {
    expect(() => checkSlideshowConfig({ scaleMode: 0 })).not.toThrowError();

    expect(() => checkSlideshowConfig({ scaleMode: 1 })).not.toThrowError();
    expect(() => checkSlideshowConfig({ scaleMode: 2 })).not.toThrowError();

    expect(() => checkSlideshowConfig({ scaleMode: 3 })).not.toThrowError();
  });

  it('checkSlideshowConfig fails for invalid interval', async () => {
    expect(() => checkSlideshowConfig({ interval: 'invalid' })).toThrowError();

    expect(() => checkSlideshowConfig({ interval: 999 })).toThrowError();
  });

  it('checkSlideshowConfig succeeds for valid interval', async () => {
    expect(() => checkSlideshowConfig({ interval: 1000 })).not.toThrowError();
  });

  it('checkSlideshowConfig fails for invalid zoom', async () => {
    expect(() => checkSlideshowConfig({ zoom: 'invalid' })).toThrowError();

    expect(() => checkSlideshowConfig({ zoom: 1 })).toThrowError();
  });

  it('checkSlideshowConfig succeeds for valid zoom', async () => {
    expect(() => checkSlideshowConfig({ zoom: true })).not.toThrowError();
  });

  it('checkSlideshowConfig fails for invalid loaderWindowRight', async () => {
    expect(() => checkSlideshowConfig({ loaderWindowRight: 'invalid' })).toThrowError();

    expect(() => checkSlideshowConfig({ loaderWindowRight: -1 })).toThrowError();
  });

  it('checkSlideshowConfig succeeds for valid loaderWindowRight', async () => {
    expect(() => checkSlideshowConfig({ loaderWindowRight: 0 })).not.toThrowError();
  });

  it('checkSlideshowConfig fails for invalid loaderWindowLeft', async () => {
    expect(() => checkSlideshowConfig({ loaderWindowLeft: 'invalid' })).toThrowError();

    expect(() => checkSlideshowConfig({ loaderWindowLeft: -1 })).toThrowError();
  });

  it('checkSlideshowConfig succeeds for valid loaderWindowLeft', async () => {
    expect(() => checkSlideshowConfig({ loaderWindowLeft: 0 })).not.toThrowError();
  });

  it('checkGalleryConfig fails for invalid thumbContainerSelector', async () => {
    expect(() => checkGalleryConfig({ thumbContainerSelector: true })).toThrowError();

    expect(() => checkGalleryConfig({ thumbContainerSelector: 1 })).toThrowError();
  });

  it('checkGalleryConfig succeeds for valid thumbContainerSelector', async () => {
    expect(() => checkGalleryConfig({ thumbContainerSelector: 'test' })).not.toThrowError();
  });

  it('checkGalleryConfig fails for invalid initialImageNr', async () => {
    expect(() => checkGalleryConfig({ initialImageNr: '1' })).toThrowError();

    expect(() => checkGalleryConfig({ initialImageNr: -1 })).toThrowError();
  });

  it('checkGalleryConfig succeeds for valid initialImageNr', async () => {
    expect(() => checkGalleryConfig({ initialImageNr: 0 })).not.toThrowError();
  });

  it('checkGalleryConfig fails for invalid thumbSelector', async () => {
    expect(() => checkGalleryConfig({ thumbSelector: true })).toThrowError();

    expect(() => checkGalleryConfig({ thumbSelector: 1 })).toThrowError();
  });

  it('checkGalleryConfig succeeds for valid thumbSelector', async () => {
    expect(() => checkGalleryConfig({ thumbSelector: 'test' })).not.toThrowError();
  });

  it('checkFullscreenConfig fails for invalid thumbSelector', async () => {
    expect(() => checkFullscreenConfig({ backgroundColor: 'invalid color' })).toThrowError();

    expect(() => checkFullscreenConfig({ useAverageBackgroundColor: 'yes' })).toThrowError();
  });

  it('checkFullscreenConfig succeeds for valid thumbSelector', async () => {
    expect(() =>
      checkFullscreenConfig({ backgroundColor: '#fffff0ff', useAverageBackgroundColor: true })
    ).not.toThrowError();
  });
});
