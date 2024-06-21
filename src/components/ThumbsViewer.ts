/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import IThumbsViewer from '../interfaces/IThumbsViewer';
import IThumbsWrapper from '../interfaces/IThumbsWrapper';
import HorizontalScroller from './HorizontalScroller';

export default class ThumbsViewer implements IThumbsViewer {
  private _scroller: HorizontalScroller;
  private _thumbsWrapper: IThumbsWrapper;
  private _scrollIndexChangedCallbacks: Array<(index: number) => void> = new Array();
  private _currentScrollIndex: number = 0;

  constructor(thumbsWrapper: IThumbsWrapper) {
    this._thumbsWrapper = thumbsWrapper;
    this._scroller = new HorizontalScroller(thumbsWrapper.getElements());

    console.log(
      'ThumbsViewer#constructor - thumbSizeRem = ',
      this._thumbsWrapper.getThumbSizeRem(),
      ', numberOfThumbs = ',
      this._thumbsWrapper.getNumberOfThumbs(),
      ', numberOfVisibleThumbs = ',
      this._thumbsWrapper.getNumberOfVisibleThumbs()
    );
  }

  reinitSize() {
    this._thumbsWrapper.reinitSize();
    this.setCenterThumb(this._currentScrollIndex, false);
  }

  setCenterThumb(index: number, useCenterIndex: boolean = true): void {
    let newIndex = index;
    if (useCenterIndex) {
      newIndex -= Math.floor(this._thumbsWrapper.getNumberOfVisibleThumbs() / 2);
    }

    const normalizedIndex = this._normalizeIndex(newIndex);

    console.log('ThumbsViewer#setCenterThumb', newIndex, normalizedIndex);

    this._currentScrollIndex = normalizedIndex;
    const currentScrollPosition = -normalizedIndex * this._thumbsWrapper.getThumbSizeRem();
    this._scroller.scrollTo(currentScrollPosition, true);
    this._scrollIndexChangedCallbacks.forEach((callback) => {
      callback(this._currentScrollIndex);
    });
  }

  scrollNext(): void {
    let newIndex = this._currentScrollIndex + this._thumbsWrapper.getNumberOfVisibleThumbs();
    const maxPos = this._thumbsWrapper.getNumberOfThumbs() - this._thumbsWrapper.getNumberOfVisibleThumbs();
    if (this._currentScrollIndex === maxPos) {
      newIndex = 0;
    } else if (newIndex >= maxPos) {
      newIndex = maxPos;
    }
    this.setCenterThumb(newIndex, false);
  }

  scrollPrevious(): void {
    let newIndex = this._currentScrollIndex - this._thumbsWrapper.getNumberOfVisibleThumbs();
    const maxPos = this._thumbsWrapper.getNumberOfThumbs() - this._thumbsWrapper.getNumberOfVisibleThumbs();
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
    const maxPos = this._thumbsWrapper.getNumberOfThumbs() - this._thumbsWrapper.getNumberOfVisibleThumbs();
    if (index >= maxPos) {
      return maxPos;
    } else if (index < 0) {
      return 0;
    } else {
      return index;
    }
  }
}
