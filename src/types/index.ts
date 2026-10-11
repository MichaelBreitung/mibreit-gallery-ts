/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

export type TPosition = {
  x: number;
  y: number;
};

export enum EImageScaleMode {
  NONE,
  FIT_ASPECT,
  STRETCH,
  EXPAND,
}

export const SLIDESHOW_DEFAULTS = {
  interval: 5000,
  loaderWindowLeft: 0,
  loaderWindowRight: 1,
} as const;

export const THUMB_SCROLLER_DEFAULTS = {
  numberOfVisibleThumbs: 7,
  initialIndex: 0,
} as const;

export const IMAGES_WALL_DEFAULTS = {
  columns: 3,
  scrollLoaderDelay: 300,
} as const;

export function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

export function parseNumericAttribute(value: string | null, name: string, componentName: string) {
  if (value === null) {
    return undefined;
  }

  const parsedValue = Number(value);
  if (!isFiniteNumber(parsedValue)) {
    throw new Error(`${componentName} - invalid ${name} attribute: "${value}" is not a number`);
  }

  return parsedValue;
}

export type ThumbScrollerConfig = {
  numberOfVisibleThumbs?: number;
  initialIndex?: number;
};

export function checkThumbScrollerConfig(config: ThumbScrollerConfig) {
  if (
    typeof config.numberOfVisibleThumbs !== 'undefined' &&
    (!isFiniteNumber(config.numberOfVisibleThumbs) || config.numberOfVisibleThumbs < 1)
  ) {
    throw new Error('checkThumbScrollerConfig - numberOfVisibleThumbs is invalid number');
  }
  if (typeof config.initialIndex !== 'undefined' && (!isFiniteNumber(config.initialIndex) || config.initialIndex < 0)) {
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
  if (typeof config.interval !== 'undefined' && (!isFiniteNumber(config.interval) || config.interval < 1000)) {
    throw new Error('checkSlideshowConfig - config interval should be of type number and larger than 1000');
  }
  if (typeof config.zoom !== 'undefined' && typeof config.zoom !== 'boolean') {
    throw new Error('checkSlideshowConfig - config zoom should be of type boolean');
  }
  if (
    typeof config.loaderWindowRight !== 'undefined' &&
    (!isFiniteNumber(config.loaderWindowRight) || config.loaderWindowRight < 0)
  ) {
    throw new Error('checkSlideshowConfig - config loaderWindowRight should be of type number');
  }
  if (
    typeof config.loaderWindowLeft !== 'undefined' &&
    (!isFiniteNumber(config.loaderWindowLeft) || config.loaderWindowLeft < 0)
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
    (!isFiniteNumber(config.initialImageNr) || config.initialImageNr < 0)
  ) {
    throw new Error('checkGalleryConfig - invalid initialImageNr');
  }
}

export type ImagesWallConfig = {
  columns?: number;
  scrollLoaderDelay?: number;
};

export function checkImagesWallConfig(config: ImagesWallConfig) {
  if (
    typeof config.columns !== 'undefined' &&
    (!isFiniteNumber(config.columns) || config.columns < 1 || !Number.isInteger(config.columns))
  ) {
    throw new Error('checkImagesWallConfig - columns should be an integer of at least 1');
  }
  if (
    typeof config.scrollLoaderDelay !== 'undefined' &&
    (!isFiniteNumber(config.scrollLoaderDelay) || config.scrollLoaderDelay < 0)
  ) {
    throw new Error('checkImagesWallConfig - scrollLoaderDelay should be a number of at least 0');
  }
}

export type FullscreenConfig = {
  backgroundColor?: string;
  useAverageBackgroundColor?: boolean;
};

export function checkFullscreenConfig(config: FullscreenConfig) {
  const colorCheckerRegex = new RegExp('^#([A-Fa-f0-9]{8})$');
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
