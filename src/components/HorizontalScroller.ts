/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { DomTools } from 'mibreit-dom-tools';
import styles from './HorizontalScroller.module.css';

export default class HorizontalScroller {
  private _scroller: HTMLElement;

  constructor(container: HTMLElement) {
    this._scroller = this._createScroller(container);
  }

  scrollTo(position: number, useRem: boolean = false): boolean {
    let positionCss: string;
    if (useRem) {
      positionCss = `${position}rem`;
    } else {
      positionCss = `${position}px`;
    }
    DomTools.addCssStyle(this._scroller, 'transform', `translate(${positionCss})`);
    return true;
  }

  private _createScroller(container: HTMLElement): HTMLElement {
    const childNodes: Array<Node> = DomTools.getChildNodes(container);
    const scroller = DomTools.createElement('div');
    DomTools.addCssClass(scroller, styles.mibreit_HorizontalScroller);
    DomTools.wrapElements(childNodes, scroller);

    return scroller;
  }
}
