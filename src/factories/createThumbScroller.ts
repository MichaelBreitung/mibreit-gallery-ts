/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { getElement, getElements } from 'mibreit-dom-tools';
import ThumbScrollerContainer, { ThumbScrollerConfig } from '../containers/ThumbScrollerContainer';
import IThumbScroller from '../interfaces/IThumbScroller';
import checkConfig from '../tools/checkThumbScrollerConfig';

export default function (
  containerSelector: string,
  thumbSelector: string,
  config: ThumbScrollerConfig,
  thumbClickedCallback?: (index: number) => void
): IThumbScroller | null {
  if (typeof containerSelector !== 'string') {
    throw new Error('createThumbScroller - first parameter must be containerSelector string');
  }
  if (typeof thumbSelector !== 'string') {
    throw new Error('createThumbScroller - second parameter must be imageSelector string');
  }
  checkConfig(config);
  const elements = getElements(thumbSelector);
  const container = getElement(containerSelector);

  if (container && elements?.length > 0) {
    return new ThumbScrollerContainer(container, elements, config, thumbClickedCallback).getScroller();
  } else {
    throw new Error('createThumbScroller - no images selected');
  }
}
