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
    if (this.isValidIndex(index))
    {
      this.currentScrollIndex = index;
      const currentScrollPosition = -index * this.thumbSizeRem;
      this.scroller.scrollTo(currentScrollPosition, true);
      return true;
    }
    else{
      return false;
    }
  }

  scrollNext(): boolean {
    let newIndex = this.currentScrollIndex + this.numberOfVisibleThumbs;
    const maxPos = this.numberOfThumbs - this.numberOfVisibleThumbs;
    if (this.currentScrollIndex === maxPos)
    {
      newIndex = 0;
    }
    else if (newIndex >= maxPos) {
      newIndex = maxPos;
    }

    console.log("ThumbScroller#scrollNext - oldIndex = ", this.currentScrollIndex, ", newIndex = ", newIndex);

    return this.scrollTo(newIndex);
  }

  scrollPrevious(): boolean {
    let newIndex = this.currentScrollIndex - this.numberOfVisibleThumbs;
    const maxPos = this.numberOfThumbs - this.numberOfVisibleThumbs;
    if (this.currentScrollIndex === 0)
    {
      newIndex = maxPos;
    }
    else if (newIndex < 0) {
      newIndex = 0;
    }

    console.log("ThumbScroller#scrollPrevious - oldIndex = ", this.currentScrollIndex, ", newIndex = ", newIndex);

    return this.scrollTo(newIndex);
  }

  addScrollIndexChangedCallback(callback: (index: number) => void): void {
    if (!this.scrollIndexChangedCallbacks.includes(callback)) {
      this.scrollIndexChangedCallbacks.push(callback);
    }
  }

  private isValidIndex(index: number) : boolean{
    return index <= this.numberOfThumbs - this.numberOfVisibleThumbs && index >= 0;
  }
}
