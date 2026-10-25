/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import './index.css';

import { addCssClass, addCssStyle, getElement } from 'mibreit-dom-tools';

import {
  createGallery,
  createThumbsScroller,
  createSlideshow,
  createImagesWall,
  createFullscreenOnlyGallery,
} from './factories';
import { EImageScaleMode, parseNumericAttribute } from './types';
import IGallery from './interfaces/IGallery';
import ISlideshow from './interfaces/ISlideshow';
import IThumbsViewer from './interfaces/IThumbsViewer';
import { Gallery } from './containers';
import ImagesWall from './components/ImagesWall';

export { createFullscreenOnlyGallery, EImageScaleMode };
export type { SlideshowConfig } from './types';

// Styles
import commonStyles from './common.module.css';

declare global {
  interface Window {
    mbgGalleryObjects: Array<IGallery>;
  }
}

window.mbgGalleryObjects = new Array();

let customClassCounter = 0;

function addCustomClass(element: HTMLElement, elementName: string): string {
  const customClass = `mbg__custom-${elementName}-${customClassCounter++}`;
  element.classList.add(customClass);
  return customClass;
}

function getNumericAttribute(element: HTMLElement, attributeName: string, elementName: string): number | undefined {
  const value = parseNumericAttribute(element.getAttribute(attributeName), attributeName, elementName);
  return value ? +value : undefined;
}

function getSelector(customClass: string, childTagName: string): string {
  return `.${customClass} ${childTagName}`;
}

function hasFlagAttribute(element: HTMLElement, attributeName: string): boolean {
  return element.hasAttribute(attributeName);
}

function getScaleModeAttribute(element: HTMLElement): EImageScaleMode {
  const value = element.getAttribute('scaleMode');
  if (value === null) {
    return EImageScaleMode.FIT_ASPECT;
  }
  const scaleMode = EImageScaleMode[value as keyof typeof EImageScaleMode];
  if (typeof scaleMode !== 'string') {
    throw new Error(`mbg-gallery - invalid scaleMode attribute: "${value}" is not a valid scale mode`);
  }
  return scaleMode;
}

function showDiv(divSelector: string) {
  const div = getElement(divSelector);
  if (div) {
    addCssClass(div, commonStyles.fade);
    addCssStyle(div, 'opacity', '1');
  }
}

function releaseGallery(gallery: IGallery) {
  const fullscreen = (gallery as Gallery).getFullscreen();
  if (fullscreen?.isActive()) {
    fullscreen.deActivate();
  }
  const index = window.mbgGalleryObjects.indexOf(gallery);
  if (index !== -1) {
    window.mbgGalleryObjects.splice(index, 1);
  }
}
class MibreitGalleryElement extends HTMLElement {
  public gallery: IGallery | null = null;

  connectedCallback() {
    const customClass = addCustomClass(this, 'gallery');
    const containerSelector = getSelector(customClass, 'mbg-images');
    const thumbContainerSelector = getSelector(customClass, 'mbg-thumbs');
    const numberOfVisibleThumbs = getNumericAttribute(this, 'numberOfVisibleThumbs', 'mbg-gallery');
    const loaderWindowLeft = getNumericAttribute(this, 'loaderWindowLeft', 'mbg-gallery');
    const loaderWindowRight = getNumericAttribute(this, 'loaderWindowRight', 'mbg-gallery');
    const initialImageNr = getNumericAttribute(this, 'initialImageNr', 'mbg-gallery');
    const interval = getNumericAttribute(this, 'interval', 'mbg-gallery');
    const scaleMode = getScaleModeAttribute(this);
    const zoom = hasFlagAttribute(this, 'zoom');
    const allowUpscale = hasFlagAttribute(this, 'allowUpscale');
    this.gallery = createGallery(containerSelector, `${containerSelector} img`, {
      scaleMode,
      thumbContainerSelector,
      thumbSelector: `${thumbContainerSelector} img`,
      numberOfVisibleThumbs,
      loaderWindowLeft,
      loaderWindowRight,
      initialImageNr,
      interval,
      zoom: zoom ? true : undefined,
      allowUpscale: allowUpscale ? true : undefined,
    });

    window.mbgGalleryObjects.push(this.gallery);

    const titleElement = this.querySelector('mbg-title');
    if (titleElement) {
      const imageInfo = this.gallery.getImageViewer().getImageInfo(this.gallery.getImageViewer().getImageIndex());
      if (imageInfo) {
        titleElement.innerHTML = imageInfo.getTitle();
      }
      this.gallery.getImageViewer().addImageChangedCallback((_index, imageInfo) => {
        titleElement.innerHTML = imageInfo.getTitle();
      });
    }
    showDiv(containerSelector);
    showDiv(thumbContainerSelector);
  }

