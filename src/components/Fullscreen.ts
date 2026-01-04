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
import IFullscreen from '../interfaces/IFullscreen';

// Styles
import styles from './Fullscreen.module.css';

// SVGs
import fullscreenClose from '../images/close.svg';

export default class Fullscreen implements IFullscreen {
  private _changedCallbacks: Array<(active: boolean) => void> = [];
  private _active: boolean;
  private _slideshowContainerElement: HTMLElement;
  private _fullScreenContainerElement: HTMLElement;
  private _slideshowContainerPlaceholderElement: HTMLElement;
  private _closeButtonElement: HTMLElement;

  constructor(slideshowContainer: HTMLElement) {
    this._active = false;
    this._slideshowContainerElement = slideshowContainer;
    this._fullScreenContainerElement = this._createFullscreenContainer();
    this._closeButtonElement = this._createFullscreenCloseButton(this._fullScreenContainerElement);
    this._slideshowContainerPlaceholderElement = this._createSlideshowContainerPlaceholder();
  }

  activate() {
    if (!this._active) {
      this._moveGalleryToFullscreen();
      this._addFullscreen();
      this._setupCloseButtonHandler();
      this._active = true;
      this._changedCallbacks.forEach((callback) => {
        callback(true);
      });
    }
  }

  deActivate() {
    if (this._active) {
      this._removeGalleryFromFullscreen();
      this._removeFullscreen();
      this._active = false;
      this._changedCallbacks.forEach((callback) => {
        callback(false);
      });
    }
  }

  addChangedCallback(callback: (active: boolean) => void) {
    if (!this._changedCallbacks.includes(callback)) {
      this._changedCallbacks.push(callback);
    }
  }

  isActive(): boolean {
    return this._active;
  }

  setBackgroundColor(color: string): void {
    addCssStyle(this._fullScreenContainerElement, 'background-color', color);
  }

  setAverageBackgroundColor(): void {
    addCssClass(this._fullScreenContainerElement, styles.average_background);
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

  private _addFullscreen() {
    const body = getElement('body');
    if (body != null) {
      appendChildElement(this._fullScreenContainerElement, body);
    }
  }

  private _removeFullscreen() {
    removeElement(this._fullScreenContainerElement);
  }

  private _moveGalleryToFullscreen() {
    prependBeforeChild(this._slideshowContainerPlaceholderElement, this._slideshowContainerElement);
    appendChildElement(this._slideshowContainerElement, this._fullScreenContainerElement);
    addCssStyle(this._slideshowContainerElement, 'width', '100%');
    addCssStyle(this._slideshowContainerElement, 'flex-grow', '1');
  }

  private _removeGalleryFromFullscreen() {
    removeElement(this._slideshowContainerElement);
    prependBeforeChild(this._slideshowContainerElement, this._slideshowContainerPlaceholderElement);
    removeElement(this._slideshowContainerPlaceholderElement);
    removeCssStyle(this._slideshowContainerElement, 'width');
    removeCssStyle(this._slideshowContainerElement, 'flex-grow');
  }

  private _setupCloseButtonHandler() {
    addClickEventListener(this._closeButtonElement, (event: MouseEvent | undefined) => {
      event?.stopPropagation();
      if (this._active) {
        this.deActivate();
      }
    });
  }
}
