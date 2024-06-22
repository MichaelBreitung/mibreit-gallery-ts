/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { LazyLoader } from 'mibreit-lazy-loader';
import { addClickEventListener, addCssClass, addResizeEventListener, appendChildElement, createElement, prependChildElement, setInnerHtml, } from 'mibreit-dom-tools';
import Image from '../components/Image';
import ThumbsViewer from '../components/ThumbsViewer';
import ThumbStage from '../components/ThumbStage';
// Tools
import debounce from '../tools/debounce';
// Styles
import styles from './ThumbsScrollerBuilder.module.css';
// SVGs
import nextThumbs from '../images/nextThumbs.svg';
// constants
import { NUMBER_OF_VISIBLE_THUMBS, RESIZE_DEBOUNCE_TIMER } from '../constants';
export default class ThumbsScrollerBuilder {
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
        Object.defineProperty(this, "_lazyLoader", {
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
        Object.defineProperty(this, "_numberOfThumbs", {
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
        Object.defineProperty(this, "_thumbsViewer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._thumbContainerElement = thumbContainerElement;
        addCssClass(this._thumbContainerElement, styles.thumbs_scroller__parent);
        this._numberOfVisibleThumbs = (config === null || config === void 0 ? void 0 : config.numberOfVisibleThumbs)
            ? config.numberOfVisibleThumbs
            : NUMBER_OF_VISIBLE_THUMBS;
        this._initialIndex = config === null || config === void 0 ? void 0 : config.initialIndex;
        const thumbs = this._createThumbsArray(thumbElements);
        this._numberOfThumbs = thumbs.length;
        this._createThumbStages(thumbs, thumbClickedCallback);
        this._lazyLoader = new LazyLoader(thumbs, this._numberOfVisibleThumbs, this._numberOfVisibleThumbs);
        this._thumbsViewer = this._createThumbsViewer(this._thumbContainerElement, this._lazyLoader, this._initialIndex);
    }
    addPreviousNextButtons() {
        if (this._numberOfVisibleThumbs < this._numberOfThumbs) {
            [this._previousButtonElement, this._nextButtonElement] = this._createPreviousNextButtons(this._thumbContainerElement);
        }
        return this;
    }
    build() {
        this._thumbsViewer.reinitSize();
        if (this._previousButtonElement && this._nextButtonElement) {
            this._addThumbsViewerInteraction(this._thumbsViewer, this._previousButtonElement, this._nextButtonElement);
        }
        if (this._numberOfVisibleThumbs >= this._numberOfThumbs) {
            setTimeout(() => {
                this._lazyLoader.loadElement(0);
                this._lazyLoader.setCurrentIndex(0);
                this._thumbsViewer.setCenterThumb(0);
            }, 0);
        }
        return this._thumbsViewer;
    }
    _createThumbsArray(thumbElements) {
        const thumbs = new Array();
        for (let i = 0; i < thumbElements.length; i++) {
            const image = new Image(thumbElements[i]);
            thumbs.push(image);
        }
        return thumbs;
    }
    _createThumbStages(thumbs, thumbClickedCallback) {
        thumbs.forEach((thumb, index) => {
            const thumbStage = new ThumbStage(thumb.getHtmlElement(), thumb.getWidth(), thumb.getHeight());
            thumb.addWasLoadedCallback(() => {
                thumbStage.reinitSize();
            });
            thumbStage.showImage();
            if (thumbClickedCallback) {
                thumbStage.addStageClickedCallback(() => {
                    thumbClickedCallback(index);
                });
            }
        });
    }
    _createThumbsViewer(thumbContainerElement, loader, initialIndex = 0) {
        const thumbsViewer = new ThumbsViewer(thumbContainerElement, this._numberOfVisibleThumbs);
        thumbsViewer.addScrollIndexChangedCallback((index) => {
            loader.setCurrentIndex(index);
        });
        thumbsViewer.setCenterThumb(initialIndex);
        addResizeEventListener(() => {
            debounce(() => {
                thumbsViewer.reinitSize();
            }, RESIZE_DEBOUNCE_TIMER, false);
        });
        return thumbsViewer;
    }
    _createPreviousNextButtons(container) {
        const previousButton = createElement('div');
        setInnerHtml(previousButton, nextThumbs);
        addCssClass(previousButton, styles.thumbs_scroller__previous_btn);
        prependChildElement(previousButton, container);
        const nextButton = createElement('div');
        setInnerHtml(nextButton, nextThumbs);
        addCssClass(nextButton, styles.thumbs_scroller__next_btn);
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
