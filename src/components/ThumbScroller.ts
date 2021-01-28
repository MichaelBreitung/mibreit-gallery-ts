/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import IThumbScroller from '../interfaces/IThumbScroller';
import IThumbScrollerLayout from '../interfaces/IThumbScrollerLayout';
import HorizontalScroller from './HorizontalScroller';

export default class ThumbScroller implements IThumbScroller {
  private scroller: HorizontalScroller;
  private layout: IThumbScrollerLayout;
  private scrollIndexChangedCallbacks: Array<(index: number) => void> = new Array();
  private currentScrollIndex: number;  
  private numberOfThumbs: number;
 
  constructor(layout: IThumbScrollerLayout, numberOfThumbs: number) {
    this.layout = layout;
    this.numberOfThumbs = numberOfThumbs;    
    this.scroller = new HorizontalScroller(layout.getScrollerContainer());

    console.log(
      'ThumbScroller#constructor - thumbSizeRem = ',
      this.layout.getThumbSizeRem(),
      ', numberOfThumbs = ',
      this.numberOfThumbs,
      ', numberOfVisibleThumbs = ',
      this.layout.getNumberOfVisibleThumbs()
    );
  }

  reinitSize()
  {
    this.layout.reinitSize();    
  }

  scrollTo(index: number, useCenterIndex: boolean = false): void {
    let newIndex = index;
    if (useCenterIndex) {
      newIndex -= Math.floor(this.layout.getNumberOfVisibleThumbs() / 2);
    }

    newIndex = this.normalizeIndex(newIndex);

    this.currentScrollIndex = newIndex;
    const currentScrollPosition = -newIndex * this.layout.getThumbSizeRem();
    this.scroller.scrollTo(currentScrollPosition, true);
    this.scrollIndexChangedCallbacks.forEach((callback) => {
      callback(this.currentScrollIndex);
    });
  }

  scrollNext(): void {
    let newIndex = this.currentScrollIndex + this.layout.getNumberOfVisibleThumbs();
    const maxPos = this.numberOfThumbs - this.layout.getNumberOfVisibleThumbs();
    if (this.currentScrollIndex === maxPos) {
      newIndex = 0;
    } else if (newIndex >= maxPos) {
      newIndex = maxPos;
    }

    console.log('ThumbScroller#scrollNext - oldIndex = ', this.currentScrollIndex, ', newIndex = ', newIndex);

    this.scrollTo(newIndex);
  }

  scrollPrevious(): void {
    let newIndex = this.currentScrollIndex - this.layout.getNumberOfVisibleThumbs();
    const maxPos = this.numberOfThumbs - this.layout.getNumberOfVisibleThumbs();
    if (this.currentScrollIndex === 0) {
      newIndex = maxPos;
    } else if (newIndex < 0) {
      newIndex = 0;
    }

    console.log('ThumbScroller#scrollPrevious - oldIndex = ', this.currentScrollIndex, ', newIndex = ', newIndex);

    this.scrollTo(newIndex);
  }

  addScrollIndexChangedCallback(callback: (index: number) => void): void {
    if (!this.scrollIndexChangedCallbacks.includes(callback)) {
      this.scrollIndexChangedCallbacks.push(callback);
    }
  }

  private normalizeIndex(index: number): number {
    const maxPos = this.numberOfThumbs - this.layout.getNumberOfVisibleThumbs();
    if (index >= maxPos) {
      return maxPos;
    } else if (index < 0) {
      return 0;
    } else {
      return index;
    }
  }
}
