/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { getElement, getElements } from 'mibreit-dom-tools';

import ThumbScrollerBuilder from '../builders/ThumbsScrollerBuilder';

// Types
import { ThumbScrollerConfig, checkThumbScrollerConfig } from '../types';
import IThumbsViewer from '../interfaces/IThumbsViewer';

export default function (
  containerSelector: string,
  thumbSelector: string,
  config?: ThumbScrollerConfig,
  thumbClickedCallback?: (index: number) => void
): IThumbsViewer {
  if (typeof containerSelector !== 'string') {
    throw new Error('createThumbsViewer - first parameter must be containerSelector string');
  }
  if (typeof thumbSelector !== 'string') {
    throw new Error('createThumbsViewer - second parameter must be imageSelector string');
  }
  if (config) {
    checkThumbScrollerConfig(config);
  }

  const elements = getElements(thumbSelector);
  const container = getElement(containerSelector);

  if (container && elements?.length > 0) {
    return new ThumbScrollerBuilder(container, elements, config, thumbClickedCallback).addPreviousNextButtons().build();
  } else {
    throw new Error('createThumbsViewer - no images selected');
  }
}
