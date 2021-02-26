/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import SlideshowContainer, { SlideshowConfig } from '../containers/SlideshowContainer';
import ISlideshowContainer from '../interfaces/ISlideshowContainer';

function checkConfig(config: SlideshowConfig) {
  if (typeof config.imageSelector !== 'string') {
    throw new Error('createSlideshow - config missing imageSelector string');
  }
  if (typeof config.scaleMode !== 'undefined' && typeof config.scaleMode !== 'number') {
    throw new Error('createSlideshow - config scaleMode should be of type EImageScaleMode (number 0 - 3)');
  }
  if (typeof config.interval !== 'undefined' && typeof config.interval !== 'number') {
    throw new Error('createSlideshow - config interval should be of type number');
  }
  if (typeof config.zoom !== 'undefined' && typeof config.zoom !== 'boolean') {
    throw new Error('createSlideshow - config zoom should be of type boolean');
  }
}

export default function (config: SlideshowConfig): ISlideshowContainer {
  checkConfig(config);

  return new SlideshowContainer(config);
}
