/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { getElements } from 'mibreit-dom-tools';

import SlideshowBuilder from '../builders/SlideshowBuilder';

// Types
import { checkSlideshowConfig, SlideshowConfig } from '../types';

// Interfaces
import ISlideshow from '../interfaces/ISlideshow';

export default function (imageSelector: string, config?: SlideshowConfig): ISlideshow {
  if (typeof imageSelector !== 'string') {
    throw new Error('createSlideshow - second parameter must be imageSelector string');
  }
  const elements = getElements(imageSelector);
  if (elements?.length > 0) {
    if (config) {
      checkSlideshowConfig(config);
    }
    const slideshow = new SlideshowBuilder(elements, config).build();

    slideshow.getImageViewer().showImage(0);

    return slideshow;
  } else {
    throw new Error('createSlideshow - no images selected');
  }
}
