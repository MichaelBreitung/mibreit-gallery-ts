/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { addCssClass, addCssStyle, appendChildElement, createElement, getChildNodes, getElementDimension, getRootFontSize, prependChildElement, setInnerHtml, wrapElements, } from 'mibreit-dom-tools';
import styles from './ThumbScrollerLayout.module.css';
import nextThumbs from '../images/nextThumbs.svg';
export default class ThumbsContainer {
    constructor(container, thumbStages, numberOfVisibleThumbs) {
        Object.defineProperty(this, "_scrollerContainer", {
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
        addCssClass(container, styles.mibreit_ThumbScrollerParentContainer);
        this._numberOfVisibleThumbs = numberOfVisibleThumbs;
        this._thumbStages = thumbStages;
        const willThumbsFitContainer = numberOfVisibleThumbs >= thumbStages.length;
        this._scrollerContainer = this._createScrollerContainer(container, willThumbsFitContainer);
        const [previousButton, nextButton] = this._createScrollerButtons(container, willThumbsFitContainer);
        this._previousButton = previousButton;
        this._nextButton = nextButton;
        this._thumbSizeRem = this._calculateThumbsize(this._scrollerContainer, numberOfVisibleThumbs);
        this._resizeThumbStages(this._thumbSizeRem);
    }
    reinitSize() {
        this._thumbSizeRem = this._calculateThumbsize(this._scrollerContainer, this._numberOfVisibleThumbs);
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
        return getChildNodes(this._scrollerContainer);
    }
    _createScrollerContainer(container, centerThumbs) {
        const childNodes = getChildNodes(container);
        const scrollerContainer = createElement('div');
        if (centerThumbs) {
            addCssClass(scrollerContainer, styles.mibreit_ThumbScrollerContainerCentered);
        }
        else {
            addCssClass(scrollerContainer, styles.mibreit_ThumbScrollerContainer);
        }
        wrapElements(childNodes, scrollerContainer);
        return scrollerContainer;
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
        addCssClass(previousButton, styles.mibreit_ThumbScrollerPrevious);
        prependChildElement(previousButton, container);
        const nextButton = createElement('div');
        setInnerHtml(nextButton, nextThumbs);
        addCssClass(nextButton, styles.mibreit_ThumbScrollerNext);
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
