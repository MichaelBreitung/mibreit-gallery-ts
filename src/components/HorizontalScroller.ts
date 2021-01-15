/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import DomTools from '../tools/domTools';
import styles from './HorizontalScroller.module.css';

export default class HorizontalScroller {
  private scroller: HTMLElement;
  
  constructor(container: HTMLElement)
  {
    this.scroller = this.createScroller(container);
  }

  scrollTo(position: number): boolean
  {
    DomTools.applyCssStyle(this.scroller, 'transform', `translate(${position}px)`);
    return true;
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