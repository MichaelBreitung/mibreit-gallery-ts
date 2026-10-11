/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { getElement, getElements } from 'mibreit-dom-tools';

import { ThumbsScrollerBuilder } from '../builders';

// Types
import { ThumbScrollerConfig, checkThumbScrollerConfig } from '../types';
import IThumbsViewer from '../interfaces/IThumbsViewer';
import { assertCallback, assertSelectorPair } from './validation';

export default function (
  containerSelector: string,
  thumbSelector: string,
  config?: ThumbScrollerConfig,
  thumbClickedCallback?: (index: number) => void
): IThumbsViewer {
  const [validatedContainerSelector, validatedThumbSelector] = assertSelectorPair(
    [containerSelector, thumbSelector],
    'createThumbsScroller',
    ['first parameter containerSelector', 'second parameter thumbSelector']
  );
  if (config) {
    checkThumbScrollerConfig(config);
  }
  if (thumbClickedCallback) {
    assertCallback(thumbClickedCallback, 'createThumbsScroller', 'fourth parameter thumbClickedCallback');
  }

  const elements = getElements(validatedThumbSelector);
  const container = getElement(validatedContainerSelector);

  if (container && elements?.length > 0) {
    return new ThumbsScrollerBuilder(container, elements, config, thumbClickedCallback)
      .addPreviousNextButtons()
      .build();
  } else {
    throw new Error('createThumbsViewer - no images selected');
  }
}