  disconnectedCallback() {
    if (this.gallery) {
      releaseGallery(this.gallery);
      this.gallery = null;
    }
  }
}

class MibreitSlideshowElement extends HTMLElement {
  public slideshow: ISlideshow | null = null;

  connectedCallback() {
    const customClass = addCustomClass(this, 'slideshow');
    const containerSelector = getSelector(customClass, 'mbg-images');
    const loaderWindowLeft = getNumericAttribute(this, 'loaderWindowLeft', 'mbg-slideshow');
    const loaderWindowRight = getNumericAttribute(this, 'loaderWindowRight', 'mbg-slideshow');
    const interval = getNumericAttribute(this, 'interval', 'mbg-slideshow');
    const initialImageNr = getNumericAttribute(this, 'initialImageNr', 'mbg-slideshow');
    const zoom = hasFlagAttribute(this, 'zoom');
    const allowUpscale = hasFlagAttribute(this, 'allowUpscale');
    const expand = hasFlagAttribute(this, 'expand');
    this.slideshow = createSlideshow(`${containerSelector} img`, {
      scaleMode: expand ? EImageScaleMode.EXPAND : EImageScaleMode.FIT_ASPECT,
      loaderWindowLeft,
      loaderWindowRight,
      interval,
      zoom: zoom ? true : undefined,
      allowUpscale: allowUpscale ? true : undefined,
    });
    if (initialImageNr !== undefined) {
      this.slideshow.getImageViewer().showImage(initialImageNr);
    }
    showDiv(containerSelector);
  }

  disconnectedCallback() {
    if (this.slideshow) {
      this.slideshow = null;
    }
  }
}

class MibreitThumbScrollerElement extends HTMLElement {
  public thumbsViewer: IThumbsViewer | null = null;

  connectedCallback() {
    const customClass = addCustomClass(this, 'thumbscroller');
    const containerSelector = getSelector(customClass, 'mbg-thumbs');
    const numberOfVisibleThumbs = getNumericAttribute(this, 'numberOfVisibleThumbs', 'mbg-thumbscroller');
    const initialIndex = getNumericAttribute(this, 'initialIndex', 'mbg-thumbscroller');
    const allowUpscale = hasFlagAttribute(this, 'allowUpscale');
    this.thumbsViewer = createThumbsScroller(containerSelector, `${containerSelector} img`, {
      numberOfVisibleThumbs,
      initialIndex,
      allowUpscale: allowUpscale ? true : undefined,
    });
    showDiv(containerSelector);
  }

  disconnectedCallback() {
    this.thumbsViewer = null;
  }
}

class MibreitImagesWallElement extends HTMLElement {
  public gallery: IGallery | null = null;
  public imagesWall: ImagesWall | null = null;

  connectedCallback() {
    const customClass = addCustomClass(this, 'imageswall');
    const containerSelector = getSelector(customClass, 'mbg-images');
    const columns = getNumericAttribute(this, 'columns', 'mbg-imageswall');
    const scrollLoaderDelay = getNumericAttribute(this, 'scrollLoaderDelay', 'mbg-imageswall');
    const allowUpscale = hasFlagAttribute(this, 'allowUpscale');

    const addBuyButton = hasFlagAttribute(this, 'addBuyButton');
    let onBuyClicked = null;
    if (addBuyButton) {
      onBuyClicked = (idx: number) => {
        this.dispatchEvent(
          new CustomEvent('buy-clicked', {
            detail: { idx },
            bubbles: true,
            composed: true,
          })
        );
      };
    }

    this.gallery = createFullscreenOnlyGallery(`${containerSelector} img`, {}, true, onBuyClicked);
    this.imagesWall = createImagesWall(
      containerSelector,
      `${containerSelector} img`,
      { columns, scrollLoaderDelay, allowUpscale },
      undefined
    );
    showDiv(containerSelector);
  }

  disconnectedCallback() {
    if (this.gallery) {
      releaseGallery(this.gallery);
      this.gallery = null;
    }
    this.imagesWall = null;
  }
}

class MibreitImagesElement extends HTMLElement {}

class MibreitThumbsElement extends HTMLElement {}

class MibreitTitleElement extends HTMLElement {}

customElements.define('mbg-gallery', MibreitGalleryElement);
customElements.define('mbg-slideshow', MibreitSlideshowElement);
customElements.define('mbg-thumbscroller', MibreitThumbScrollerElement);
customElements.define('mbg-imageswall', MibreitImagesWallElement);
customElements.define('mbg-images', MibreitImagesElement);
customElements.define('mbg-thumbs', MibreitThumbsElement);
customElements.define('mbg-title', MibreitTitleElement);
