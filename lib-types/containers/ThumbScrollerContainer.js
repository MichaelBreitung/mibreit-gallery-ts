/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { createLazyLoader } from 'mibreit-lazy-loader';
import { addClickEventListener } from 'mibreit-dom-tools';
import Image from '../components/Image';
import createThumbScrollerLayout from '../factories/createThumbScrollerLayout';
import ThumbScroller from '../components/ThumbScroller';
const DEFAULT_NUMBER_VISIBLE_THUMBS = 7;
export default class ThumbScrollerContainer {
    constructor(thumbContainer, thumbElements, config, thumbClickedCallback) {
        Object.defineProperty(this, "_thumbScroller", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        const numberVisibleThumbs = (config === null || config === void 0 ? void 0 : config.numberOfVisibleThumbs)
            ? config.numberOfVisibleThumbs
            : DEFAULT_NUMBER_VISIBLE_THUMBS;
        const thumbs = this._prepareThumbs(thumbElements);
        const lazyLoader = createLazyLoader(thumbs, { preloaderBeforeSize: numberVisibleThumbs, preloaderAfterSize: numberVisibleThumbs });
        const layout = createThumbScrollerLayout(thumbContainer, thumbs, numberVisibleThumbs, thumbClickedCallback);
        if (numberVisibleThumbs < thumbs.length) {
            this._thumbScroller = this._prepareThumbScroller(layout, lazyLoader, config === null || config === void 0 ? void 0 : config.initialIndex);
            this._addThumbScrollerInteraction(this._thumbScroller, layout);
        }
        else {
            setTimeout(() => {
                lazyLoader.loadElement(0);
                lazyLoader.setCurrentIndex(0);
            }, 0);
        }
    }
    getScroller() {
        return this._thumbScroller;
    }
    _prepareThumbs(thumbSelector) {
        const thumbs = new Array();
        for (let i = 0; i < thumbSelector.length; i++) {
            const image = new Image(thumbSelector[i]);
            thumbs.push(image);
        }
        return thumbs;
    }
    _prepareThumbScroller(layout, loader, initialIndex = 0) {
        const thumbScroller = new ThumbScroller(layout);
        thumbScroller.addScrollIndexChangedCallback((index) => {
            loader.setCurrentIndex(index);
        });
        thumbScroller.scrollTo(initialIndex);
        return thumbScroller;
    }
    _addThumbScrollerInteraction(thumbScroller, thumbScrollerLayout) {
        const { previousButton, nextButton } = thumbScrollerLayout.getThumbScrollerButtons();
        addClickEventListener(nextButton, () => {
            thumbScroller.scrollNext();
        });
        addClickEventListener(previousButton, () => {
            thumbScroller.scrollPrevious();
        });
    }
}
