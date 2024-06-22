/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { getElements } from 'mibreit-dom-tools';

import GalleryContainerBuilder from '../builders/GalleryBuilder';

// Interfaces
import IGallery from '../interfaces/IGallery';

// Types
import { SlideshowConfig, checkSlideshowConfig } from '../types';

export default function (imageSelector: string, config: SlideshowConfig): IGallery {
  if (typeof imageSelector !== 'string') {
    throw new Error('createFullscreenOnlyGallery - first parameter must be imageSelector string');
  }
  checkSlideshowConfig(config);

  const elements = getElements(imageSelector);
  if (elements?.length > 0) {
    return GalleryContainerBuilder.fromImages(elements, config).addPreviousNextButtons().addFullscreen().build();
  } else {
    throw new Error('createFullscreenOnlyGallery - no images selected');
  }
}
