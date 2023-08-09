/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { getElements } from 'mibreit-dom-tools';
import SlideshowContainer, { SlideshowConfig } from '../containers/SlideshowContainer';
import ISlideshowContainer from '../interfaces/ISlideshowContainer';
import checkSlideshowConfig from '../tools/checkSlideshowConfig';

export default function (imageSelector: string, config?: SlideshowConfig): ISlideshowContainer {
  if (typeof imageSelector !== 'string') {
    throw new Error('createSlideshow - second parameter must be imageSelector string');
  }
  const elements = getElements(imageSelector);
  if (elements?.length > 0) {
    if (config) {
      checkSlideshowConfig(config);
    }
    return new SlideshowContainer(elements, config);
  } else {
    throw new Error('createSlideshow - no images selected');
  }
}
