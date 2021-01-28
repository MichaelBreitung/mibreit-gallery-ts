/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import IThumbScroller from '../interfaces/IThumbScroller';
import IThumbScrollerLayout from '../interfaces/IThumbScrollerLayout';
import HorizontalScroller from './HorizontalScroller';

export default class ThumbScroller implements IThumbScroller {
  private _scroller: HorizontalScroller;
  private _layout: IThumbScrollerLayout;
  private _scrollIndexChangedCallbacks: Array<(index: number) => void> = new Array();
  private _currentScrollIndex: number;  
  private _numberOfThumbs: number;
 
  constructor(layout: IThumbScrollerLayout, numberOfThumbs: number) {
    this._layout = layout;
    this._numberOfThumbs = numberOfThumbs;    
    this._scroller = new HorizontalScroller(layout.getScrollerContainer());

    console.log(
      'ThumbScroller#constructor - thumbSizeRem = ',
      this._layout.getThumbSizeRem(),
      ', numberOfThumbs = ',
      this._numberOfThumbs,
      ', numberOfVisibleThumbs = ',
      this._layout.getNumberOfVisibleThumbs()
    );
  }

  reinitSize()
  {
    this._layout.reinitSize();    
  }

  scrollTo(index: number, useCenterIndex: boolean = false): void {
    let newIndex = index;
    if (useCenterIndex) {
      newIndex -= Math.floor(this._layout.getNumberOfVisibleThumbs() / 2);
    }

    newIndex = this._normalizeIndex(newIndex);

    this._currentScrollIndex = newIndex;
    const currentScrollPosition = -newIndex * this._layout.getThumbSizeRem();
    this._scroller.scrollTo(currentScrollPosition, true);
    this._scrollIndexChangedCallbacks.forEach((callback) => {
      callback(this._currentScrollIndex);
    });
  }

  scrollNext(): void {
    let newIndex = this._currentScrollIndex + this._layout.getNumberOfVisibleThumbs();
    const maxPos = this._numberOfThumbs - this._layout.getNumberOfVisibleThumbs();
    if (this._currentScrollIndex === maxPos) {
      newIndex = 0;
    } else if (newIndex >= maxPos) {
      newIndex = maxPos;
    }

    console.log('ThumbScroller#scrollNext - oldIndex = ', this._currentScrollIndex, ', newIndex = ', newIndex);

    this.scrollTo(newIndex);
  }

  scrollPrevious(): void {
    let newIndex = this._currentScrollIndex - this._layout.getNumberOfVisibleThumbs();
    const maxPos = this._numberOfThumbs - this._layout.getNumberOfVisibleThumbs();
    if (this._currentScrollIndex === 0) {
      newIndex = maxPos;
    } else if (newIndex < 0) {
      newIndex = 0;
    }

    console.log('ThumbScroller#scrollPrevious - oldIndex = ', this._currentScrollIndex, ', newIndex = ', newIndex);

    this.scrollTo(newIndex);
  }

  addScrollIndexChangedCallback(callback: (index: number) => void): void {
    if (!this._scrollIndexChangedCallbacks.includes(callback)) {
      this._scrollIndexChangedCallbacks.push(callback);
    }
  }

  private _normalizeIndex(index: number): number {
    const maxPos = this._numberOfThumbs - this._layout.getNumberOfVisibleThumbs();
    if (index >= maxPos) {
      return maxPos;
    } else if (index < 0) {
      return 0;
    } else {
      return index;
    }
  }
}
