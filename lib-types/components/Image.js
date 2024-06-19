/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { disableContextMenu, disableDragging, overwriteCssStyles } from 'mibreit-dom-tools';
import { Element } from 'mibreit-lazy-loader';
// constants
import { IMAGE_TITLE_ATTRIBUTE, IMAGE_DATA_TITLE_ATTRIBUTE } from '../constants';
export default class Image extends Element {
    constructor(imageHandle) {
        super(imageHandle);
        Object.defineProperty(this, "_title", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        this._prepareTitle(imageHandle);
        this._limitMaxSizeTo(imageHandle, this.getWidth(), this.getHeight());
        disableContextMenu(imageHandle);
        disableDragging(imageHandle);
    }
    getTitle() {
        return this._title;
    }
    getUrl() {
        return this._element.hasAttribute('data-src')
            ? this._element.getAttribute('data-src')
            : this._element.getAttribute('src');
    }
    _limitMaxSizeTo(imageHandle, maxWidth, maxHeight) {
        overwriteCssStyles(imageHandle, `max-width: ${maxWidth}px; max-height: ${maxHeight}px`);
    }
    _prepareTitle(imageHandle) {
        let title = imageHandle.getAttribute(IMAGE_TITLE_ATTRIBUTE);
        if (title) {
            imageHandle.setAttribute(IMAGE_DATA_TITLE_ATTRIBUTE, title);
            imageHandle.removeAttribute(IMAGE_TITLE_ATTRIBUTE);
        }
        else {
            title = imageHandle.getAttribute(IMAGE_DATA_TITLE_ATTRIBUTE);
        }
        this._title = title ? title : '';
    }
}
