/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { DomTools } from 'mibreit-dom-tools';
import styles from './ThumbScrollerLayout.module.css';
import nextThumbs from '../images/nextThumbs.svg';
import IImageStage from '../interfaces/IImageStage';

const THUMBSTAGE_MARGIN_REM = 0.5;

export default class ThumbScrollerLayout {
  private _scrollerContainer: HTMLElement;
  private _previousButton: HTMLElement;
  private _nextButton: HTMLElement;
  private _thumbSizeRem: number;
  private _thumbStages: Array<IImageStage>;
  private _numberOfVisibleThumbs: number;

  constructor(container: HTMLElement, thumbStages: Array<IImageStage>, numberOfVisibleThumbs: number) {
    this._numberOfVisibleThumbs = numberOfVisibleThumbs;
    this._thumbStages = thumbStages;

    this._createScrollerContainer(container);
    this._createScrollerButtons(container);
    DomTools.addCssClass(container, styles.mibreit_ThumbScrollerParentContainer);

    this.reinitSize();
  }

  reinitSize() {
    const thumbSize = this._calculateThumbsize(this._scrollerContainer, this._numberOfVisibleThumbs);
    this._resizeThumbStages(thumbSize);
    this._thumbSizeRem = thumbSize + THUMBSTAGE_MARGIN_REM;
  }

  getThumbSizeRem(): number {
    return this._thumbSizeRem;
  }

  getNumberOfVisibleThumbs(): number {
    return this._numberOfVisibleThumbs;
  }

  getThumbScrollerButtons(): { previousButton: HTMLElement; nextButton: HTMLElement } {
    return { previousButton: this._previousButton, nextButton: this._nextButton };
  }

  getScrollerContainer(): HTMLElement {
    return this._scrollerContainer;
  }

  private _createScrollerContainer(container: HTMLElement) {
    const childNodes: Array<Node> = DomTools.getChildNodes(container);
    this._scrollerContainer = DomTools.createElement('div');
    DomTools.addCssClass(this._scrollerContainer, styles.mibreit_ThumbScrollerContainer);
    DomTools.wrapElements(childNodes, this._scrollerContainer);
  }

  private _calculateThumbsize(container: HTMLElement, numberOfVisibleThumbs: number): number {
    const oneRemSize = DomTools.getRootFontSize();
    const containerWidthRem = DomTools.getElementDimension(container).width / oneRemSize;  
    const thumbsize = containerWidthRem / numberOfVisibleThumbs - THUMBSTAGE_MARGIN_REM;
    return thumbsize;
  }

  private _createScrollerButtons(container: HTMLElement) {
    this._previousButton = DomTools.createElement('div');
    DomTools.setInnerHtml(this._previousButton, nextThumbs);
    DomTools.addCssClass(this._previousButton, styles.mibreit_ThumbScrollerPrevious);
    DomTools.prependChildElement(this._previousButton, container);

    this._nextButton = DomTools.createElement('div');
    DomTools.setInnerHtml(this._nextButton, nextThumbs);
    DomTools.addCssClass(this._nextButton, styles.mibreit_ThumbScrollerNext);
    DomTools.appendChildElement(this._nextButton, container);
  }

  private _resizeThumbStages(size: number) {
    this._thumbStages.forEach((thumbStage: IImageStage) => {
      thumbStage.setSize(`${size}rem`, `${size}rem`);
    });
  }
}
