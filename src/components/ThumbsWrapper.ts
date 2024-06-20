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
import styles from './ThumbsWrapper.module.css';
import nextThumbs from '../images/nextThumbs.svg';

import IThumbsWrapper from '../interfaces/IThumbsWrapper';

export default class ThumbsWrapper implements IThumbsWrapper {
  private _wrapper: HTMLElement;
  private _previousButton: HTMLElement;
  private _nextButton: HTMLElement;
  private _thumbSizeRem: number;
  private _thumbs: Array<HTMLElement>;
  private _numberOfVisibleThumbs: number;

  constructor(container: HTMLElement, numberOfVisibleThumbs: number) {
    addCssClass(container, styles.thumbs_wrapper__parent);
    this._numberOfVisibleThumbs = numberOfVisibleThumbs;
    this._thumbs = Array.from(container.children) as Array<HTMLElement>;
    const willThumbsFitContainer = numberOfVisibleThumbs >= this._thumbs.length;
    this._wrapper = this._wrapThumbs(getChildNodes(container), willThumbsFitContainer);
    const [previousButton, nextButton] = this._createScrollerButtons(container, willThumbsFitContainer);
    this._previousButton = previousButton;
    this._nextButton = nextButton;
    this._thumbSizeRem = this._calculateThumbsize(this._wrapper, numberOfVisibleThumbs);
    this._resizeThumbs(this._thumbSizeRem);
  }

  reinitSize() {
    this._thumbSizeRem = this._calculateThumbsize(this._wrapper, this._numberOfVisibleThumbs);
    this._resizeThumbs(this._thumbSizeRem);
  }

  getThumbSizeRem(): number {
    return this._thumbSizeRem;
  }

  getNumberOfVisibleThumbs(): number {
    return this._numberOfVisibleThumbs;
  }

  getNumberOfThumbs(): number {
    return this._thumbs.length;
  }

  getThumbScrollerButtons(): { previousButton: HTMLElement; nextButton: HTMLElement } {
    return { previousButton: this._previousButton, nextButton: this._nextButton };
  }

  getElements(): Array<Node> {
    return getChildNodes(this._wrapper);
  }

  private _wrapThumbs(thumbs: Array<Node>, centerThumbs: boolean): HTMLElement {
    const wrapper = createElement('div');
    if (centerThumbs) {
      addCssClass(wrapper, styles.thumbs_wrapper__centered);
    } else {
      addCssClass(wrapper, styles.thumbs_wrapper);
    }
    wrapElements(thumbs, wrapper);
    return wrapper;
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
    addCssClass(previousButton, styles.thumbs_wrapper__previous_btn);
    prependChildElement(previousButton, container);

    const nextButton = createElement('div');
    setInnerHtml(nextButton, nextThumbs);
    addCssClass(nextButton, styles.thumbs_wrapper__next_btn);
    appendChildElement(nextButton, container);

    if (hidden) {
      addCssStyle(previousButton, 'opacity', '0');
      addCssStyle(nextButton, 'opacity', '0');
    }

    return [previousButton, nextButton];
  }

  private _resizeThumbs(size: number) {
    const innerSize: number = size * 0.9;
    const margin: number = size * 0.05;

    for (let i = 0; i < this._thumbs.length; ++i) {
      addCssStyle(this._thumbs[i], 'width', `${innerSize}rem`);
      addCssStyle(this._thumbs[i], 'height', `${innerSize}rem`);
      addCssStyle(this._thumbs[i], 'margin', `${margin}rem`);
    }
  }
}
