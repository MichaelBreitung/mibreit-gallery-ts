/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { DomTools } from 'mibreit-dom-tools';
import styles from './HorizontalScroller.module.css';

export default class HorizontalScroller {
  private scroller: HTMLElement;

  constructor(container: HTMLElement) {
    this.scroller = this.createScroller(container);
  }

  scrollTo(position: number, useRem: boolean = false): boolean {
    let positionCss: string;
    if (useRem) {
      positionCss = `${position}rem`;
    } else {
      positionCss = `${position}px`;
    }
    DomTools.applyCssStyle(this.scroller, 'transform', `translate(${positionCss})`);
    return true;
  }

  private createScroller(container: HTMLElement): HTMLElement {
    const childNodes: Array<Node> = DomTools.getChildNodes(container);
    const scroller = DomTools.createElement('div');
    DomTools.applyCssClass(scroller, styles.mibreit_HorizontalScroller);
    DomTools.wrapElements(childNodes, scroller);

    return scroller;
  }
}
