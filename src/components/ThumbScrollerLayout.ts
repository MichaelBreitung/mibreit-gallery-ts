/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { DomTools } from 'mibreit-dom-tools';
import styles from './ThumbScrollerLayout.module.css';
import nextThumbs from '../images/nextThumbs.svg';
import IImageStage from '../interfaces/IImageStage';
import IThumbScrollerLayout from '../interfaces/IThumbScrollerLayout';

export default class ThumbScrollerLayout implements IThumbScrollerLayout {
  private _scrollerContainer: HTMLElement;
  private _previousButton: HTMLElement;
  private _nextButton: HTMLElement;
  private _thumbSizeRem: number;
  private _thumbStages: Array<IImageStage>;
  private _numberOfVisibleThumbs: number;

  constructor(container: HTMLElement, thumbStages: Array<IImageStage>, numberOfVisibleThumbs: number) {
    this._numberOfVisibleThumbs = numberOfVisibleThumbs;
    this._thumbStages = thumbStages;

    const willThumbsFitContainer = numberOfVisibleThumbs >= thumbStages.length;
    this._createScrollerContainer(container, willThumbsFitContainer);
    this._createScrollerButtons(container, willThumbsFitContainer);    
    DomTools.addCssClass(container, styles.mibreit_ThumbScrollerParentContainer);

    this.reinitSize();
  }

  reinitSize() {
    this._thumbSizeRem = this._calculateThumbsize(this._scrollerContainer, this._numberOfVisibleThumbs);
    this._resizeThumbStages(this._thumbSizeRem);
  }

  getThumbSizeRem(): number {
    return this._thumbSizeRem;
  }

  getNumberOfVisibleThumbs(): number {
    return this._numberOfVisibleThumbs;
  }

  getNumberOfThumbs(): number {
    return this._thumbStages.length;
  }

  getThumbScrollerButtons(): { previousButton: HTMLElement; nextButton: HTMLElement } {
    return { previousButton: this._previousButton, nextButton: this._nextButton };
  }

  getScrollerContainer(): HTMLElement {
    return this._scrollerContainer;
  }

  private _createScrollerContainer(container: HTMLElement, centerThumbs: boolean) {
    const childNodes: Array<Node> = DomTools.getChildNodes(container);
    this._scrollerContainer = DomTools.createElement('div');    
    if (centerThumbs)
    {
      DomTools.addCssClass(this._scrollerContainer, styles.mibreit_ThumbScrollerContainerCentered);
    }
    else{
      DomTools.addCssClass(this._scrollerContainer, styles.mibreit_ThumbScrollerContainer);
    }
    DomTools.wrapElements(childNodes, this._scrollerContainer);
  }

  private _calculateThumbsize(container: HTMLElement, numberOfVisibleThumbs: number): number {
    const oneRemSize = DomTools.getRootFontSize();
    const containerWidthRem = DomTools.getElementDimension(container).width / oneRemSize;
    const thumbsize = containerWidthRem / numberOfVisibleThumbs;
    return thumbsize;
  }

  private _createScrollerButtons(container: HTMLElement, hidden: boolean) {
    this._previousButton = DomTools.createElement('div');
    DomTools.setInnerHtml(this._previousButton, nextThumbs);
    DomTools.addCssClass(this._previousButton, styles.mibreit_ThumbScrollerPrevious);
    DomTools.prependChildElement(this._previousButton, container);

    this._nextButton = DomTools.createElement('div');
    DomTools.setInnerHtml(this._nextButton, nextThumbs);
    DomTools.addCssClass(this._nextButton, styles.mibreit_ThumbScrollerNext);
    DomTools.appendChildElement(this._nextButton, container);

    if (hidden)
    {
      DomTools.addCssStyle(this._previousButton, 'opacity', '0');
      DomTools.addCssStyle(this._nextButton, 'opacity', '0');
    }
  }

  private _resizeThumbStages(size: number) {
    const innerSize: number = size * 0.9;
    const margin: number = size * 0.05;
    this._thumbStages.forEach((thumbStage: IImageStage) => {
      thumbStage.setSize(`${innerSize}rem`, `${innerSize}rem`);
      thumbStage.setMargin(`${margin}rem`);
    });
  }
}
