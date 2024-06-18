/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import {
  addCssClass,
  addCssStyle,
  appendChildElement,
  createElement,
  getChildNodes,
  getElementDimension,
  getRootFontSize,
  prependChildElement,
  setInnerHtml,
  wrapElements,
} from 'mibreit-dom-tools';
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
    addCssClass(container, styles.mibreit_ThumbScrollerParentContainer);
    this._numberOfVisibleThumbs = numberOfVisibleThumbs;
    this._thumbStages = thumbStages;
    const willThumbsFitContainer = numberOfVisibleThumbs >= thumbStages.length;
    this._scrollerContainer = this._createScrollerContainer(container, willThumbsFitContainer);
    const [previousButton, nextButton] = this._createScrollerButtons(container, willThumbsFitContainer);
    this._previousButton = previousButton;
    this._nextButton = nextButton;
    this._thumbSizeRem = this._calculateThumbsize(this._scrollerContainer, numberOfVisibleThumbs);
    this._resizeThumbStages(this._thumbSizeRem);
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

  private _createScrollerContainer(container: HTMLElement, centerThumbs: boolean): HTMLElement {
    const childNodes: Array<Node> = getChildNodes(container);
    const scrollerContainer = createElement('div');
    if (centerThumbs) {
      addCssClass(scrollerContainer, styles.mibreit_ThumbScrollerContainerCentered);
    } else {
      addCssClass(scrollerContainer, styles.mibreit_ThumbScrollerContainer);
    }
    wrapElements(childNodes, scrollerContainer);
    return scrollerContainer;
  }

  private _calculateThumbsize(container: HTMLElement, numberOfVisibleThumbs: number): number {
    const oneRemSize = getRootFontSize();
    const containerWidthRem = getElementDimension(container).width / oneRemSize;
    const thumbsize = containerWidthRem / numberOfVisibleThumbs;
    return thumbsize;
  }

  private _createScrollerButtons(container: HTMLElement, hidden: boolean): [HTMLElement, HTMLElement] {
    const previousButton = createElement('div');
    setInnerHtml(previousButton, nextThumbs);
    addCssClass(previousButton, styles.mibreit_ThumbScrollerPrevious);
    prependChildElement(previousButton, container);

    const nextButton = createElement('div');
    setInnerHtml(nextButton, nextThumbs);
    addCssClass(nextButton, styles.mibreit_ThumbScrollerNext);
    appendChildElement(nextButton, container);

    if (hidden) {
      addCssStyle(previousButton, 'opacity', '0');
      addCssStyle(nextButton, 'opacity', '0');
    }

    return [previousButton, nextButton];
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
