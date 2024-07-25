/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import './index.css';

// Styles
import animationStyles from './tools/animations.module.css';

import {
  createGallery,
  createThumbsScroller,
  createFullscreenOnlyGallery,
  createSlideshow,
  EImageScaleMode,
} from './index';
import { addCssClass, addCssStyle, getElement } from 'mibreit-dom-tools';

export { createGallery, createFullscreenOnlyGallery, createThumbsScroller, createSlideshow, EImageScaleMode };

function showDiv(divSelector: string) {
  const div = getElement(divSelector);
  if (div) {
    addCssClass(div, animationStyles.fade);
    addCssStyle(div, 'opacity', '1');
  }
}

class MibreitGalleryElement extends HTMLElement {
  static classCounter = 0;
  connectedCallback() {
    const customClass = `mbg__custom-gallery-${MibreitGalleryElement.classCounter++}`;
    this.classList.add(customClass);
    const numberOfVisibleThumbs = this.getAttribute('numberOfVisibleThumbs');
    const preloaderBeforeSize = this.getAttribute('preloaderBeforeSize');
    const preloaderAfterSize = this.getAttribute('preloaderAfterSize');
    const interval = this.getAttribute('interval');
    const zoom = this.hasAttribute('zoom');
    const containerSelector = `.${customClass} mbg-images`;
    const thumbContainerSelector = `.${customClass} mbg-thumbs`;
    const gallery = createGallery(containerSelector, `${containerSelector} img`, {
      scaleMode: EImageScaleMode.FIT_ASPECT,
      thumbContainerSelector,
      thumbSelector: `${thumbContainerSelector} img`,
      numberOfVisibleThumbs: numberOfVisibleThumbs ? +numberOfVisibleThumbs : undefined,
      preloaderBeforeSize: preloaderBeforeSize ? +preloaderBeforeSize : undefined,
      preloaderAfterSize: preloaderAfterSize ? +preloaderAfterSize : undefined,
      interval: interval ? +interval : undefined,
      zoom: zoom ? true : undefined,
    });

    const titleElement = document.querySelector('mbg-title');
    if (titleElement) {
      const imageInfo = gallery.getImageViewer().getImageInfo(gallery.getImageViewer().getImageIndex());
      if (imageInfo) {
        titleElement.innerHTML = imageInfo.getTitle();
      }
      gallery.getImageViewer().addImageChangedCallback((_index, imageInfo) => {
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
    const customClass = `mbg__custom-slideshow-${MibreitGalleryElement.classCounter++}`;
    this.classList.add(customClass);
    const preloaderBeforeSize = this.getAttribute('preloaderBeforeSize');
    const preloaderAfterSize = this.getAttribute('preloaderAfterSize');
    const interval = this.getAttribute('interval');
    const zoom = this.hasAttribute('zoom');
    const containerSelector = `.${customClass} mbg-images`;
    createSlideshow(`${containerSelector} img`, {
      scaleMode: EImageScaleMode.FIT_ASPECT,
      preloaderBeforeSize: preloaderBeforeSize ? +preloaderBeforeSize : undefined,
      preloaderAfterSize: preloaderAfterSize ? +preloaderAfterSize : undefined,
      interval: interval ? +interval : 4000,
      zoom: zoom ? true : undefined,
    });

    showDiv(containerSelector);
  }
}

class MibreitThumbScrollerElement extends HTMLElement {
  static classCounter = 0;
  connectedCallback() {
    const customClass = `mbg__custom-thumbscroller-${MibreitGalleryElement.classCounter++}`;
    this.classList.add(customClass);
    const numberOfVisibleThumbs = this.getAttribute('numberOfVisibleThumbs');
    const initialIndex = this.getAttribute('initialIndex');
    const containerSelector = `.${customClass} mbg-thumbs`;
    createThumbsScroller(containerSelector, `${containerSelector} img`, {
      numberOfVisibleThumbs: numberOfVisibleThumbs ? +numberOfVisibleThumbs : undefined,
      initialIndex: initialIndex ? +initialIndex : undefined,
    });

    showDiv(containerSelector);
  }
}

class MibreitImagesElement extends HTMLElement {}

class MibreitThumbsElement extends HTMLElement {}

class MibreitTitleElement extends HTMLElement {}

customElements.define('mbg-gallery', MibreitGalleryElement);
customElements.define('mbg-slideshow', MibreitSlideshowElement);
customElements.define('mbg-thumbscroller', MibreitThumbScrollerElement);
customElements.define('mbg-images', MibreitImagesElement);
customElements.define('mbg-thumbs', MibreitThumbsElement);
customElements.define('mbg-title', MibreitTitleElement);
