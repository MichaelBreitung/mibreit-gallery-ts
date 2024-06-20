/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { getElement, getElements } from 'mibreit-dom-tools';
import ThumbScrollerContainer, { ThumbScrollerConfig } from '../containers/ThumbScrollerContainer';
import IThumbsViewer from '../interfaces/IThumbsViewer';
import checkConfig from '../tools/checkThumbScrollerConfig';

export default function (
  containerSelector: string,
  thumbSelector: string,
  config?: ThumbScrollerConfig,
  thumbClickedCallback?: (index: number) => void
): IThumbsViewer | null {
  if (typeof containerSelector !== 'string') {
    throw new Error('createThumbsViewer - first parameter must be containerSelector string');
  }
  if (typeof thumbSelector !== 'string') {
    throw new Error('createThumbsViewer - second parameter must be imageSelector string');
  }
  if (config) {
    checkConfig(config);
  }

  const elements = getElements(thumbSelector);
  const container = getElement(containerSelector);

  if (container && elements?.length > 0) {
    return new ThumbScrollerContainer(container, elements, config, thumbClickedCallback).getThumbsViewer();
  } else {
    throw new Error('createThumbsViewer - no images selected');
  }
}
