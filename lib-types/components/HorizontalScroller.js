/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { addCssClass, addCssStyle, createElement, getChildNodes, wrapElements } from 'mibreit-dom-tools';
import styles from './HorizontalScroller.module.css';
export default class HorizontalScroller {
    constructor(container) {
        Object.defineProperty(this, "_scroller", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._scroller = this._createScroller(container);
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
    _createScroller(container) {
        const childNodes = getChildNodes(container);
        const scroller = createElement('div');
        addCssClass(scroller, styles.mibreit_HorizontalScroller);
        wrapElements(childNodes, scroller);
        return scroller;
    }
}
