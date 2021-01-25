/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { DomTools } from 'mibreit-dom-tools';
import styles from './ThumbScrollerLayout.module.css';
import nextThumbs from '../images/nextThumbs.svg';
import IImageStage from '../interfaces/IImageStage';
import {THUMBS_BUTTON_WIDTH_REM, THUMBS_MARGIN} from "../constants";

function createScrollerContainer(container: HTMLElement): HTMLElement {
  const childNodes : Array<Node> = DomTools.getChildNodes(container); 
  const scrollerContainer = DomTools.createElement('div');
  DomTools.applyCssClass(scrollerContainer, styles.mibreit_ThumbScrollerContainer);
  DomTools.wrapElements(childNodes, scrollerContainer);
  return scrollerContainer;
}

function createScrollerButtons(container: HTMLElement): { previousButton: HTMLElement; nextButton: HTMLElement } {
  const previousButton = DomTools.createElement('div');
  DomTools.setInnerHtml(previousButton, nextThumbs);
  DomTools.applyCssClass(previousButton, styles.mibreit_ThumbScrollerPrevious);
  DomTools.prependChildElement(previousButton, container);

  const nextButton = DomTools.createElement('div');
  DomTools.setInnerHtml(nextButton, nextThumbs);
  DomTools.applyCssClass(nextButton, styles.mibreit_ThumbScrollerNext);
  DomTools.appendChildElement(nextButton, container);

  return { previousButton, nextButton };
}

function calculateThumbsize(container: HTMLElement, numberOfVisibleThumbs: number, excludeMargin = false) : number
{
  const oneRemSize = DomTools.getRootFontSize();  
  const containerWidthRem = DomTools.getElementDimension(container).width / oneRemSize;  
  // for this calculation to hold, we need to fix the container size
  DomTools.applyCssStyle(container, "width", `${containerWidthRem}rem`);
  const thumbsize = ((containerWidthRem - 2*THUMBS_BUTTON_WIDTH_REM) / numberOfVisibleThumbs) - (excludeMargin ? THUMBS_MARGIN : 0); 
  return thumbsize;
}

function resizeThumbStages(thumbStages: Array<IImageStage>, size: number)
{
  thumbStages.forEach((thumbStage: IImageStage) => {
    thumbStage.setSize(`${size}rem`, `${size}rem`);
  })
}

export type ThumbScrollerLayout = {
  scrollerContainer: HTMLElement;
  previousButton: HTMLElement;
  nextButton: HTMLElement;
  thumbSizeRem: number;
};

export default function (container: HTMLElement, thumbStages: Array<IImageStage>, numberOfVisibleThumbs: number): ThumbScrollerLayout {
  const newThumbSize = calculateThumbsize(container, numberOfVisibleThumbs, true);
  resizeThumbStages(thumbStages, newThumbSize);

  const oldContainerClass = DomTools.getCssClass(container);
  DomTools.applyCssClass(container, `${oldContainerClass} ${styles.mibreit_ThumbScrollerParentContainer}`);

  const scrollerContainer = createScrollerContainer(container);

  const { previousButton, nextButton } = createScrollerButtons(container);

  return {
    scrollerContainer,
    previousButton,
    nextButton,
    thumbSizeRem: (newThumbSize + THUMBS_MARGIN)
  };
}
