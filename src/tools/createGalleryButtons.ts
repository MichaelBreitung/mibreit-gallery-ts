/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import DomTools from '../tools/domTools';
import styles from './GalleryButtons.module.css';
import nextImage from '../images/nextImage.svg';

function createPreviousNextButtons(container: HTMLElement): { previousButton: HTMLElement; nextButton: HTMLElement } {
  const previousButton = DomTools.createElement('div');
  DomTools.setInnerHtml(nextImage, previousButton);
  DomTools.applyCssClass(previousButton, styles.mibreit_GalleryPrevious);
  DomTools.prependChildElement(previousButton, container);

  const nextButton = DomTools.createElement('div');
  DomTools.setInnerHtml(nextImage, nextButton);
  DomTools.applyCssClass(nextButton, styles.mibreit_GalleryNext);
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
