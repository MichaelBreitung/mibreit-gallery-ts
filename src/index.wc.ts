/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import './index.css';

import {
  createGallery,
  createThumbsScroller,
  createFullscreenOnlyGallery,
  createSlideshow,
  EImageScaleMode,
} from './index';

export { createGallery, createFullscreenOnlyGallery, createThumbsScroller, createSlideshow, EImageScaleMode };

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
    const gallery = createGallery(`.${customClass} mbg-images`, `.${customClass} mbg-images img`, {
      scaleMode: EImageScaleMode.FIT_ASPECT,
      thumbContainerSelector: `.${customClass} mbg-thumbs`,
      thumbSelector: `.${customClass} mbg-thumbs img`,
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
    createSlideshow(`.${customClass} mbg-images img`, {
      scaleMode: EImageScaleMode.FIT_ASPECT,
      preloaderBeforeSize: preloaderBeforeSize ? +preloaderBeforeSize : undefined,
      preloaderAfterSize: preloaderAfterSize ? +preloaderAfterSize : undefined,
      interval: interval ? +interval : undefined,
      zoom: zoom ? true : undefined,
    });
  }
}

class MibreitImagesElement extends HTMLElement {}

class MibreitThumbsElement extends HTMLElement {}

class MibreitTitleElement extends HTMLElement {}

customElements.define('mbg-gallery', MibreitGalleryElement);
customElements.define('mbg-slideshow', MibreitSlideshowElement);
customElements.define('mbg-images', MibreitImagesElement);
customElements.define('mbg-thumbs', MibreitThumbsElement);
customElements.define('mbg-title', MibreitTitleElement);
