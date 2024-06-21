/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { addCssClass, addCssStyle, createElement, getChildNodes, getElementDimension, getRootFontSize, wrapElements, } from 'mibreit-dom-tools';
import styles from './ThumbsWrapper.module.css';
export default class ThumbsWrapper {
    constructor(container, numberOfVisibleThumbs) {
        Object.defineProperty(this, "_wrapper", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_thumbSizeRem", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_thumbs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_numberOfVisibleThumbs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        addCssClass(container, styles.thumbs_wrapper__parent);
        this._numberOfVisibleThumbs = numberOfVisibleThumbs;
        this._thumbs = Array.from(container.children);
        const willThumbsFitContainer = numberOfVisibleThumbs >= this._thumbs.length;
        this._wrapper = this._wrapThumbs(getChildNodes(container), willThumbsFitContainer);
        this._thumbSizeRem = this._calculateThumbsize(this._wrapper, numberOfVisibleThumbs);
        this._resizeThumbs(this._thumbSizeRem);
        console.log('ThumbsWrapper#constructor - thumbSizeRem = ', this.getThumbSizeRem(), ', numberOfThumbs = ', this.getNumberOfThumbs(), ', numberOfVisibleThumbs = ', this.getNumberOfVisibleThumbs());
    }
    reinitSize() {
        this._thumbSizeRem = this._calculateThumbsize(this._wrapper, this._numberOfVisibleThumbs);
        this._resizeThumbs(this._thumbSizeRem);
    }
    getThumbSizeRem() {
        return this._thumbSizeRem;
    }
    getNumberOfVisibleThumbs() {
        return this._numberOfVisibleThumbs;
    }
    getNumberOfThumbs() {
        return this._thumbs.length;
    }
    getElements() {
        return getChildNodes(this._wrapper);
    }
    _wrapThumbs(thumbs, centerThumbs) {
        const wrapper = createElement('div');
        if (centerThumbs) {
            addCssClass(wrapper, styles.thumbs_wrapper__centered);
        }
        else {
            addCssClass(wrapper, styles.thumbs_wrapper);
        }
        wrapElements(thumbs, wrapper);
        return wrapper;
    }
    _calculateThumbsize(container, numberOfVisibleThumbs) {
        const oneRemSize = getRootFontSize();
        const containerWidthRem = getElementDimension(container).width / oneRemSize;
        const thumbsize = containerWidthRem / numberOfVisibleThumbs;
        console.log('ThumbsWrapper#_calculateThumbsize - containerWidthRem: ', containerWidthRem);
        return thumbsize;
    }
    _resizeThumbs(size) {
        const innerSize = size * 0.9;
        const margin = size * 0.05;
        for (let i = 0; i < this._thumbs.length; ++i) {
            addCssStyle(this._thumbs[i], 'width', `${innerSize}rem`);
            addCssStyle(this._thumbs[i], 'height', `${innerSize}rem`);
            addCssStyle(this._thumbs[i], 'margin', `${margin}rem`);
        }
    }
}
