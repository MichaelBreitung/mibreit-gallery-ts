/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { disableContextMenu, disableDragging, overwriteCssStyles } from 'mibreit-dom-tools';
import { Element } from 'mibreit-lazy-loader';

// interfaces
import IImageInfo from '../interfaces/IImageInfo';

// constants
import { IMAGE_TITLE_ATTRIBUTE, IMAGE_DESCRIPTION_ATTRIBUTE, IMAGE_DATA_TITLE_ATTRIBUTE } from '../constants';

export default class Image extends Element implements IImageInfo {
  private _title: string = '';
  private _description: string = '';

  constructor(imageHandle: HTMLElement) {
    super(imageHandle);
    this._prepareTitle(imageHandle);
    this._prepareDescription(imageHandle);
    this._limitMaxSizeTo(imageHandle, this.getWidth(), this.getHeight());
    disableContextMenu(imageHandle);
    disableDragging(imageHandle);
  }

  getTitle(): string {
    return this._title;
  }

  getDescription(): string {
    return this._description;
  }

  getUrl() {
    return this._element.hasAttribute('data-src')
      ? this._element.getAttribute('data-src')
      : this._element.getAttribute('src');
  }

  private _limitMaxSizeTo(imageHandle: HTMLElement, maxWidth: number, maxHeight: number): void {
    overwriteCssStyles(imageHandle, `max-width: ${maxWidth}px; max-height: ${maxHeight}px`);
  }

  private _prepareTitle(imageHandle: HTMLElement) {
    let title = imageHandle.getAttribute(IMAGE_TITLE_ATTRIBUTE);
    if (title) {
      imageHandle.setAttribute(IMAGE_DATA_TITLE_ATTRIBUTE, title);
      imageHandle.removeAttribute(IMAGE_TITLE_ATTRIBUTE);
    } else {
      title = imageHandle.getAttribute(IMAGE_DATA_TITLE_ATTRIBUTE);
    }
    this._title = title ?? '';
  }

  private _prepareDescription(imageHandle: HTMLElement) {
    let description = imageHandle.getAttribute(IMAGE_DESCRIPTION_ATTRIBUTE);
    this._description = description ?? '';
  }
}
