/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { addCssClass, addCssStyle, appendChildElement, createElement, prependChildElement, setInnerHtml, addEventListener, getElementDimension, getElementPosition, addKeyEventListener, getKeyFromEvent, addResizeEventListener, removeCssStyle, getElement, cloneElement, } from 'mibreit-dom-tools';
import Gallery from '../containers/Gallery';
import Fullscreen from '../containers/Fullscreen';
import ThumbScrollerContainer from '../containers/ThumbScrollerContainer';
import SwipeHander, { ESwipeDirection } from '../components/SwipeHandler';
// tools
import debounce from '../tools/debounce';
// images
import nextImageSvg from '../images/nextImage.svg';
import fullscreenSvg from '../images/fullscreen.svg';
// styles
import styles from './GalleryBuilder.module.css';
import animationStyles from '../tools/animations.module.css';
// constants
import { GALLERY_BUTTONS_SHOW_OPACITY } from '../constants';
import SlideshowBuilder from './SlideshowBuilder';
const RESIZE_DEBOUNCE_TIMER = 500;
export default class GalleryContainerBuilder {
    constructor(slideshowContainerElement, slideshow, fullscreenOnly = false) {
        Object.defineProperty(this, "_slideshowContainerElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_fullScreenOnly", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_slideshow", {
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
        Object.defineProperty(this, "_fullscreen", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        this._slideshowContainerElement = slideshowContainerElement;
        this._slideshow = slideshow;
        this._fullScreenOnly = fullscreenOnly;
    }
    static fromContainerAndImages(slideshowContainerElement, imageElements, config) {
        const slideshow = new SlideshowBuilder(imageElements, config).build();
        return new GalleryContainerBuilder(slideshowContainerElement, slideshow);
    }
    static fromImages(imageElements, config) {
        const slideshowContainerElement = createElement('div');
        addCssStyle(slideshowContainerElement, 'display', 'none');
        imageElements.forEach((image) => {
            appendChildElement(cloneElement(image), slideshowContainerElement);
        });
        const body = getElement('body');
        appendChildElement(slideshowContainerElement, body);
        const clonedImageElements = slideshowContainerElement.children;
        const slideshow = new SlideshowBuilder(clonedImageElements, config).build();
        return new GalleryContainerBuilder(slideshowContainerElement, slideshow, true);
    }
    addPreviousNextButtons() {
        const { previousButton, nextButton } = this._createPreviousNextButtons(this._slideshowContainerElement);
        this._setupHoverEvents(this._slideshowContainerElement, [previousButton, nextButton]);
        return this;
    }
    addFullscreen() {
        this._fullscreen = new Fullscreen(this._slideshowContainerElement);
        const fullscreenButton = this._createFullscreenButton(this._slideshowContainerElement);
        this._setupHoverEvents(this._slideshowContainerElement, [fullscreenButton]);
        this._setupFullscreenKeyEvents(this._fullscreen);
        this._setupFullscreenClickEvent(fullscreenButton, this._fullscreen);
        this._setupFullscreenChangedHandler(this._fullscreen, fullscreenButton);
        if (this._fullScreenOnly) {
            this._fullscreen.addChangedCallback((active) => {
                if (active) {
                    removeCssStyle(this._slideshowContainerElement, 'display');
                }
                else {
                    addCssStyle(this._slideshowContainerElement, 'display', 'none');
                }
            });
        }
        return this;
    }
    addThumbScroller(thumbContainer, thumbs, config) {
        this._thumbsViewer = new ThumbScrollerContainer(thumbContainer, thumbs, config, (index) => {
            this._slideshow.getLoader().setCurrentIndex(index);
            this._slideshow.getImageViewer().showImage(index);
        }).getThumbsViewer();
        if (this._thumbsViewer) {
            this._setupThumbsViewerResizeHandler(this._thumbsViewer);
            this._slideshow.getImageViewer().addImageChangedCallback((index, _imageInfo) => {
                this._thumbsViewer.setCenterThumb(index, true);
            });
        }
        return this;
    }
    build() {
        this._setupSwipeHandler(this._slideshowContainerElement, this._slideshow.getImageViewer());
        this._setupKeyEvents(this._slideshow.getImageViewer());
        return new Gallery(this._slideshow.getImageViewer(), this._slideshow.getLoader(), this._thumbsViewer, this._fullscreen);
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
                    if (fullScreen.isActive()) {
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
            if (!fullScreen.isActive()) {
                fullScreen.activate();
                addCssStyle(fullscreenButton, 'display', 'none');
            }
        });
    }
    _setupFullscreenChangedHandler(fullScreen, fullscreenButtonElement) {
        fullScreen.addChangedCallback((active) => {
            if (active) {
                addCssStyle(fullscreenButtonElement, 'display', 'none');
            }
            else {
                removeCssStyle(fullscreenButtonElement, 'display');
            }
        });
    }
}
