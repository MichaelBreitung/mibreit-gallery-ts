/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import ThumbScrollerContainer, { ThumbScrollerConfig } from '../containers/ThumbScrollerContainer';
import IThumbScroller from '../interfaces/IThumbScroller';

function checkConfig(config: ThumbScrollerConfig) {
  if (typeof config.thumbContainerSelector !== 'string') {
    throw new Error('createSlideshow - config missing thumbContainerSelector string');
  }
  if (typeof config.thumbSelector !== 'string') {
    throw new Error('createSlideshow - config missing thumbSelector string');
  }
  if (typeof config.numberOfVisibleThumbs !== 'number') {
    throw new Error('createSlideshow - config missing numberOfVisibleThumbs number');
  }
  if (typeof config.initialIndex !== 'undefined' && typeof config.initialIndex !== 'number') {
    throw new Error('createSlideshow - config initialIndex should be of type number');
  }
}

export default function (config: ThumbScrollerConfig, thumbClickedCallback?: (index: number) => void): IThumbScroller | null {
  checkConfig(config);
  return new ThumbScrollerContainer(config, thumbClickedCallback).getScroller();
}
