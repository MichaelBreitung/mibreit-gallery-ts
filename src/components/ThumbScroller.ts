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

  scrollTo(index: number): boolean {
    this.currentScrollIndex = index;
    const currentScrollPosition = -index * this.thumbSizeRem;
    this.scroller.scrollTo(currentScrollPosition, true);
    return true;
  }

  scrollNext(): boolean {
    let newIndex = this.currentScrollIndex + this.numberOfVisibleThumbs;
    if (newIndex >= this.numberOfThumbs) {
      newIndex = 0;
    }
    return this.scrollTo(newIndex);
  }

  scrollPrevious(): boolean {
    let newIndex = this.currentScrollIndex - this.numberOfVisibleThumbs;
    if (newIndex < 0) {
      newIndex = this.numberOfThumbs - 1;
    }
    return this.scrollTo(newIndex);
  }

  addScrollIndexChangedCallback(callback: (index: number) => void): void {
    if (!this.scrollIndexChangedCallbacks.includes(callback)) {
      this.scrollIndexChangedCallbacks.push(callback);
    }
  }
}
