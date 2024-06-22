/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { addCssClass, addCssStyle, createElement, wrapElements } from 'mibreit-dom-tools';
import styles from './HorizontalScroller.module.css';
export default class HorizontalScroller {
    constructor(elements) {
        Object.defineProperty(this, "_scroller", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._scroller = this._createScroller(elements);
    }
    scrollTo(position, useRem = false) {
        let positionCss;
        if (useRem) {
            positionCss = `${position}rem`;
        }
        else {
            positionCss = `${position}px`;
        }
        addCssStyle(this._scroller, 'transform', `translate(${positionCss})`);
        return true;
    }
    _createScroller(elements) {
        const scroller = createElement('div');
        addCssClass(scroller, styles.hscroller);
        wrapElements(elements, scroller);
        return scroller;
    }
}
