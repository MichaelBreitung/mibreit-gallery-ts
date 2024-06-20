/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { addCssClass, addCssStyle, createElement, wrapElements } from 'mibreit-dom-tools';
import styles from './HorizontalScroller.module.css';

export default class HorizontalScroller {
  private _scroller: HTMLElement;

  constructor(elements: Array<Node>) {
    this._scroller = this._createScroller(elements);
  }

  scrollTo(position: number, useRem: boolean = false): boolean {
    let positionCss: string;
    if (useRem) {
      positionCss = `${position}rem`;
    } else {
      positionCss = `${position}px`;
    }
    addCssStyle(this._scroller, 'transform', `translate(${positionCss})`);
    return true;
  }

  private _createScroller(elements: Array<Node>): HTMLElement {
    const scroller = createElement('div');
    addCssClass(scroller, styles.hscroller);
    wrapElements(elements, scroller);

    return scroller;
  }
}
