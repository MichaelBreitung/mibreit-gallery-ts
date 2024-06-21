/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { LazyLoader } from 'mibreit-lazy-loader';
import { addClickEventListener, addCssClass, appendChildElement, createElement, prependChildElement, setInnerHtml, } from 'mibreit-dom-tools';
import createThumbsWrapper from '../factories/createThumbsWrapper';
import Image from '../components/Image';
import ThumbsViewer from '../components/ThumbsViewer';
// Styles
import styles from './ThumbsScrollerBuilder.module.css';
import nextThumbs from '../images/nextThumbs.svg';
const DEFAULT_NUMBER_VISIBLE_THUMBS = 7;
export default class ThumbScrollerBuilder {
    constructor(thumbContainerElement, thumbElements, config, thumbClickedCallback) {
        Object.defineProperty(this, "_thumbContainerElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_previousButtonElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_nextButtonElement", {
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
        Object.defineProperty(this, "_lazyLoader", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_initialIndex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._thumbContainerElement = thumbContainerElement;
        const numberVisibleThumbs = (config === null || config === void 0 ? void 0 : config.numberOfVisibleThumbs)
            ? config.numberOfVisibleThumbs
            : DEFAULT_NUMBER_VISIBLE_THUMBS;
        this._initialIndex = config === null || config === void 0 ? void 0 : config.initialIndex;
        const thumbs = this._createThumbsArray(thumbElements);
        this._lazyLoader = new LazyLoader(thumbs, numberVisibleThumbs, numberVisibleThumbs);
        this._thumbsWrapper = createThumbsWrapper(thumbContainerElement, thumbs, numberVisibleThumbs, thumbClickedCallback);
    }
    addPreviousNextButtons() {
        if (this._thumbsWrapper.getNumberOfVisibleThumbs() < this._thumbsWrapper.getNumberOfThumbs()) {
            [this._previousButtonElement, this._nextButtonElement] = this._createPreviousNextButtons(this._thumbContainerElement);
        }
        return this;
    }
    build() {
        if (this._thumbsWrapper.getNumberOfVisibleThumbs() < this._thumbsWrapper.getNumberOfThumbs()) {
            const thumbsViewer = this._createThumbsViewer(this._thumbsWrapper, this._lazyLoader, this._initialIndex);
            if (this._previousButtonElement && this._nextButtonElement) {
                this._addThumbsViewerInteraction(thumbsViewer, this._previousButtonElement, this._nextButtonElement);
            }
            return thumbsViewer;
        }
        else {
            setTimeout(() => {
                this._lazyLoader.loadElement(0);
                this._lazyLoader.setCurrentIndex(0);
            }, 0);
            return null;
        }
    }
    _createThumbsArray(thumbElement) {
        const thumbs = new Array();
        for (let i = 0; i < thumbElement.length; i++) {
            const image = new Image(thumbElement[i]);
            thumbs.push(image);
        }
        return thumbs;
    }
    _createThumbsViewer(thumbsWrapper, loader, initialIndex = 0) {
        const thumbsViewer = new ThumbsViewer(thumbsWrapper);
        thumbsViewer.addScrollIndexChangedCallback((index) => {
            loader.setCurrentIndex(index);
        });
        thumbsViewer.setCenterThumb(initialIndex);
        return thumbsViewer;
    }
    _createPreviousNextButtons(container) {
        const previousButton = createElement('div');
        setInnerHtml(previousButton, nextThumbs);
        addCssClass(previousButton, styles.thumbs_container__previous_btn);
        prependChildElement(previousButton, container);
        const nextButton = createElement('div');
        setInnerHtml(nextButton, nextThumbs);
        addCssClass(nextButton, styles.thumbs_container__next_btn);
        appendChildElement(nextButton, container);
        return [previousButton, nextButton];
    }
    _addThumbsViewerInteraction(thumbsViewer, previousButton, nextButton) {
        addClickEventListener(nextButton, () => {
            thumbsViewer.scrollNext();
        });
        addClickEventListener(previousButton, () => {
            thumbsViewer.scrollPrevious();
        });
    }
}
