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
  private scrollerContainer: HTMLElement;
  private previousButton: HTMLElement;
  private nextButton: HTMLElement;
  private thumbSizeRem: number;
  private thumbStages: Array<IImageStage>;
  private numberOfVisibleThumbs: number;

  constructor(container: HTMLElement, thumbStages: Array<IImageStage>, numberOfVisibleThumbs: number) {
    this.numberOfVisibleThumbs = numberOfVisibleThumbs;
    this.thumbStages = thumbStages;

    this.createScrollerContainer(container);
    this.createScrollerButtons(container);
    DomTools.addCssClass(container, styles.mibreit_ThumbScrollerParentContainer);

    this.reinitSize();
  }

  reinitSize() {
    const thumbSize = this.calculateThumbsize(this.scrollerContainer, this.numberOfVisibleThumbs);
    this.resizeThumbStages(thumbSize);
    this.thumbSizeRem = thumbSize + THUMBSTAGE_MARGIN_REM;
  }

  getThumbSizeRem(): number {
    return this.thumbSizeRem;
  }

  getNumberOfVisibleThumbs(): number {
    return this.numberOfVisibleThumbs;
  }

  getThumbScrollerButtons(): { previousButton: HTMLElement; nextButton: HTMLElement } {
    return { previousButton: this.previousButton, nextButton: this.nextButton };
  }

  getScrollerContainer(): HTMLElement {
    return this.scrollerContainer;
  }

  private createScrollerContainer(container: HTMLElement) {
    const childNodes: Array<Node> = DomTools.getChildNodes(container);
    this.scrollerContainer = DomTools.createElement('div');
    DomTools.addCssClass(this.scrollerContainer, styles.mibreit_ThumbScrollerContainer);
    DomTools.wrapElements(childNodes, this.scrollerContainer);
  }

  private calculateThumbsize(container: HTMLElement, numberOfVisibleThumbs: number): number {
    const oneRemSize = DomTools.getRootFontSize();
    const containerWidthRem = DomTools.getElementDimension(container).width / oneRemSize;  
    const thumbsize = containerWidthRem / numberOfVisibleThumbs - THUMBSTAGE_MARGIN_REM;
    return thumbsize;
  }

  private createScrollerButtons(container: HTMLElement) {
    this.previousButton = DomTools.createElement('div');
    DomTools.setInnerHtml(this.previousButton, nextThumbs);
    DomTools.addCssClass(this.previousButton, styles.mibreit_ThumbScrollerPrevious);
    DomTools.prependChildElement(this.previousButton, container);

    this.nextButton = DomTools.createElement('div');
    DomTools.setInnerHtml(this.nextButton, nextThumbs);
    DomTools.addCssClass(this.nextButton, styles.mibreit_ThumbScrollerNext);
    DomTools.appendChildElement(this.nextButton, container);
  }

  private resizeThumbStages(size: number) {
    this.thumbStages.forEach((thumbStage: IImageStage) => {
      thumbStage.setSize(`${size}rem`, `${size}rem`);
    });
  }
}
