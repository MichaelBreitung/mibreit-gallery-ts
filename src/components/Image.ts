/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { DomTools } from 'mibreit-dom-tools';
import { Element } from 'mibreit-lazy-loader';
import { IMAGE_TITLE_ATTRIBUTE, IMAGE_DATA_TITLE_ATTRIBUTE } from '../constants';
import IImageInfo from '../interfaces/IImageInfo';

export default class Image extends Element implements IImageInfo {
  private title: string;

  constructor(imageHandle: HTMLElement) {
    super(imageHandle);
    if (imageHandle.hasAttribute(IMAGE_TITLE_ATTRIBUTE)) {
      this.removeTitle(imageHandle);
    }
    this.title = imageHandle.getAttribute(IMAGE_DATA_TITLE_ATTRIBUTE);
    this.limitMaxSizeTo(imageHandle, this.getWidth(), this.getHeight());
    DomTools.disableContextMenu(imageHandle);
    DomTools.disableDragging(imageHandle);
  }

  getTitle(): string {
    return this.title;
  }

  getUrl() {
    return this.element.hasAttribute('data-src')
      ? this.element.getAttribute('data-src')
      : this.element.getAttribute('src');
  }

  private limitMaxSizeTo(imageHandle: HTMLElement, maxWidth: number, maxHeight: number): void {
    DomTools.overwriteCssStyles(imageHandle, `max-width: ${maxWidth}px; max-height: ${maxHeight}px`);
  }

  private removeTitle(imageHandle: HTMLElement) {
    imageHandle.setAttribute(IMAGE_DATA_TITLE_ATTRIBUTE, imageHandle.getAttribute(IMAGE_TITLE_ATTRIBUTE));
    imageHandle.removeAttribute(IMAGE_TITLE_ATTRIBUTE);
  }
}
