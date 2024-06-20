/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import HorizontalScroller from './HorizontalScroller';
export default class ThumbsViewer {
    constructor(layout) {
        Object.defineProperty(this, "_scroller", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_thumbsWrapper", {
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
        this._thumbsWrapper = layout;
        this._scroller = new HorizontalScroller(layout.getElements());
        console.log('ThumbsViewer#constructor - thumbSizeRem = ', this._thumbsWrapper.getThumbSizeRem(), ', numberOfThumbs = ', this._thumbsWrapper.getNumberOfThumbs(), ', numberOfVisibleThumbs = ', this._thumbsWrapper.getNumberOfVisibleThumbs());
    }
    reinitSize() {
        this._thumbsWrapper.reinitSize();
        this.setCenterThumb(this._currentScrollIndex, false);
    }
    setCenterThumb(index, useCenterIndex = true) {
        let newIndex = index;
        if (useCenterIndex) {
            newIndex -= Math.floor(this._thumbsWrapper.getNumberOfVisibleThumbs() / 2);
        }
        const normalizedIndex = this._normalizeIndex(newIndex);
        console.log('ThumbsViewer#setCenterThumb', newIndex, normalizedIndex);
        this._currentScrollIndex = normalizedIndex;
        const currentScrollPosition = -normalizedIndex * this._thumbsWrapper.getThumbSizeRem();
        this._scroller.scrollTo(currentScrollPosition, true);
        this._scrollIndexChangedCallbacks.forEach((callback) => {
            callback(this._currentScrollIndex);
        });
    }
    scrollNext() {
        let newIndex = this._currentScrollIndex + this._thumbsWrapper.getNumberOfVisibleThumbs();
        const maxPos = this._thumbsWrapper.getNumberOfThumbs() - this._thumbsWrapper.getNumberOfVisibleThumbs();
        if (this._currentScrollIndex === maxPos) {
            newIndex = 0;
        }
        else if (newIndex >= maxPos) {
            newIndex = maxPos;
        }
        this.setCenterThumb(newIndex, false);
    }
    scrollPrevious() {
        let newIndex = this._currentScrollIndex - this._thumbsWrapper.getNumberOfVisibleThumbs();
        const maxPos = this._thumbsWrapper.getNumberOfThumbs() - this._thumbsWrapper.getNumberOfVisibleThumbs();
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
        const maxPos = this._thumbsWrapper.getNumberOfThumbs() - this._thumbsWrapper.getNumberOfVisibleThumbs();
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
}
