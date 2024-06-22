/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import {
  addCssClass,
  addCssStyle,
  createElement,
  getChildNodes,
  getElementDimension,
  getRootFontSize,
  wrapElements,
} from 'mibreit-dom-tools';

import HorizontalScroller from './HorizontalScroller';

// interfaces
import IThumbsViewer from '../interfaces/IThumbsViewer';

// styles
import styles from './ThumbsViewer.module.css';

export default class ThumbsViewer implements IThumbsViewer {
  private _scroller: HorizontalScroller | null = null;
  private _wrapperElement: HTMLElement;
  private _thumbElements: Array<HTMLElement>;
  private _thumbSizeRem: number;
  private _numberOfVisibleThumbs: number;
  private _scrollIndexChangedCallbacks: Array<(index: number) => void> = new Array();
  private _currentScrollIndex: number = 0;

  constructor(container: HTMLElement, numberOfVisibleThumbs: number) {
    this._numberOfVisibleThumbs = numberOfVisibleThumbs;
    this._thumbElements = Array.from(container.children) as Array<HTMLElement>;

    this._wrapperElement = this._wrapThumbs(
      getChildNodes(container),
      numberOfVisibleThumbs,
      this._thumbElements.length
    );
    this._thumbSizeRem = this._calculateThumbsize(this._wrapperElement, numberOfVisibleThumbs);
    this._resizeThumbs(this._thumbElements, this._thumbSizeRem);

    console.log(
      'ThumbsViewer#constructor - thumbSizeRem = ',
      this._thumbSizeRem,
      ', numberOfThumbs = ',
      this._thumbElements.length,
      ', numberOfVisibleThumbs = ',
      this._numberOfVisibleThumbs
    );

    if (this._numberOfVisibleThumbs < this._thumbElements.length) {
      this._scroller = new HorizontalScroller(this._thumbElements);
    }
  }

  reinitSize() {
    this._thumbSizeRem = this._calculateThumbsize(this._wrapperElement, this._numberOfVisibleThumbs);
    this._resizeThumbs(this._thumbElements, this._thumbSizeRem);
    this.setCenterThumb(this._currentScrollIndex, false);
  }

  setCenterThumb(index: number, useCenterIndex: boolean = true): void {
    if (this._scroller) {
      let newIndex = index;
      if (useCenterIndex) {
        newIndex -= Math.floor(this._numberOfVisibleThumbs / 2);
      }

      const normalizedIndex = this._normalizeIndex(newIndex);

      console.log(
        `ThumbsViewer#setCenterThumb - index: ${index}, newIndex: ${newIndex}, normalizedIndex: ${normalizedIndex}`
      );

      this._currentScrollIndex = normalizedIndex;
      const currentScrollPosition = -normalizedIndex * this._thumbSizeRem;
      this._scroller.scrollTo(currentScrollPosition, true);
      this._scrollIndexChangedCallbacks.forEach((callback) => {
        callback(this._currentScrollIndex);
      });
    }
  }

  scrollNext(): void {
    let newIndex = this._currentScrollIndex + this._numberOfVisibleThumbs;
    const maxPos = this._thumbElements.length - this._numberOfVisibleThumbs;
    if (this._currentScrollIndex === maxPos) {
      newIndex = 0;
    } else if (newIndex >= maxPos) {
      newIndex = maxPos;
    }
    this.setCenterThumb(newIndex, false);
  }

  scrollPrevious(): void {
    let newIndex = this._currentScrollIndex - this._numberOfVisibleThumbs;
    const maxPos = this._thumbElements.length - this._numberOfVisibleThumbs;
    if (this._currentScrollIndex === 0) {
      newIndex = maxPos;
    } else if (newIndex < 0) {
      newIndex = 0;
    }
    this.setCenterThumb(newIndex, false);
  }

  addScrollIndexChangedCallback(callback: (index: number) => void): void {
    if (!this._scrollIndexChangedCallbacks.includes(callback)) {
      this._scrollIndexChangedCallbacks.push(callback);
    }
  }

  private _normalizeIndex(index: number): number {
    const maxPos = this._thumbElements.length - this._numberOfVisibleThumbs;
    if (index >= maxPos) {
      return maxPos;
    } else if (index < 0) {
      return 0;
    } else {
      return index;
    }
  }

  private _wrapThumbs(thumbs: Array<Node>, numberOfVisibleThumbs: number, numberOfThumbs: number): HTMLElement {
    const wrapper = createElement('div');
    if (numberOfVisibleThumbs >= numberOfThumbs) {
      addCssClass(wrapper, styles.thumbs_viewer__centered);
    } else {
      addCssClass(wrapper, styles.thumbs_viewer);
    }
    wrapElements(thumbs, wrapper);
    return wrapper;
  }

  private _calculateThumbsize(container: HTMLElement, numberOfVisibleThumbs: number): number {
    const oneRemSize = getRootFontSize();
    const containerWidthRem = getElementDimension(container).width / oneRemSize;
    const thumbsize = containerWidthRem / numberOfVisibleThumbs;

    console.log('ThumbsWrapper#_calculateThumbsize - containerWidthRem: ', containerWidthRem);
    return thumbsize;
  }

  private _resizeThumbs(thumbElements: Array<HTMLElement>, size: number) {
    const innerSize: number = size * 0.9;
    const margin: number = size * 0.05;

    for (let i = 0; i < thumbElements.length; ++i) {
      addCssStyle(thumbElements[i], 'width', `${innerSize}rem`);
      addCssStyle(thumbElements[i], 'height', `${innerSize}rem`);
      addCssStyle(thumbElements[i], 'margin', `${margin}rem`);
    }
  }
}
