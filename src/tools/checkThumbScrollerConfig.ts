/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { ThumbScrollerConfig } from '../containers/ThumbScrollerContainer';

export default function checkConfig(config: ThumbScrollerConfig) {
  if (
    typeof config.numberOfVisibleThumbs !== 'undefined' &&
    (typeof config.numberOfVisibleThumbs !== 'number' || config.numberOfVisibleThumbs < 0)
  ) {
    throw new Error('checkThumbScrollerConfig - numberOfVisibleThumbs is invalid number');
  }
  if (
    typeof config.initialIndex !== 'undefined' &&
    (typeof config.initialIndex !== 'number' || config.initialIndex < 0)
  ) {
    throw new Error('checkThumbScrollerConfig - config initialIndex should be of type number');
  }
}
