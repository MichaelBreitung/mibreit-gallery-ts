/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { addCssClass, addCssStyle, createElement, getChildNodes, getElementDimension, getRootFontSize, wrapElements, } from 'mibreit-dom-tools';
import HorizontalScroller from './HorizontalScroller';
// styles
import styles from './ThumbsViewer.module.css';
export default class ThumbsViewer {
    constructor(container, numberOfVisibleThumbs) {
        Object.defineProperty(this, "_scroller", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "_wrapperElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_thumbElements", {
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
        Object.defineProperty(this, "_numberOfVisibleThumbs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_scrollIndexChangedCallbacks", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Array()
        });
        Object.defineProperty(this, "_currentScrollIndex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        this._numberOfVisibleThumbs = numberOfVisibleThumbs;
        this._thumbElements = Array.from(container.children);
        this._wrapperElement = this._wrapThumbs(getChildNodes(container), numberOfVisibleThumbs, this._thumbElements.length);
        this._thumbSizeRem = this._calculateThumbsize(this._wrapperElement, numberOfVisibleThumbs);
        this._resizeThumbs(this._thumbElements, this._thumbSizeRem);
        console.log('ThumbsViewer#constructor - thumbSizeRem = ', this._thumbSizeRem, ', numberOfThumbs = ', this._thumbElements.length, ', numberOfVisibleThumbs = ', this._numberOfVisibleThumbs);
        if (this._numberOfVisibleThumbs < this._thumbElements.length) {
            this._scroller = new HorizontalScroller(this._thumbElements);
        }
    }
    reinitSize() {
        this._thumbSizeRem = this._calculateThumbsize(this._wrapperElement, this._numberOfVisibleThumbs);
        this._resizeThumbs(this._thumbElements, this._thumbSizeRem);
        this.setCenterThumb(this._currentScrollIndex, false);
    }
    setCenterThumb(index, useCenterIndex = true) {
        if (this._scroller) {
            let newIndex = index;
            if (useCenterIndex) {
                newIndex -= Math.floor(this._numberOfVisibleThumbs / 2);
            }
            const normalizedIndex = this._normalizeIndex(newIndex);
            console.log(`ThumbsViewer#setCenterThumb - index: ${index}, newIndex: ${newIndex}, normalizedIndex: ${normalizedIndex}`);
            this._currentScrollIndex = normalizedIndex;
            const currentScrollPosition = -normalizedIndex * this._thumbSizeRem;
            this._scroller.scrollTo(currentScrollPosition, true);
            this._scrollIndexChangedCallbacks.forEach((callback) => {
                callback(this._currentScrollIndex);
            });
        }
    }
    scrollNext() {
        let newIndex = this._currentScrollIndex + this._numberOfVisibleThumbs;
        const maxPos = this._thumbElements.length - this._numberOfVisibleThumbs;
        if (this._currentScrollIndex === maxPos) {
            newIndex = 0;
        }
        else if (newIndex >= maxPos) {
            newIndex = maxPos;
        }
        this.setCenterThumb(newIndex, false);
    }
    scrollPrevious() {
        let newIndex = this._currentScrollIndex - this._numberOfVisibleThumbs;
        const maxPos = this._thumbElements.length - this._numberOfVisibleThumbs;
        if (this._currentScrollIndex === 0) {
            newIndex = maxPos;
        }
        else if (newIndex < 0) {
            newIndex = 0;
        }
        this.setCenterThumb(newIndex, false);
    }
    addScrollIndexChangedCallback(callback) {
        if (!this._scrollIndexChangedCallbacks.includes(callback)) {
            this._scrollIndexChangedCallbacks.push(callback);
        }
    }
    _normalizeIndex(index) {
        const maxPos = this._thumbElements.length - this._numberOfVisibleThumbs;
        if (index >= maxPos) {
            return maxPos;
        }
        else if (index < 0) {
            return 0;
        }
        else {
            return index;
        }
    }
    _wrapThumbs(thumbs, numberOfVisibleThumbs, numberOfThumbs) {
        const wrapper = createElement('div');
        if (numberOfVisibleThumbs >= numberOfThumbs) {
            addCssClass(wrapper, styles.thumbs_viewer__centered);
        }
        else {
            addCssClass(wrapper, styles.thumbs_viewer);
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
    _resizeThumbs(thumbElements, size) {
        const innerSize = size * 0.9;
        const margin = size * 0.05;
        for (let i = 0; i < thumbElements.length; ++i) {
            addCssStyle(thumbElements[i], 'width', `${innerSize}rem`);
            addCssStyle(thumbElements[i], 'height', `${innerSize}rem`);
            addCssStyle(thumbElements[i], 'margin', `${margin}rem`);
        }
    }
}
