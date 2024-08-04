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
  createSlideshow,
  EImageScaleMode,
} from './index';
import { addCssClass, addCssStyle, getElement } from 'mibreit-dom-tools';
import IGallery from './interfaces/IGallery';

export *  from "./index";

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

  connectedCallback() {
    const customClass = `mbg__custom-gallery-${MibreitGalleryElement.classCounter++}`;
    this.classList.add(customClass);
    const numberOfVisibleThumbs = this.getAttribute('numberOfVisibleThumbs');
    const loaderWindowLeft = this.getAttribute('loaderWindowLeft');
    const loaderWindowRight = this.getAttribute('loaderWindowRight');
    const initialImageNr = this.getAttribute('initialImageNr');
    const interval = this.getAttribute('interval');
    const zoom = this.hasAttribute('zoom');
    const containerSelector = `.${customClass} mbg-images`;
    const thumbContainerSelector = `.${customClass} mbg-thumbs`;
    const gallery = createGallery(containerSelector, `${containerSelector} img`, {
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

    window.mbgGalleryObjects.push(gallery);

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
    const loaderWindowLeft = this.getAttribute('loaderWindowLeft');
    const loaderWindowRight = this.getAttribute('loaderWindowRight');
    const interval = this.getAttribute('interval');
    const zoom = this.hasAttribute('zoom');
    const expand = this.hasAttribute('expand');
    const containerSelector = `.${customClass} mbg-images`;
    createSlideshow(`${containerSelector} img`, {
      scaleMode: expand ? EImageScaleMode.EXPAND : EImageScaleMode.FIT_ASPECT,
      loaderWindowLeft: loaderWindowLeft ? +loaderWindowLeft : undefined,
      loaderWindowRight: loaderWindowRight ? +loaderWindowRight : undefined,
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
