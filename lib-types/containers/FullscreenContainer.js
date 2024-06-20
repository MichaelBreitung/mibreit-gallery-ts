/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { addClickEventListener, addCssClass, addCssStyle, appendChildElement, createElement, getElement, prependBeforeChild, removeCssStyle, removeElement, setAttribute, setInnerHtml, } from 'mibreit-dom-tools';
import styles from './FullscreenContainer.module.css';
import fullscreenClose from '../images/close.svg';
const GALLERY_PLACEHOLDER_ID = 'slideshowContainerPlaceholder';
const THUMBS_PLACEHOLDER_ID = 'thumbContainerPlaceholder';
export default class FullscreenContainer {
    constructor(slideshowContainer, thumbContainer = null, usePlaceholder = true) {
        Object.defineProperty(this, "_fullscreenChangedCallbacks", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "_fullscreenActive", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_slideshowContainer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_thumbContainer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "_fullScreenContainer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_slideshowContainerPlaceholder", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_thumbContainerPlaceholder", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "_fullScreenCloseButton", {
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
        this._fullscreenActive = false;
        this._slideshowContainer = slideshowContainer;
        this._thumbContainer = thumbContainer;
        this._usePlaceholder = usePlaceholder;
        this._fullScreenContainer = this._createFullscreenContainer();
        this._fullScreenCloseButton = this._createFullscreenCloseButton(this._fullScreenContainer);
        this._slideshowContainerPlaceholder = this._createSlideshowContainerPlaceholder();
        if (thumbContainer) {
            this._thumbContainerPlaceholder = this._createThumbContainerPlaceholder();
        }
    }
    activate() {
        if (!this._fullscreenActive) {
            this._moveGalleryToFullscreen();
            this._moveThumbsToFullscreen();
            this._addFullscreen();
            this._setupCloseButtonHandler();
            this._fullscreenActive = true;
            this._fullscreenChangedCallbacks.forEach((callback) => {
                callback(true);
            });
        }
    }
    deActivate() {
        if (this._fullscreenActive) {
            this._removeGalleryFromFullscreen();
            this._removeThumbsFromFullscreen();
            this._removeFullscreen();
            this._fullscreenActive = false;
            this._fullscreenChangedCallbacks.forEach((callback) => {
                callback(false);
            });
        }
    }
    addFullscreenChangedCallback(callback) {
        if (!this._fullscreenChangedCallbacks.includes(callback)) {
            this._fullscreenChangedCallbacks.push(callback);
        }
    }
    isFullscreenActive() {
        return this._fullscreenActive;
    }
    setBackgroundColor(color) {
        addCssStyle(this._fullScreenContainer, 'background-color', color);
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
        setAttribute(slideshowContainerPlaceholder, 'id', GALLERY_PLACEHOLDER_ID);
        return slideshowContainerPlaceholder;
    }
    _createThumbContainerPlaceholder() {
        const thumbContainerPlaceholder = createElement('div');
        setAttribute(thumbContainerPlaceholder, 'id', THUMBS_PLACEHOLDER_ID);
        return thumbContainerPlaceholder;
    }
    _addFullscreen() {
        const body = getElement('body');
        if (body != null) {
            appendChildElement(this._fullScreenContainer, body);
        }
    }
    _removeFullscreen() {
        removeElement(this._fullScreenContainer);
    }
    _moveGalleryToFullscreen() {
        if (this._usePlaceholder) {
            prependBeforeChild(this._slideshowContainerPlaceholder, this._slideshowContainer);
        }
        appendChildElement(this._slideshowContainer, this._fullScreenContainer);
        addCssStyle(this._slideshowContainer, 'width', '100%');
        addCssStyle(this._slideshowContainer, 'flex-grow', '1');
    }
    _removeGalleryFromFullscreen() {
        removeElement(this._slideshowContainer);
        if (this._usePlaceholder) {
            prependBeforeChild(this._slideshowContainer, this._slideshowContainerPlaceholder);
            removeElement(this._slideshowContainerPlaceholder);
        }
        removeCssStyle(this._slideshowContainer, 'width');
        removeCssStyle(this._slideshowContainer, 'flex-grow');
    }
    _moveThumbsToFullscreen() {
        if (this._thumbContainer && this._thumbContainerPlaceholder) {
            if (this._usePlaceholder) {
                prependBeforeChild(this._thumbContainerPlaceholder, this._thumbContainer);
            }
            appendChildElement(this._thumbContainer, this._fullScreenContainer);
            addCssStyle(this._thumbContainer, 'flex-grow', '0');
        }
    }
    _removeThumbsFromFullscreen() {
        if (this._thumbContainer && this._thumbContainerPlaceholder) {
            removeElement(this._thumbContainer);
            if (this._usePlaceholder) {
                prependBeforeChild(this._thumbContainer, this._thumbContainerPlaceholder);
                removeElement(this._thumbContainerPlaceholder);
            }
            removeCssStyle(this._thumbContainer, 'flex-grow');
        }
    }
    _setupCloseButtonHandler() {
        addClickEventListener(this._fullScreenCloseButton, (event) => {
            event === null || event === void 0 ? void 0 : event.stopPropagation();
            if (this._fullscreenActive) {
                this.deActivate();
            }
        });
    }
}
