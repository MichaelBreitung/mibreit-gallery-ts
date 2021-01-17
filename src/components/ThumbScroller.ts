/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import IThumbScroller from '../interfaces/IThumbScroller';
import HorizontalScroller from './HorizontalScroller';

export default class ThumbScroller implements IThumbScroller {
  private scroller: HorizontalScroller;
  private scrollIndexChangedCallbacks: Array<(index: number) => void> = new Array();
  private currentScrollIndex: number;
  private thumbSizeRem: number;
  private numberOfThumbs: number;
  private numberOfVisibleThumbs: number;

  constructor(container: HTMLElement, thumbSizeRem: number, numberOfThumbs: number, numberOfVisibleThumbs: number) {
    this.thumbSizeRem = thumbSizeRem;
    this.numberOfThumbs = numberOfThumbs;
    this.numberOfVisibleThumbs = numberOfVisibleThumbs;
    this.scroller = new HorizontalScroller(container);

    console.log(
      'ThumbScroller#constructor - thumbSizeRem = ',
      this.thumbSizeRem,
      ', numberOfThumbs = ',
      this.numberOfThumbs,
      ', numberOfVisibleThumbs = ',
      this.numberOfVisibleThumbs
    );
  }

  scrollTo(index: number, useCenterIndex: boolean = false): void {
    let newIndex = index;
    if (useCenterIndex) {
      newIndex -= Math.floor(this.numberOfVisibleThumbs / 2);
    }

    newIndex = this.normalizeIndex(newIndex);

    this.currentScrollIndex = newIndex;
    const currentScrollPosition = -newIndex * this.thumbSizeRem;
    this.scroller.scrollTo(currentScrollPosition, true);
  }

  scrollNext(): void {
    let newIndex = this.currentScrollIndex + this.numberOfVisibleThumbs;
    const maxPos = this.numberOfThumbs - this.numberOfVisibleThumbs;
    if (this.currentScrollIndex === maxPos) {
      newIndex = 0;
    } else if (newIndex >= maxPos) {
      newIndex = maxPos;
    }

    console.log('ThumbScroller#scrollNext - oldIndex = ', this.currentScrollIndex, ', newIndex = ', newIndex);

    this.scrollTo(newIndex);
  }

  scrollPrevious(): void {
    let newIndex = this.currentScrollIndex - this.numberOfVisibleThumbs;
    const maxPos = this.numberOfThumbs - this.numberOfVisibleThumbs;
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
    const maxPos = this.numberOfThumbs - this.numberOfVisibleThumbs;
    if (index >= maxPos) {
      return maxPos;
    } else if (index < 0) {
      return 0;
    }
    else{
      return index;
    }
  }
}
