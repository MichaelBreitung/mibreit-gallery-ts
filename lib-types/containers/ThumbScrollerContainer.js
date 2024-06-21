/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { LazyLoader } from 'mibreit-lazy-loader';
import { addClickEventListener } from 'mibreit-dom-tools';
import createThumbsWrapper from '../factories/createThumbsWrapper';
import Image from '../components/Image';
import ThumbsViewer from '../components/ThumbsViewer';
const DEFAULT_NUMBER_VISIBLE_THUMBS = 7;
export default class ThumbScrollerContainer {
    constructor(thumbContainer, thumbElements, config, thumbClickedCallback) {
        Object.defineProperty(this, "_thumbsViewer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        const numberVisibleThumbs = (config === null || config === void 0 ? void 0 : config.numberOfVisibleThumbs)
            ? config.numberOfVisibleThumbs
            : DEFAULT_NUMBER_VISIBLE_THUMBS;
        const thumbs = this._prepareThumbs(thumbElements);
        const lazyLoader = new LazyLoader(thumbs, numberVisibleThumbs, numberVisibleThumbs);
        const thumbsWrapper = createThumbsWrapper(thumbContainer, thumbs, numberVisibleThumbs, thumbClickedCallback);
        if (numberVisibleThumbs < thumbs.length) {
            this._thumbsViewer = this._prepareThumbsViewer(thumbsWrapper, lazyLoader, config === null || config === void 0 ? void 0 : config.initialIndex);
            this._addThumbsViewerInteraction(this._thumbsViewer, thumbsWrapper);
        }
        else {
            setTimeout(() => {
                lazyLoader.loadElement(0);
                lazyLoader.setCurrentIndex(0);
            }, 0);
        }
    }
    getThumbsViewer() {
        return this._thumbsViewer;
    }
    _prepareThumbs(thumbElement) {
        const thumbs = new Array();
        for (let i = 0; i < thumbElement.length; i++) {
            const image = new Image(thumbElement[i]);
            thumbs.push(image);
        }
        return thumbs;
    }
    _prepareThumbsViewer(thumbsWrapper, loader, initialIndex = 0) {
        const thumbsViewer = new ThumbsViewer(thumbsWrapper);
        thumbsViewer.addScrollIndexChangedCallback((index) => {
            loader.setCurrentIndex(index);
        });
        thumbsViewer.setCenterThumb(initialIndex);
        return thumbsViewer;
    }
    _addThumbsViewerInteraction(thumbsViewer, thumbsWrapper) {
        const { previousButton, nextButton } = thumbsWrapper.getThumbScrollerButtons();
        addClickEventListener(nextButton, () => {
            thumbsViewer.scrollNext();
        });
        addClickEventListener(previousButton, () => {
            thumbsViewer.scrollPrevious();
        });
    }
}
