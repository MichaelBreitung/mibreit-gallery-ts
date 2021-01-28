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
  private _fullscreenActive: boolean;
  private _galleryContainer: HTMLElement;
  private _thumbContainer?: HTMLElement;
  private _fullScreenContainer: HTMLElement | null = null;
  private _galleryContainerPlaceholder: HTMLElement | null = null;
  private _thumbContainerPlaceholder: HTMLElement | null = null;

  constructor(galleryContainer: HTMLElement, thumbContainer?: HTMLElement) {
    this._fullscreenActive = false;
    this._galleryContainer = galleryContainer;
    this._thumbContainer = thumbContainer;
  }

  activate() {
    if (!this._fullscreenActive) {
      if (this._fullScreenContainer == null) {
        this._createFullscreenContainer();
      }
      this._moveGalleryToFullscreen();
      if (this._thumbContainer) {
        this._moveThumbsToFullscreen();
      }
      this._addFullscreen();
      this._fullscreenActive = true;
    }
  }

  deActivate() {
    if (this._fullscreenActive) {
      this._removeGalleryFromFullscreen();
      if (this._thumbContainer) {
        this._removeThumbsFromFullscreen();
      }
      this._removeFullscreen();
      this._fullscreenActive = false;
    }
  }

  isFullscreenActive() {
    return this._fullscreenActive;
  }

  private _createFullscreenContainer() {
    this._fullScreenContainer = DomTools.createElement('div');
    DomTools.addCssClass(this._fullScreenContainer, styles.mibreit_Fullscreen);
    this._galleryContainerPlaceholder = DomTools.createElement('div');
    DomTools.setAttribute(this._galleryContainerPlaceholder, 'id', GALLERY_PLACEHOLDER_ID);
    this._thumbContainerPlaceholder = DomTools.createElement('div');
    DomTools.setAttribute(this._thumbContainerPlaceholder, 'id', THUMBS_PLACEHOLDER_ID);
  }

  private _addFullscreen() {
    const body = DomTools.getElement('body');
    DomTools.appendChildElement(this._fullScreenContainer, body);
  }

  private _removeFullscreen() {
    DomTools.removeElement(this._fullScreenContainer);
  }

  private _moveGalleryToFullscreen() {
    DomTools.prependBeforeChild(this._galleryContainerPlaceholder, this._galleryContainer);
    DomTools.appendChildElement(this._galleryContainer, this._fullScreenContainer);
    DomTools.addCssStyle(this._galleryContainer, 'width', '100%');
    DomTools.addCssStyle(this._galleryContainer, 'flex-grow', '1');
  }

  private _removeGalleryFromFullscreen() {
    DomTools.removeElement(this._galleryContainer);
    DomTools.prependBeforeChild(this._galleryContainer, this._galleryContainerPlaceholder);
    DomTools.removeElement(this._galleryContainerPlaceholder);
    DomTools.removeCssStyle(this._galleryContainer, 'width');
    DomTools.removeCssStyle(this._galleryContainer, 'flex-grow');
  }

  private _moveThumbsToFullscreen() {
    DomTools.prependBeforeChild(this._thumbContainerPlaceholder, this._thumbContainer);
    DomTools.appendChildElement(this._thumbContainer, this._fullScreenContainer);
    DomTools.addCssStyle(this._thumbContainer, 'flex-grow', '0');
  }

  private _removeThumbsFromFullscreen() {
    DomTools.removeElement(this._thumbContainer);
    DomTools.prependBeforeChild(this._thumbContainer, this._thumbContainerPlaceholder);
    DomTools.removeElement(this._thumbContainerPlaceholder);
    DomTools.removeCssStyle(this._thumbContainer, 'flex-grow');
  }
}
