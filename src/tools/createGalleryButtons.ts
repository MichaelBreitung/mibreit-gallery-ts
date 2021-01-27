/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { DomTools } from 'mibreit-dom-tools';
import styles from './GalleryButtons.module.css';
import nextImage from '../images/nextImage.svg';

function createPreviousNextButtons(container: HTMLElement): { previousButton: HTMLElement; nextButton: HTMLElement } {
  const previousButton = DomTools.createElement('div');
  DomTools.setInnerHtml(previousButton, nextImage);
  DomTools.addCssClass(previousButton, styles.mibreit_GalleryPrevious);
  DomTools.prependChildElement(previousButton, container);

  const nextButton = DomTools.createElement('div');
  DomTools.setInnerHtml(nextButton, nextImage);
  DomTools.addCssClass(nextButton, styles.mibreit_GalleryNext);
  DomTools.appendChildElement(nextButton, container);

  return { previousButton, nextButton };
}

export type GalleryButtons = {
  previousButton: HTMLElement;
  nextButton: HTMLElement;
};

export default function (container: HTMLElement): GalleryButtons {
  const { previousButton, nextButton } = createPreviousNextButtons(container);

  return {
    previousButton,
    nextButton,
  };
}
