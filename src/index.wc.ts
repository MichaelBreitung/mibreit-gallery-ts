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

export * from './index';

// Styles
import animationStyles from './tools/animations.module.css';

declare global {
  interface Window {
    mbgGalleryObjects: Array<IGallery>;
  }
}

window.mbgGalleryObjects = new Array();

function showDiv(divSelector: string) {
  const div = getElement(divSelector);
  if (div) {
    addCssClass(div, animationStyles.fade);
    addCssStyle(div, 'opacity', '1');
  }
}
class MibreitGalleryElement extends HTMLElement {
  static classCounter = 0;
  public gallery: IGallery | null = null;

  connectedCallback() {
    const customClass = `mbg__custom-gallery-${MibreitGalleryElement.classCounter++}`;
    this.classList.add(customClass);
    const numberOfVisibleThumbs = parseNumericAttribute(this.getAttribute('numberOfVisibleThumbs'), 'numberOfVisibleThumbs', 'mbg-gallery');
    const loaderWindowLeft = parseNumericAttribute(this.getAttribute('loaderWindowLeft'), 'loaderWindowLeft', 'mbg-gallery');
    const loaderWindowRight = parseNumericAttribute(this.getAttribute('loaderWindowRight'), 'loaderWindowRight', 'mbg-gallery');
    const initialImageNr = parseNumericAttribute(this.getAttribute('initialImageNr'), 'initialImageNr', 'mbg-gallery');
    const interval = parseNumericAttribute(this.getAttribute('interval'), 'interval', 'mbg-gallery');
    const zoom = this.hasAttribute('zoom');
    const containerSelector = `.${customClass} mbg-images`;
    const thumbContainerSelector = `.${customClass} mbg-thumbs`;
    this.gallery = createGallery(containerSelector, `${containerSelector} img`, {
      scaleMode: EImageScaleMode.FIT_ASPECT,
      thumbContainerSelector,
      thumbSelector: `${thumbContainerSelector} img`,
      numberOfVisibleThumbs: numberOfVisibleThumbs ? +numberOfVisibleThumbs : undefined,
      loaderWindowLeft: loaderWindowLeft ? +loaderWindowLeft : undefined,
      loaderWindowRight: loaderWindowRight ? +loaderWindowRight : undefined,
      initialImageNr: initialImageNr ? +initialImageNr : undefined,
      interval: interval ? +interval : undefined,
      zoom: zoom ? true : undefined,
    });

    window.mbgGalleryObjects.push(this.gallery);

    const titleElement = document.querySelector('mbg-title');
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
}

class MibreitSlideshowElement extends HTMLElement {
  static classCounter = 0;
  connectedCallback() {
    const customClass = `mbg__custom-slideshow-${MibreitSlideshowElement.classCounter++}`;
    this.classList.add(customClass);
    const loaderWindowLeft = parseNumericAttribute(this.getAttribute('loaderWindowLeft'), 'loaderWindowLeft', 'mbg-slideshow');
    const loaderWindowRight = parseNumericAttribute(this.getAttribute('loaderWindowRight'), 'loaderWindowRight', 'mbg-slideshow');
    const interval = parseNumericAttribute(this.getAttribute('interval'), 'interval', 'mbg-slideshow');
    const zoom = this.hasAttribute('zoom');
    const expand = this.hasAttribute('expand');
    const containerSelector = `.${customClass} mbg-images`;
    createSlideshow(`${containerSelector} img`, {
      scaleMode: expand ? EImageScaleMode.EXPAND : EImageScaleMode.FIT_ASPECT,
      loaderWindowLeft: loaderWindowLeft ? +loaderWindowLeft : undefined,
      loaderWindowRight: loaderWindowRight ? +loaderWindowRight : undefined,
      interval,
      zoom: zoom ? true : undefined,
    });
    showDiv(containerSelector);
  }
}

class MibreitThumbScrollerElement extends HTMLElement {
  static classCounter = 0;
  connectedCallback() {
    const customClass = `mbg__custom-thumbscroller-${MibreitThumbScrollerElement.classCounter++}`;
    this.classList.add(customClass);
    const numberOfVisibleThumbs = parseNumericAttribute(this.getAttribute('numberOfVisibleThumbs'), 'numberOfVisibleThumbs', 'mbg-thumbscroller');
    const initialIndex = parseNumericAttribute(this.getAttribute('initialIndex'), 'initialIndex', 'mbg-thumbscroller');
    const containerSelector = `.${customClass} mbg-thumbs`;
    createThumbsScroller(containerSelector, `${containerSelector} img`, {
      numberOfVisibleThumbs: numberOfVisibleThumbs ? +numberOfVisibleThumbs : undefined,
      initialIndex: initialIndex ? +initialIndex : undefined,
    });
    showDiv(containerSelector);
  }
}

class MibreitImagesWallElement extends HTMLElement {
  static classCounter = 0;
  public gallery: IGallery | null = null;

  connectedCallback() {
    const customClass = `mbg__custom-imageswall-${MibreitImagesWallElement.classCounter++}`;
    this.classList.add(customClass);
    const columns = parseNumericAttribute(this.getAttribute('columns'), 'columns', 'mbg-imageswall');
    const containerSelector = `.${customClass} mbg-images`;
    const scrollLoaderDelay = parseNumericAttribute(this.getAttribute('scrollLoaderDelay'), 'scrollLoaderDelay', 'mbg-imageswall');

    const addBuyButton = this.hasAttribute('addBuyButton');
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
    createImagesWall(
      containerSelector,
      `${containerSelector} img`,
      columns ? +columns : undefined,
      undefined,
      scrollLoaderDelay ? +scrollLoaderDelay : undefined
    );
    showDiv(containerSelector);
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
