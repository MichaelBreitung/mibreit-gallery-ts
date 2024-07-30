/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

export enum EImageScaleMode {
  NONE,
  FIT_ASPECT,
  STRETCH,
  EXPAND,
}

export type ThumbScrollerConfig = {
  numberOfVisibleThumbs?: number;
  initialIndex?: number;
};

export function checkThumbScrollerConfig(config: ThumbScrollerConfig) {
  if (
    typeof config.numberOfVisibleThumbs !== 'undefined' &&
    (typeof config.numberOfVisibleThumbs !== 'number' || config.numberOfVisibleThumbs < 1)
  ) {
    throw new Error('checkThumbScrollerConfig - numberOfVisibleThumbs is invalid number');
  }
  if (
    typeof config.initialIndex !== 'undefined' &&
    (typeof config.initialIndex !== 'number' || config.initialIndex < 0)
  ) {
    throw new Error('checkThumbScrollerConfig - config initialIndex should be of type number');
  }
}

export type SlideshowConfig = {
  scaleMode?: EImageScaleMode;
  interval?: number;
  zoom?: boolean;
  loaderWindowLeft?: number;
  loaderWindowRight?: number;
};

export function checkSlideshowConfig(config: SlideshowConfig) {
  if (
    typeof config.scaleMode !== 'undefined' &&
    (typeof config.scaleMode !== 'number' || config.scaleMode < 0 || config.scaleMode > 3)
  ) {
    throw new Error('checkSlideshowConfig - config scaleMode should be of type EImageScaleMode (number 0 - 3)');
  }
  if (typeof config.interval !== 'undefined' && (typeof config.interval !== 'number' || config.interval < 1000)) {
    throw new Error('checkSlideshowConfig - config interval should be of type number and larger than 1000');
  }
  if (typeof config.zoom !== 'undefined' && typeof config.zoom !== 'boolean') {
    throw new Error('checkSlideshowConfig - config zoom should be of type boolean');
  }
  if (
    typeof config.loaderWindowRight !== 'undefined' &&
    (typeof config.loaderWindowRight !== 'number' || config.loaderWindowRight < 0)
  ) {
    throw new Error('checkSlideshowConfig - config loaderWindowRight should be of type number');
  }
  if (
    typeof config.loaderWindowLeft !== 'undefined' &&
    (typeof config.loaderWindowLeft !== 'number' || config.loaderWindowLeft < 0)
  ) {
    throw new Error('checkSlideshowConfig - config loaderWindowLeft should be of type number');
  }
}

export type GalleryConfig = SlideshowConfig &
  ThumbScrollerConfig & {
    thumbContainerSelector?: string;
    thumbSelector?: string;
    initialImageNr?: number;
  };

export function checkGalleryConfig(config: GalleryConfig) {
  checkSlideshowConfig(config);

  checkThumbScrollerConfig(config);

  if (typeof config.thumbContainerSelector !== 'undefined' && typeof config.thumbContainerSelector !== 'string') {
    throw new Error('checkGalleryConfig - invalid thumbContainerSelector');
  }
  if (typeof config.thumbSelector !== 'undefined' && typeof config.thumbSelector !== 'string') {
    throw new Error('checkGalleryConfig - invalid thumbSelector');
  }
  if (
    typeof config.initialImageNr !== 'undefined' &&
    (typeof config.initialImageNr !== 'number' || config.initialImageNr < 0)
  ) {
    throw new Error('checkGalleryConfig - invalid initialImageNr');
  }
}

export type FullscreenConfig = {
  backgroundColor?: string;
  useAverageBackgroundColor?: boolean;
};

const colorCheckerRegex = new RegExp('^#([A-Fa-f0-9]{8})$');

export function checkFullscreenConfig(config: FullscreenConfig) {
  if (typeof config.backgroundColor !== 'undefined' && typeof config.backgroundColor !== 'string') {
    throw new Error('checkFullscreenConfig - invalid backgroundColor');
  }
  if (typeof config.backgroundColor === 'string') {
    if (!colorCheckerRegex.test(config.backgroundColor)) {
      throw new Error('checkFullscreenConfig - invalid backgroundColor - only RGBA hex allowed');
    }
  }
  if (
    typeof config.useAverageBackgroundColor !== 'undefined' &&
    typeof config.useAverageBackgroundColor !== 'boolean'
  ) {
    throw new Error('checkFullscreenConfig - invalid useAverageBackgroundColor');
  }
}
