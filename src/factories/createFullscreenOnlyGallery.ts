/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import {
  addCssStyle,
  appendChildElement,
  cloneElement,
  createElement,
  getElement,
  getElements,
  removeCssStyle,
} from 'mibreit-dom-tools';

import checkSlideshowConfig from '../tools/checkSlideshowConfig';

import GalleryContainerBuilder from '../builders/GalleryContainerBuilder';

// Interfaces
import IGalleryContainer from '../interfaces/IGalleryContainer';
import { SlideshowConfig } from '../containers/SlideshowContainer';

function createImagesContainer(): HTMLElement {
  const container = createElement('div');
  addCssStyle(container, 'display', 'none');
  const body = getElement('body');
  appendChildElement(container, body!);
  return container;
}

export default function (imageSelector: string, config: SlideshowConfig): IGalleryContainer {
  if (typeof imageSelector !== 'string') {
    throw new Error('createFullscreenOnlyGallery - first parameter must be imageSelector string');
  }
  checkSlideshowConfig(config);

  const elements = getElements(imageSelector);
  if (elements?.length > 0) {
    const container = createImagesContainer();
    elements.forEach((image: HTMLElement) => {
      appendChildElement(cloneElement(image), container);
    });
    const clonedElements: NodeListOf<HTMLElement> = container.children as unknown as NodeListOf<HTMLElement>;
    const builder = new GalleryContainerBuilder(container, clonedElements, config);
    const galleryContainer = builder.build();

    const fullscreen = galleryContainer.getFullscreen();
    if (fullscreen) {
      fullscreen.addFullscreenChangedCallback((active: boolean) => {
        if (active) {
          removeCssStyle(container, 'display');
        } else {
          addCssStyle(container, 'display', 'none');
        }
      });
    }
    return galleryContainer;
  } else {
    throw new Error('createFullscreenOnlyGallery - no images selected');
  }
}
