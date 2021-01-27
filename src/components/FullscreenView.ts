/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { DomTools } from 'mibreit-dom-tools';
import IFullscreenView from '../interfaces/IFullscreenView';
import styles from './FullscreenView.module.css';

const GALLERY_PLACEHOLDER_ID = 'galleryContainerPlaceholder';
const THUMBS_PLACEHOLDER_ID = 'thumbContainerPlaceholder';

export default class FullscreenView implements IFullscreenView {
  private fullscreenActive: boolean;
  private galleryContainer: HTMLElement;
  private thumbContainer?: HTMLElement;
  private fullScreenContainer: HTMLElement | null = null;
  private galleryContainerPlaceholder: HTMLElement | null = null;
  private thumbContainerPlaceholder: HTMLElement | null = null;

  constructor(galleryContainer: HTMLElement, thumbContainer?: HTMLElement) {
    this.fullscreenActive = false;
    this.galleryContainer = galleryContainer;
    this.thumbContainer = thumbContainer;
  }

  activate() {
    if (!this.fullscreenActive) {
      if (this.fullScreenContainer == null) {
        this.createFullscreenContainer();
      }
      this.moveGalleryToFullscreen();
      if (this.thumbContainer) {
        this.moveThumbsToFullscreen();
      }
      this.addFullscreen();
      this.fullscreenActive = true;
    }
  }

  deActivate() {
    if (this.fullscreenActive) {
      this.removeGalleryFromFullscreen();
      if (this.thumbContainer) {
        this.removeThumbsFromFullscreen();
      }
      this.removeFullscreen();
      this.fullscreenActive = false;
    }
  }

  isFullscreenActive() {
    return this.fullscreenActive;
  }

  private createFullscreenContainer() {
    this.fullScreenContainer = DomTools.createElement('div');
    DomTools.addCssClass(this.fullScreenContainer, styles.mibreit_Fullscreen);
    this.galleryContainerPlaceholder = DomTools.createElement('div');
    DomTools.setAttribute(this.galleryContainerPlaceholder, 'id', GALLERY_PLACEHOLDER_ID);
    this.thumbContainerPlaceholder = DomTools.createElement('div');
    DomTools.setAttribute(this.thumbContainerPlaceholder, 'id', THUMBS_PLACEHOLDER_ID);
  }

  private addFullscreen() {
    const body = DomTools.getElement('body');
    DomTools.appendChildElement(this.fullScreenContainer, body);
  }

  private removeFullscreen() {
    DomTools.removeElement(this.fullScreenContainer);
  }

  private moveGalleryToFullscreen() {
    DomTools.prependBeforeChild(this.galleryContainerPlaceholder, this.galleryContainer);
    DomTools.appendChildElement(this.galleryContainer, this.fullScreenContainer);
    DomTools.addCssStyle(this.galleryContainer, 'width', '100%');
    DomTools.addCssStyle(this.galleryContainer, 'flex-grow', '1');
  }

  private removeGalleryFromFullscreen() {
    DomTools.removeElement(this.galleryContainer);
    DomTools.prependBeforeChild(this.galleryContainer, this.galleryContainerPlaceholder);
    DomTools.removeElement(this.galleryContainerPlaceholder);
    DomTools.removeCssStyle(this.galleryContainer, 'width');
    DomTools.removeCssStyle(this.galleryContainer, 'flex-grow');
  }

  private moveThumbsToFullscreen() {
    DomTools.prependBeforeChild(this.thumbContainerPlaceholder, this.thumbContainer);
    DomTools.appendChildElement(this.thumbContainer, this.fullScreenContainer);
    DomTools.addCssStyle(this.thumbContainer, 'flex-grow', '0');
  }

  private removeThumbsFromFullscreen() {
    DomTools.removeElement(this.thumbContainer);
    DomTools.prependBeforeChild(this.thumbContainer, this.thumbContainerPlaceholder);
    DomTools.removeElement(this.thumbContainerPlaceholder);
    DomTools.removeCssStyle(this.thumbContainer, 'flex-grow');
  }
}
