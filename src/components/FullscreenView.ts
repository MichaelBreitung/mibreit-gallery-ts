/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import DomTools from '../tools/domTools';
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
      this.insertPlaceholders();
      const body = DomTools.getElement('body');
      DomTools.appendChildElement(this.fullScreenContainer, body);
      this.fullscreenActive = true;
    }
  }

  deActivate() {
    if (this.fullscreenActive) {
      const body = DomTools.getElement('body');
      DomTools.removeChildElement(this.fullScreenContainer, body);
      this.fullscreenActive = false;
      this.removePlaceholders();
    }
  }

  isFullscreenActive() {
    return this.fullscreenActive;
  }

  private createFullscreenContainer() {
    this.fullScreenContainer = DomTools.createElement('div');
    DomTools.applyCssClass(this.fullScreenContainer, styles.mibreit_Fullscreen);
    this.galleryContainerPlaceholder = DomTools.createElement('div');
    DomTools.setAttribute(this.galleryContainerPlaceholder, 'id', GALLERY_PLACEHOLDER_ID);
    this.thumbContainerPlaceholder = DomTools.createElement('div');
    DomTools.setAttribute(this.thumbContainerPlaceholder, 'id', THUMBS_PLACEHOLDER_ID);
  }

  private insertPlaceholders() {
    DomTools.prependBeforeChild(this.galleryContainerPlaceholder, this.galleryContainer);
    if (this.thumbContainer) {
      DomTools.prependBeforeChild(this.thumbContainerPlaceholder, this.thumbContainer);
    }
  }

  private removePlaceholders() {
    DomTools.removeChildElement(this.galleryContainerPlaceholder);
    if (this.thumbContainer) {
      DomTools.removeChildElement(this.thumbContainerPlaceholder);
    }
  }
}
