/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { SlideshowConfig } from '../containers/SlideshowContainer';

export default function checkSlideshowConfig(config: SlideshowConfig) {
  if (
    typeof config.scaleMode !== 'undefined' &&
    (typeof config.scaleMode !== 'number' || config.scaleMode < 0 || config.scaleMode > 3)
  ) {
    throw new Error('checkSlideshowConfig - config scaleMode should be of type EImageScaleMode (number 0 - 3)');
  }
  if (typeof config.interval !== 'undefined' && (typeof config.interval !== 'number' || config.interval < 1000)) {
    throw new Error('checkSlideshowConfig - config interval should be of type number and larger than 1000');
  }
  if (typeof config.zoom !== 'undefined' && typeof config.zoom !== 'boolean') {
    throw new Error('checkSlideshowConfig - config zoom should be of type boolean');
  }
}
