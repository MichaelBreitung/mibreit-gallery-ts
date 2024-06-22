/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { addClickEventListener, addCssClass, addCssStyle, appendChildElement, createElement, getElement, prependBeforeChild, removeCssStyle, removeElement, setInnerHtml, } from 'mibreit-dom-tools';
// Styles
import styles from './Fullscreen.module.css';
// SVGs
import fullscreenClose from '../images/close.svg';
export default class Fullscreen {
    constructor(slideshowContainer, thumbsContainer = null, usePlaceholder = true) {
        Object.defineProperty(this, "_changedCallbacks", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "_active", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_slideshowContainerElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_thumbsContainerElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "_fullScreenContainerElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_slideshowContainerPlaceholderElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_thumbsContainerPlaceholderElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "_closeButtonElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_usePlaceholder", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._active = false;
        this._slideshowContainerElement = slideshowContainer;
        this._thumbsContainerElement = thumbsContainer;
        this._usePlaceholder = usePlaceholder;
        this._fullScreenContainerElement = this._createFullscreenContainer();
        this._closeButtonElement = this._createFullscreenCloseButton(this._fullScreenContainerElement);
        this._slideshowContainerPlaceholderElement = this._createSlideshowContainerPlaceholder();
        if (thumbsContainer) {
            this._thumbsContainerPlaceholderElement = this._createThumbsContainerPlaceholder();
        }
    }
    activate() {
        if (!this._active) {
            this._moveGalleryToFullscreen();
            this._moveThumbsToFullscreen();
            this._addFullscreen();
            this._setupCloseButtonHandler();
            this._active = true;
            this._changedCallbacks.forEach((callback) => {
                callback(true);
            });
        }
    }
    deActivate() {
        if (this._active) {
            this._removeGalleryFromFullscreen();
            this._removeThumbsFromFullscreen();
            this._removeFullscreen();
            this._active = false;
            this._changedCallbacks.forEach((callback) => {
                callback(false);
            });
        }
    }
    addChangedCallback(callback) {
        if (!this._changedCallbacks.includes(callback)) {
            this._changedCallbacks.push(callback);
        }
    }
    isActive() {
        return this._active;
    }
    setBackgroundColor(color) {
        addCssStyle(this._fullScreenContainerElement, 'background-color', color);
    }
    _createFullscreenContainer() {
        const fullScreenContainer = createElement('div');
        addCssClass(fullScreenContainer, styles.fullscreen);
        return fullScreenContainer;
    }
    _createFullscreenCloseButton(fullScreenContainer) {
        const fullScreenCloseButton = createElement('div');
        setInnerHtml(fullScreenCloseButton, fullscreenClose);
        addCssClass(fullScreenCloseButton, styles.fullscreen__exit_btn);
        appendChildElement(fullScreenCloseButton, fullScreenContainer);
        return fullScreenCloseButton;
    }
    _createSlideshowContainerPlaceholder() {
        const slideshowContainerPlaceholder = createElement('div');
        return slideshowContainerPlaceholder;
    }
    _createThumbsContainerPlaceholder() {
        const thumbsContainerPlaceholder = createElement('div');
        return thumbsContainerPlaceholder;
    }
    _addFullscreen() {
        const body = getElement('body');
        if (body != null) {
            appendChildElement(this._fullScreenContainerElement, body);
        }
    }
    _removeFullscreen() {
        removeElement(this._fullScreenContainerElement);
    }
    _moveGalleryToFullscreen() {
        if (this._usePlaceholder) {
            prependBeforeChild(this._slideshowContainerPlaceholderElement, this._slideshowContainerElement);
        }
        appendChildElement(this._slideshowContainerElement, this._fullScreenContainerElement);
        addCssStyle(this._slideshowContainerElement, 'width', '100%');
        addCssStyle(this._slideshowContainerElement, 'flex-grow', '1');
    }
    _removeGalleryFromFullscreen() {
        removeElement(this._slideshowContainerElement);
        if (this._usePlaceholder) {
            prependBeforeChild(this._slideshowContainerElement, this._slideshowContainerPlaceholderElement);
            removeElement(this._slideshowContainerPlaceholderElement);
        }
        removeCssStyle(this._slideshowContainerElement, 'width');
        removeCssStyle(this._slideshowContainerElement, 'flex-grow');
    }
    _moveThumbsToFullscreen() {
        if (this._thumbsContainerElement && this._thumbsContainerPlaceholderElement) {
            if (this._usePlaceholder) {
                prependBeforeChild(this._thumbsContainerPlaceholderElement, this._thumbsContainerElement);
            }
            appendChildElement(this._thumbsContainerElement, this._fullScreenContainerElement);
            addCssStyle(this._thumbsContainerElement, 'flex-grow', '0');
        }
    }
    _removeThumbsFromFullscreen() {
        if (this._thumbsContainerElement && this._thumbsContainerPlaceholderElement) {
            removeElement(this._thumbsContainerElement);
            if (this._usePlaceholder) {
                prependBeforeChild(this._thumbsContainerElement, this._thumbsContainerPlaceholderElement);
                removeElement(this._thumbsContainerPlaceholderElement);
            }
            removeCssStyle(this._thumbsContainerElement, 'flex-grow');
        }
    }
    _setupCloseButtonHandler() {
        addClickEventListener(this._closeButtonElement, (event) => {
            event === null || event === void 0 ? void 0 : event.stopPropagation();
            if (this._active) {
                this.deActivate();
            }
        });
    }
}
