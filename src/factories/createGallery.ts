/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { addCssStyle, getElement, getElements } from 'mibreit-dom-tools';

import GalleryBuilder from '../builders/GalleryBuilder';

// Interfaces
import IGallery from '../interfaces/IGallery';

// Types
import { checkGalleryConfig, GalleryConfig } from '../types';

export default function (containerSelector: string, imageSelector: string, config?: GalleryConfig): IGallery {
  console.log('createGallery', config);
  if (typeof containerSelector !== 'string') {
    throw new Error('createGallery - first parameter must be containerSelector string');
  }
  if (typeof imageSelector !== 'string') {
    throw new Error('createGallery - second parameter must be imageSelector string');
  }
  if (config) {
    checkGalleryConfig(config);
  }

  const elements = getElements(imageSelector);
  const container = getElement(containerSelector);
  if (container && elements.length > 0) {
    const builder = GalleryBuilder.fromContainerAndImages(container, elements, config)
      .addPreviousNextButtons()
      .addFullscreen({ useAverageBackgroundColor: true });

    if (config?.thumbSelector && config?.thumbContainerSelector) {
      const thumbContainer = getElement(config.thumbContainerSelector);
      const thumbs = getElements(config.thumbSelector);
      if (thumbContainer && thumbs) {
        if (thumbs.length > 1) {
          builder.addThumbScroller(thumbContainer, thumbs, config);
        } else {
          addCssStyle(thumbContainer, 'display', 'none');
        }
      }
    }

    return builder.build();
  } else {
    throw new Error('createGallery - no images selected');
  }
}
