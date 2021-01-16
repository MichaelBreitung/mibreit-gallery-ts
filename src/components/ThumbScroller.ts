/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import DomTools from '../tools/domTools';
import IThumbScroller from '../interfaces/IThumbScroller';
import HorizontalScroller from './HorizontalScroller';
import styles from './ThumbScroller.module.css';
import nextThumbs from '../images/nextThumbs.svg';

export default class ThumbScroller implements IThumbScroller {
  private scroller: HorizontalScroller;
  private scrollIndexChangedCallbacks: Array<(index: number) => void> = new Array();
  private currentScrollIndex: number;
  private thumbSizeRem: number;
  private numberOfThumbs: number;
  private numberOfVisibleThumbs: number;

  constructor(container: HTMLElement, thumbSizeRem: number, numberOfThumbs: number, numberOfVisibleThumbs: number) {
    this.thumbSizeRem = thumbSizeRem;
    this.numberOfThumbs = numberOfVisibleThumbs;
    this.numberOfVisibleThumbs = numberOfVisibleThumbs;
    const oldContainerClass = DomTools.getCssClass(container);
    DomTools.applyCssClass(container, `${oldContainerClass} ${styles.mibreit_ThumbScrollerParentContainer}`);
    const scrollerContainer = this.createScrollerContainer(container);
    this.scroller = new HorizontalScroller(scrollerContainer);
    this.createScrollerButtons(container);
  }

  scrollTo(index: number): boolean {
    this.currentScrollIndex = index;
    const currentScrollPosition = - index * this.thumbSizeRem;
    this.scroller.scrollTo(currentScrollPosition, true);
    return true;
  }

  scrollNext(nrOfThumbs: number): boolean {
    let newIndex = this.currentScrollIndex + nrOfThumbs;
    if (newIndex >= this.numberOfThumbs) {
      newIndex = 0;
    }
    return this.scrollTo(newIndex);
  }

  scrollPrevious(nrOfThumbs: number): boolean {
    let newIndex = this.currentScrollIndex - nrOfThumbs;
    if (newIndex < 0) {
      newIndex = this.numberOfThumbs - 1;
    }
    return this.scrollTo(newIndex);
  }

  addScrollIndexChangedCallback(callback: (index: number) => void): void {
    if (!this.scrollIndexChangedCallbacks.includes(callback)) {
      this.scrollIndexChangedCallbacks.push(callback);
    }
  }

  private createScrollerContainer(container: HTMLElement): HTMLElement {
    const nodes: NodeList = container.childNodes;
    const nodesArray: Array<Node> = new Array();
    for (let i = 0; i < nodes.length; ++i) {
      nodesArray.push(nodes[i]);
    }
    const scrollerContainer = DomTools.createElement('div');
    DomTools.applyCssClass(scrollerContainer, styles.mibreit_ThumbScrollerContainer);
    DomTools.wrapElements(nodesArray, scrollerContainer);
    return scrollerContainer;
  }

  private createScrollerButtons(container: HTMLElement) {
    const previous = DomTools.createElement('div');
    DomTools.addClickEventListener(previous, () => {
      this.scrollPrevious(this.numberOfVisibleThumbs);
    });
    DomTools.setInnerHtml(nextThumbs, previous);
    DomTools.applyCssClass(previous, styles.mibreit_ThumbScrollerPrevious);
    DomTools.prependChildElement(previous, container);

    const next = DomTools.createElement('div');
    DomTools.addClickEventListener(next, () => {
      this.scrollNext(this.numberOfVisibleThumbs);
    });
    DomTools.setInnerHtml(nextThumbs, next);
    DomTools.applyCssClass(next, styles.mibreit_ThumbScrollerNext);
    DomTools.appendChildElement(next, container);
  }
}
