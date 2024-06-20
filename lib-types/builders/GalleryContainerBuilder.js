/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { addCssClass, addCssStyle, appendChildElement, createElement, prependChildElement, setInnerHtml, addEventListener, getElementDimension, getElementPosition, addKeyEventListener, getKeyFromEvent, addResizeEventListener, removeCssStyle, } from 'mibreit-dom-tools';
import GalleryContainer from '../containers/GalleryContainer';
import FullscreenContainer from '../containers/FullscreenContainer';
import SlideshowContainer from '../containers/SlideshowContainer';
import ThumbScrollerContainer from '../containers/ThumbScrollerContainer';
import SwipeHander, { ESwipeDirection } from '../components/SwipeHandler';
import debounce from '../tools/debounce';
// images
import nextImageSvg from '../images/nextImage.svg';
import fullscreenSvg from '../images/fullscreen.svg';
// styles
import styles from './GalleryContainerBuilder.module.css';
import animationStyles from '../tools/animations.module.css';
// constants
import { GALLERY_BUTTONS_SHOW_OPACITY } from '../constants';
const RESIZE_DEBOUNCE_TIMER = 500;
export default class GalleryContainerBuilder {
    constructor(slideshowContainerElement, images, config) {
        Object.defineProperty(this, "_slideshowContainerElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_imageViewer", {
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
        Object.defineProperty(this, "_thumbsViewer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "_fullscreenContainer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        this._slideshowContainerElement = slideshowContainerElement;
        const slideshowContainer = new SlideshowContainer(images, config);
        this._imageViewer = slideshowContainer.getImageViewer();
        this._lazyLoader = slideshowContainer.getLoader();
        const { previousButton, nextButton } = this._createPreviousNextButtons(slideshowContainerElement);
        this._setupHoverEvents(slideshowContainerElement, [previousButton, nextButton]);
        this._setupSwipeHandler(slideshowContainerElement, this._imageViewer);
        this._setupKeyEvents(this._imageViewer);
    }
    addFullscreen() {
        this._fullscreenContainer = new FullscreenContainer(this._slideshowContainerElement);
        const fullscreenButton = this._createFullscreenButton(this._slideshowContainerElement);
        this._setupHoverEvents(this._slideshowContainerElement, [fullscreenButton]);
        this._setupFullscreenKeyEvents(this._fullscreenContainer);
        this._setupFullscreenClickEvent(fullscreenButton, this._fullscreenContainer);
        if (this._fullscreenContainer && fullscreenButton) {
            this._setupFullscreenChangedHandler(this._fullscreenContainer, fullscreenButton, this._thumbsViewer);
        }
    }
    addThumbScroller(thumbContainer, thumbs, config) {
        this._thumbsViewer = new ThumbScrollerContainer(thumbContainer, thumbs, config, (index) => {
            this._lazyLoader.setCurrentIndex(index);
            this._imageViewer.showImage(index);
        }).getThumbsViewer();
        if (this._thumbsViewer) {
            this._setupThumbsViewerResizeHandler(this._thumbsViewer);
            this._imageViewer.addImageChangedCallback((index, _imageInfo) => {
                this._thumbsViewer.setCenterThumb(index, true);
            });
        }
        return this;
    }
    build() {
        return new GalleryContainer(this._imageViewer, this._lazyLoader, this._thumbsViewer, this._fullscreenContainer);
    }
    _createPreviousNextButtons(container) {
        const previousButton = createElement('div');
        setInnerHtml(previousButton, nextImageSvg);
        addCssClass(previousButton, styles.gallery__previous_btn);
        addCssClass(previousButton, animationStyles.fade);
        prependChildElement(previousButton, container);
        const nextButton = createElement('div');
        setInnerHtml(nextButton, nextImageSvg);
        addCssClass(nextButton, styles.gallery__next_btn);
        addCssClass(nextButton, animationStyles.fade);
        appendChildElement(nextButton, container);
        return { previousButton, nextButton };
    }
    _setupSwipeHandler(container, imageViewer) {
        addCssStyle(container, 'touch-action', 'pinch-zoom pan-y');
        new SwipeHander(container, (direction, position) => {
            const containerWidth = getElementDimension(container).width;
            const containerPosX = getElementPosition(container).x;
            if (direction === ESwipeDirection.LEFT) {
                imageViewer.showPreviousImage(direction);
            }
            else if (direction === ESwipeDirection.RIGHT) {
                imageViewer.showNextImage(direction);
            }
            else {
                if (position.x - containerPosX > containerWidth / 2) {
                    imageViewer.showNextImage();
                }
                else {
                    imageViewer.showPreviousImage();
                }
            }
        });
    }
    _setupThumbsViewerResizeHandler(thumbsViewer) {
        addResizeEventListener(() => {
            debounce(() => {
                thumbsViewer.reinitSize();
            }, RESIZE_DEBOUNCE_TIMER, false);
        });
    }
    _setupHoverEvents(container, buttons) {
        addEventListener(container, 'mouseenter', () => {
            buttons.forEach((button) => {
                addCssStyle(button, 'opacity', `${GALLERY_BUTTONS_SHOW_OPACITY}`);
            });
        });
        addEventListener(container, 'mouseleave', () => {
            buttons.forEach((button) => {
                addCssStyle(button, 'opacity', '0');
            });
        });
    }
    _setupKeyEvents(imageViewer) {
        addKeyEventListener((event) => {
            const key = getKeyFromEvent(event);
            switch (key) {
                case 'ArrowRight':
                    imageViewer.showNextImage();
                    break;
                case 'ArrowLeft':
                    imageViewer.showPreviousImage();
                    break;
                default:
                    break;
            }
        });
    }
    _setupFullscreenKeyEvents(fullScreen) {
        addKeyEventListener((event) => {
            const key = getKeyFromEvent(event);
            switch (key) {
                case 'Escape':
                    fullScreen.deActivate();
                    break;
                case 'f':
                    if (fullScreen.isFullscreenActive()) {
                        fullScreen.deActivate();
                    }
                    else {
                        fullScreen.activate();
                    }
                    break;
                default:
                    break;
            }
        });
    }
    _createFullscreenButton(container) {
        const fullscreenButton = createElement('div');
        setInnerHtml(fullscreenButton, fullscreenSvg);
        addCssClass(fullscreenButton, styles.gallery__fullscreen_btn);
        addCssClass(fullscreenButton, animationStyles.fade);
        appendChildElement(fullscreenButton, container);
        return fullscreenButton;
    }
    _setupFullscreenClickEvent(fullscreenButton, fullScreen) {
        addEventListener(fullscreenButton, 'pointerdown', (event) => {
            event.stopPropagation();
        });
        addEventListener(fullscreenButton, 'pointerup', (event) => {
            event.stopPropagation();
            if (!fullScreen.isFullscreenActive()) {
                fullScreen.activate();
                addCssStyle(fullscreenButton, 'display', 'none');
            }
        });
    }
    _setupFullscreenChangedHandler(FullscreenContainer, fullscreenButton, thumbScroller) {
        FullscreenContainer.addFullscreenChangedCallback((active) => {
            if (thumbScroller) {
                thumbScroller.reinitSize();
            }
            if (active) {
                addCssStyle(fullscreenButton, 'display', 'none');
            }
            else {
                removeCssStyle(fullscreenButton, 'display');
            }
        });
    }
}
