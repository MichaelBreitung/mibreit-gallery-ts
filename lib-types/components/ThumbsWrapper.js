/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { addCssClass, addCssStyle, appendChildElement, createElement, getChildNodes, getElementDimension, getRootFontSize, prependChildElement, setInnerHtml, wrapElements, } from 'mibreit-dom-tools';
import styles from './ThumbsWrapper.module.css';
import nextThumbs from '../images/nextThumbs.svg';
export default class ThumbsWrapper {
    constructor(container, thumbStages, numberOfVisibleThumbs) {
        Object.defineProperty(this, "_wrapper", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_previousButton", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_nextButton", {
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
        Object.defineProperty(this, "_thumbStages", {
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
        this._thumbStages = thumbStages;
        const willThumbsFitContainer = numberOfVisibleThumbs >= thumbStages.length;
        this._wrapper = this._wrapThumbs(getChildNodes(container), willThumbsFitContainer);
        const [previousButton, nextButton] = this._createScrollerButtons(container, willThumbsFitContainer);
        this._previousButton = previousButton;
        this._nextButton = nextButton;
        this._thumbSizeRem = this._calculateThumbsize(this._wrapper, numberOfVisibleThumbs);
        this._resizeThumbStages(this._thumbSizeRem);
    }
    reinitSize() {
        this._thumbSizeRem = this._calculateThumbsize(this._wrapper, this._numberOfVisibleThumbs);
        this._resizeThumbStages(this._thumbSizeRem);
    }
    getThumbSizeRem() {
        return this._thumbSizeRem;
    }
    getNumberOfVisibleThumbs() {
        return this._numberOfVisibleThumbs;
    }
    getNumberOfThumbs() {
        return this._thumbStages.length;
    }
    getThumbScrollerButtons() {
        return { previousButton: this._previousButton, nextButton: this._nextButton };
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
        return thumbsize;
    }
    _createScrollerButtons(container, hidden) {
        const previousButton = createElement('div');
        setInnerHtml(previousButton, nextThumbs);
        addCssClass(previousButton, styles.thumbs_wrapper__previous_btn);
        prependChildElement(previousButton, container);
        const nextButton = createElement('div');
        setInnerHtml(nextButton, nextThumbs);
        addCssClass(nextButton, styles.thumbs_wrapper__next_btn);
        appendChildElement(nextButton, container);
        if (hidden) {
            addCssStyle(previousButton, 'opacity', '0');
            addCssStyle(nextButton, 'opacity', '0');
        }
        return [previousButton, nextButton];
    }
    _resizeThumbStages(size) {
        const innerSize = size * 0.9;
        const margin = size * 0.05;
        this._thumbStages.forEach((thumbStage) => {
            thumbStage.setSize(`${innerSize}rem`, `${innerSize}rem`);
            thumbStage.setMargin(`${margin}rem`);
        });
    }
}
