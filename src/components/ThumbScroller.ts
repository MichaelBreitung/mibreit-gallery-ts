/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import IThumbScroller from "../interfaces/IThumbScroller";
import IImageStage from '../interfaces/IImageStage';
import styles from './ImageStage.module.css';

export default class ThumbScroller implements IThumbScroller {
  private thumbStages: Array<IImageStage>;
  private container: HTMLElement;
  private scrollIndexChangedCallbacks: Array<(index: number) => void> = new Array();

  constructor(container: HTMLElement, thumbStages: Array<IImageStage>)
  {
    this.thumbStages = thumbStages; 
    this.container = container;
  }

  scrollTo(index: number): boolean
  {
    return true;
  }

  scrollLeft(nrOfThumbs: number): boolean
  {
    return this.scrollTo(0);
  }

  scrollRight(nrOfThumbs: number): boolean
  {
    return this.scrollTo(0);
  }
 
  addScrollIndexChangedCallback(callback: (index: number) => void): void
  {
    if (!this.scrollIndexChangedCallbacks.includes(callback)) {
      this.scrollIndexChangedCallbacks.push(callback);
    }
  }
}