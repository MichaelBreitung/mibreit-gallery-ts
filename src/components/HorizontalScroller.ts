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

  scrollTo(position: number, useRem: boolean = false): boolean
  {
    let positionCss: string;
    if (useRem)
    {
      positionCss = `${position}rem`;
    }
    else{
      positionCss = `${position}px`;
    }
    DomTools.applyCssStyle(this.scroller, 'transform', `translate(${positionCss})`);
    return true;
  }

  private createScroller(container: HTMLElement): HTMLElement {    
    const nodes : NodeList = container.childNodes;
    const nodesArray : Array<Node> = new Array();

    for (let i = 0; i < nodes.length; ++i)
    {
      nodesArray.push(nodes[i]);
    }

    const scroller = DomTools.createElement('div');
    DomTools.applyCssClass(scroller, styles.mibreit_HorizontalScroller);
    DomTools.wrapElements(nodesArray, scroller);
    
    return scroller;
  }
}