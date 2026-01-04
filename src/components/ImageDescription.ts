/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import {
  addCssClass,
  appendChildElement,
  createElement,
  removeCssClass,
  setInnerHtml,
  addEventListener,
} from 'mibreit-dom-tools';

// interfaces
import IImageDescription from '../interfaces/IImageDescription';

// SVGs
import closeImage from '../images/close.svg';

// styles
import styles from './ImageDescription.module.css';

export default class ImageDescription implements IImageDescription {
  private _changedCallbacks: Array<(active: boolean) => void> = [];
  private _descriptionHandle: HTMLElement;
  private _descriptionTextHandle: HTMLElement;

  constructor(descriptionHandle?: HTMLElement) {
    if (descriptionHandle) {
      this._descriptionHandle = descriptionHandle;
      let pHandle = descriptionHandle.querySelector('p') as HTMLElement;
      if (!pHandle) {
        const text = descriptionHandle.textContent?.trim() ?? '';
        pHandle = createElement('p');
        pHandle.textContent = text;
        descriptionHandle.innerHTML = '';
        appendChildElement(pHandle, this._descriptionHandle);
      }
      this._descriptionTextHandle = pHandle;
    } else {
      this._descriptionHandle = createElement('div');
      this._descriptionTextHandle = createElement('p');
      appendChildElement(this._descriptionTextHandle, this._descriptionHandle);
    }
    addCssClass(this._descriptionHandle, styles.img_description);
    const closeButton = this._createCloseButton(this._descriptionHandle);
    this._setupCloseButtonHandler(closeButton);
  }

  public show() {
    addCssClass(this._descriptionHandle, styles.visible);
    this._changedCallbacks.forEach((callback) => {
      callback(true);
    });
  }

  public hide() {
    removeCssClass(this._descriptionHandle, styles.visible);
    this._changedCallbacks.forEach((callback) => {
      callback(false);
    });
  }

  public getDescriptionHandle(): HTMLElement {
    return this._descriptionHandle;
  }

  public updateDescription(description: string) {
    setInnerHtml(this._descriptionTextHandle, description);
  }

  addChangedCallback(callback: (visible: boolean) => void) {
    if (!this._changedCallbacks.includes(callback)) {
      this._changedCallbacks.push(callback);
    }
  }

  private _createCloseButton(container: HTMLElement): HTMLElement {
    const closeButton = createElement('div');
    setInnerHtml(closeButton, closeImage);
    addCssClass(closeButton, styles.img_description__exit_btn);
    appendChildElement(closeButton, container);
    return closeButton;
  }

  private _setupCloseButtonHandler(closeButton: HTMLElement) {
    addEventListener(closeButton, 'pointerdown', (event: PointerEvent) => {
      event.stopPropagation();
    });
    addEventListener(closeButton, 'pointerup', (event: PointerEvent) => {
      event.stopPropagation();
      this.hide();
    });
  }
}
