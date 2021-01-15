/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import DomTools from '../tools/domTools';
import IThumbScroller from "../interfaces/IThumbScroller";
import IImageStage from '../interfaces/IImageStage';
import styles from './ThumbScroller.module.css';

export default class ThumbScroller implements IThumbScroller {
  private thumbStages: Array<IImageStage>;
  private scroller: HTMLElement;
  private scrollIndexChangedCallbacks: Array<(index: number) => void> = new Array();

  constructor(container: HTMLElement, thumbStages: Array<IImageStage>)
  {
    this.thumbStages = thumbStages; 
    this.scroller = this.createScroller(container);
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

  private createScroller(container: HTMLElement): HTMLElement {
    console.log("ThumbScroller#createScroller");
    const thumbNodes : NodeList = container.childNodes;
    const thumbNodesArray : Array<Node> = new Array();

    for (let i = 0; i < thumbNodes.length; ++i)
    {
      thumbNodesArray.push(thumbNodes[i]);
    }

    const scroller = DomTools.createElement('div');
    DomTools.applyCssClass(scroller, styles.mibreit_ThumbScroller);
    DomTools.wrapElements(thumbNodesArray, scroller);
    return scroller;
  }
}