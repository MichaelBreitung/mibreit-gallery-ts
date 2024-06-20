/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import {
  addClickEventListener,
  addCssClass,
  addCssStyle,
  appendChildElement,
  createElement,
  getElement,
  prependBeforeChild,
  removeCssStyle,
  removeElement,
  setInnerHtml,
} from 'mibreit-dom-tools';
import IFullscreen from '../interfaces/IFullscreenContainer';

// Styles
import styles from './FullscreenContainer.module.css';

// SVGs
import fullscreenClose from '../images/close.svg';

export type FullscreenConfig = {
  slideshowContainerSelector: string;
  thumbsContainerSelector: string;
};

export default class FullscreenContainer implements IFullscreen {
  private _fullscreenChangedCallbacks: Array<(active: boolean) => void> = [];
  private _fullscreenActive: boolean;
  private _slideshowContainer: HTMLElement;
  private _thumbsContainer: HTMLElement | null = null;
  private _fullScreenContainer: HTMLElement;
  private _slideshowContainerPlaceholder: HTMLElement;
  private _thumbsContainerPlaceholder: HTMLElement | null = null;
  private _fullScreenCloseButton: HTMLElement;
  private _usePlaceholder: boolean;

  constructor(
    slideshowContainer: HTMLElement,
    thumbsContainer: HTMLElement | null = null,
    usePlaceholder: boolean = true
  ) {
    this._fullscreenActive = false;
    this._slideshowContainer = slideshowContainer;
    this._thumbsContainer = thumbsContainer;
    this._usePlaceholder = usePlaceholder;
    this._fullScreenContainer = this._createFullscreenContainer();
    this._fullScreenCloseButton = this._createFullscreenCloseButton(this._fullScreenContainer);
    this._slideshowContainerPlaceholder = this._createSlideshowContainerPlaceholder();
    if (thumbsContainer) {
      this._thumbsContainerPlaceholder = this._createThumbsContainerPlaceholder();
    }
  }

  activate() {
    if (!this._fullscreenActive) {
      this._moveGalleryToFullscreen();
      this._moveThumbsToFullscreen();
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
      this._removeThumbsFromFullscreen();
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

  isFullscreenActive(): boolean {
    return this._fullscreenActive;
  }

  setBackgroundColor(color: string): void {
    addCssStyle(this._fullScreenContainer, 'background-color', color);
  }

  private _createFullscreenContainer(): HTMLElement {
    const fullScreenContainer = createElement('div');
    addCssClass(fullScreenContainer, styles.fullscreen);
    return fullScreenContainer;
  }

  private _createFullscreenCloseButton(fullScreenContainer: HTMLElement): HTMLElement {
    const fullScreenCloseButton = createElement('div');
    setInnerHtml(fullScreenCloseButton, fullscreenClose);
    addCssClass(fullScreenCloseButton, styles.fullscreen__exit_btn);
    appendChildElement(fullScreenCloseButton, fullScreenContainer);
    return fullScreenCloseButton;
  }

  private _createSlideshowContainerPlaceholder(): HTMLElement {
    const slideshowContainerPlaceholder = createElement('div');
    return slideshowContainerPlaceholder;
  }

  private _createThumbsContainerPlaceholder(): HTMLElement {
    const thumbsContainerPlaceholder = createElement('div');
    return thumbsContainerPlaceholder;
  }

  private _addFullscreen() {
    const body = getElement('body');
    if (body != null) {
      appendChildElement(this._fullScreenContainer, body);
    }
  }

  private _removeFullscreen() {
    removeElement(this._fullScreenContainer);
  }

  private _moveGalleryToFullscreen() {
    if (this._usePlaceholder) {
      prependBeforeChild(this._slideshowContainerPlaceholder, this._slideshowContainer);
    }
    appendChildElement(this._slideshowContainer, this._fullScreenContainer);
    addCssStyle(this._slideshowContainer, 'width', '100%');
    addCssStyle(this._slideshowContainer, 'flex-grow', '1');
  }

  private _removeGalleryFromFullscreen() {
    removeElement(this._slideshowContainer);
    if (this._usePlaceholder) {
      prependBeforeChild(this._slideshowContainer, this._slideshowContainerPlaceholder);
      removeElement(this._slideshowContainerPlaceholder);
    }
    removeCssStyle(this._slideshowContainer, 'width');
    removeCssStyle(this._slideshowContainer, 'flex-grow');
  }

  private _moveThumbsToFullscreen() {
    if (this._thumbsContainer && this._thumbsContainerPlaceholder) {
      if (this._usePlaceholder) {
        prependBeforeChild(this._thumbsContainerPlaceholder, this._thumbsContainer);
      }
      appendChildElement(this._thumbsContainer, this._fullScreenContainer);
      addCssStyle(this._thumbsContainer, 'flex-grow', '0');
    }
  }

  private _removeThumbsFromFullscreen() {
    if (this._thumbsContainer && this._thumbsContainerPlaceholder) {
      removeElement(this._thumbsContainer);
      if (this._usePlaceholder) {
        prependBeforeChild(this._thumbsContainer, this._thumbsContainerPlaceholder);
        removeElement(this._thumbsContainerPlaceholder);
      }
      removeCssStyle(this._thumbsContainer, 'flex-grow');
    }
  }

  private _setupCloseButtonHandler() {
    addClickEventListener(this._fullScreenCloseButton, (event: MouseEvent | undefined) => {
      event?.stopPropagation();
      if (this._fullscreenActive) {
        this.deActivate();
      }
    });
  }
}
