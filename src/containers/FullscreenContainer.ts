/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { DomTools } from 'mibreit-dom-tools';
import IFullscreen from '../interfaces/IFullscreen';
import styles from './FullscreenContainer.module.css';
import fullscreenClose from '../images/close.svg';

const GALLERY_PLACEHOLDER_ID = 'slideshowContainerPlaceholder';
const THUMBS_PLACEHOLDER_ID = 'thumbContainerPlaceholder';

export type FullscreenConfig = {
  slideshowContainerSelector: string;
  thumbContainerSelector: string;  
};

export default class FullscreenContainer implements IFullscreen {
  private _fullscreenChangedCallbacks: Array<(active: boolean) => void> = [];
  private _fullscreenActive: boolean;
  private _slideshowContainer: HTMLElement;
  private _thumbContainer: HTMLElement | null;
  private _fullScreenContainer: HTMLElement | null = null;
  private _slideshowContainerPlaceholder: HTMLElement | null = null;
  private _thumbContainerPlaceholder: HTMLElement | null = null;
  private _fullScreenCloseButton: HTMLElement | null = null;
  private _usePlaceholder: boolean;

  constructor(slideshowContainer: HTMLElement, thumbContainer: HTMLElement = null, usePlaceholder: boolean = true) {
    this._fullscreenActive = false;
    this._slideshowContainer = slideshowContainer;
    this._thumbContainer = thumbContainer;
    this._usePlaceholder = usePlaceholder;
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
      this._setupCloseButtonHandler();
      this._fullscreenActive = true;
      this._fullscreenChangedCallbacks.forEach((callback) => {
        callback(true);
      });
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
      this._fullscreenChangedCallbacks.forEach((callback) => {
        callback(false);
      });
    }
  }

  addFullscreenChangedCallback(callback: (active: boolean) => void) {
    if (!this._fullscreenChangedCallbacks.includes(callback)) {
      this._fullscreenChangedCallbacks.push(callback);
    }
  }

  isFullscreenActive() {
    return this._fullscreenActive;
  }

  private _createFullscreenContainer() {
    this._fullScreenContainer = DomTools.createElement('div');
    DomTools.addCssClass(this._fullScreenContainer, styles.mibreit_Fullscreen);
    this._slideshowContainerPlaceholder = DomTools.createElement('div');
    DomTools.setAttribute(this._slideshowContainerPlaceholder, 'id', GALLERY_PLACEHOLDER_ID);
    this._thumbContainerPlaceholder = DomTools.createElement('div');
    DomTools.setAttribute(this._thumbContainerPlaceholder, 'id', THUMBS_PLACEHOLDER_ID);
    this._fullScreenCloseButton = DomTools.createElement('div');
    DomTools.setInnerHtml(this._fullScreenCloseButton, fullscreenClose);
    DomTools.addCssClass(this._fullScreenCloseButton, styles.mibreit_Fullscreen_exit);
    DomTools.appendChildElement(this._fullScreenCloseButton, this._fullScreenContainer);
  }

  private _addFullscreen() {
    const body = DomTools.getElement('body');
    DomTools.appendChildElement(this._fullScreenContainer, body);
  }

  private _removeFullscreen() {
    DomTools.removeElement(this._fullScreenContainer);
  }

  private _moveGalleryToFullscreen() {
    if (this._usePlaceholder) {
      DomTools.prependBeforeChild(this._slideshowContainerPlaceholder, this._slideshowContainer);
    }
    DomTools.appendChildElement(this._slideshowContainer, this._fullScreenContainer);
    DomTools.addCssStyle(this._slideshowContainer, 'width', '100%');
    DomTools.addCssStyle(this._slideshowContainer, 'flex-grow', '1');
  }

  private _removeGalleryFromFullscreen() {
    DomTools.removeElement(this._slideshowContainer);
    if (this._usePlaceholder) {
      DomTools.prependBeforeChild(this._slideshowContainer, this._slideshowContainerPlaceholder);
      DomTools.removeElement(this._slideshowContainerPlaceholder);
    }
    DomTools.removeCssStyle(this._slideshowContainer, 'width');
    DomTools.removeCssStyle(this._slideshowContainer, 'flex-grow');
  }

  private _moveThumbsToFullscreen() {
    if (this._usePlaceholder) {
      DomTools.prependBeforeChild(this._thumbContainerPlaceholder, this._thumbContainer);
    }
    DomTools.appendChildElement(this._thumbContainer, this._fullScreenContainer);
    DomTools.addCssStyle(this._thumbContainer, 'flex-grow', '0');
  }

  private _removeThumbsFromFullscreen() {
    DomTools.removeElement(this._thumbContainer);
    if (this._usePlaceholder) {
      DomTools.prependBeforeChild(this._thumbContainer, this._thumbContainerPlaceholder);
      DomTools.removeElement(this._thumbContainerPlaceholder);
    }
    DomTools.removeCssStyle(this._thumbContainer, 'flex-grow');
  }

  private _setupCloseButtonHandler() {
    DomTools.addClickEventListener(this._fullScreenCloseButton, (event: MouseEvent) => {
      event.stopPropagation();
      if (this._fullscreenActive) {
        this.deActivate();
      }
    });
  }
}
