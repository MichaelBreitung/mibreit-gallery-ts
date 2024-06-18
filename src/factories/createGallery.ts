/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { addCssStyle, getElement, getElements } from 'mibreit-dom-tools';
import checkSlideshowConfig from '../tools/checkSlideshowConfig';

import GalleryContainerBuilder from '../builders/GalleryContainerBuilder';

// Interfaces and types
import IGalleryContainer from '../interfaces/IGalleryContainer';
import { SlideshowConfig } from '../containers/SlideshowContainer';
import { ThumbScrollerConfig } from '../containers/ThumbScrollerContainer';
import checkThumbScrollerConfig from '../tools/checkThumbScrollerConfig';

export type GalleryConfig = SlideshowConfig &
  ThumbScrollerConfig & {
    thumbContainerSelector?: string;
    thumbSelector?: string;
  };

export default function (containerSelector: string, imageSelector: string, config?: GalleryConfig): IGalleryContainer {
  if (typeof containerSelector !== 'string') {
    throw new Error('createGallery - first parameter must be containerSelector string');
  }
  if (typeof imageSelector !== 'string') {
    throw new Error('createGallery - second parameter must be imageSelector string');
  }
  if (config) {
    checkSlideshowConfig(config);
  }
  const elements = getElements(imageSelector);
  const container = getElement(containerSelector);
  if (container && elements?.length > 0) {
    const builder = new GalleryContainerBuilder(container, elements, config);

    if (typeof config?.thumbSelector === 'string' && typeof config?.thumbContainerSelector === 'string') {
      checkThumbScrollerConfig(config);
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
