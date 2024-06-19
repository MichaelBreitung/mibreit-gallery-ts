/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import GalleryContainer from '../containers/GalleryContainer';
import SlideshowContainer from '../containers/SlideshowContainer';
import ThumbScrollerContainer from '../containers/ThumbScrollerContainer';
import FullscreenContainer from '../containers/FullscreenContainer';
import { addCssClass, addCssStyle, appendChildElement, createElement, prependChildElement, setInnerHtml, addEventListener, getElementDimension, getElementPosition, addKeyEventListener, getKeyFromEvent, addResizeEventListener, removeCssStyle, } from 'mibreit-dom-tools';
// images
import nextImageSvg from '../images/nextImage.svg';
import fullscreenSvg from '../images/fullscreen.svg';
// styles
import styles from './GalleryContainerBuilder.module.css';
import animationStyles from '../tools/animations.module.css';
// constants
import { GALLERY_BUTTONS_SHOW_OPACITY } from '../constants';
import SwipeHander, { ESwipeDirection } from '../components/SwipeHandler';
import debounce from '../tools/debounce';
const RESIZE_DEBOUNCE_TIMER = 500;
export default class GalleryContainerBuilder {
    constructor(container, images, config) {
        Object.defineProperty(this, "_container", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_fullscreenButton", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "_viewer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_loader", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_thumbScroller", {
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
        this._container = container;
        const slideshowContainer = new SlideshowContainer(images, config);
        this._viewer = slideshowContainer.getViewer();
        this._loader = slideshowContainer.getLoader();
        const { previousButton, nextButton } = this._createPreviousNextButtons(container);
        this._setupHoverEvents(container, [previousButton, nextButton]);
        this._setupSwipeHandler(container, this._viewer);
    }
    addThumbScroller(thumbContainer, thumbs, config) {
        this._thumbScroller = new ThumbScrollerContainer(thumbContainer, thumbs, config, (index) => {
            this._loader.setCurrentIndex(index);
            this._viewer.showImage(index);
        }).getScroller();
        if (this._thumbScroller) {
            this._viewer.addImageChangedCallback((index, _imageInfo) => {
                this._thumbScroller.scrollTo(index, true);
            });
        }
        return this;
    }
    build() {
        this._fullscreenContainer = new FullscreenContainer(this._container);
        this._fullscreenButton = this._createFullscreenButton(this._container);
        this._setupHoverEvents(this._container, [this._fullscreenButton]);
        this._setupKeyEvents(this._viewer, this._fullscreenContainer);
        this._setupFullscreenClickEvent(this._fullscreenButton, this._fullscreenContainer, this._viewer);
        this._setupResizeHandler(this._viewer, this._thumbScroller);
        if (this._fullscreenContainer && this._fullscreenButton) {
            this._setupFullscreenChangedHandler(this._fullscreenContainer, this._fullscreenButton, this._viewer, this._thumbScroller);
        }
        return new GalleryContainer(this._viewer, this._loader, this._thumbScroller, this._fullscreenContainer);
    }
    _createPreviousNextButtons(container) {
        const previousButton = createElement('div');
        setInnerHtml(previousButton, nextImageSvg);
        addCssClass(previousButton, styles.mibreit_GalleryPrevious);
        addCssClass(previousButton, animationStyles.mibreit_GalleryFade);
        prependChildElement(previousButton, container);
        const nextButton = createElement('div');
        setInnerHtml(nextButton, nextImageSvg);
        addCssClass(nextButton, styles.mibreit_GalleryNext);
        addCssClass(nextButton, animationStyles.mibreit_GalleryFade);
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
    _setupResizeHandler(imageViewer, thumbScroller) {
        if (thumbScroller) {
            const debouncedThumbResizer = debounce(() => {
                thumbScroller.reinitSize();
            }, RESIZE_DEBOUNCE_TIMER, false);
            addResizeEventListener(() => {
                imageViewer.reinitSize();
                debouncedThumbResizer();
            });
        }
        else {
            addResizeEventListener(() => {
                imageViewer.reinitSize();
            });
        }
    }
    _createFullscreenButton(container) {
        const fullscreenButton = createElement('div');
        setInnerHtml(fullscreenButton, fullscreenSvg);
        addCssClass(fullscreenButton, styles.mibreit_GalleryFullscreenButton);
        addCssClass(fullscreenButton, animationStyles.mibreit_GalleryFade);
        appendChildElement(fullscreenButton, container);
        return fullscreenButton;
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
    _setupKeyEvents(imageViewer, fullScreen) {
        addKeyEventListener((event) => {
            const key = getKeyFromEvent(event);
            switch (key) {
                case 'ArrowRight':
                    imageViewer.showNextImage();
                    break;
                case 'ArrowLeft':
                    imageViewer.showPreviousImage();
                    break;
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
                    if (fullScreen.isFullscreenActive()) {
                        fullScreen.deActivate();
                    }
                    break;
            }
        });
    }
    _setupFullscreenClickEvent(fullscreenButton, fullScreen, imageViewer) {
        addEventListener(fullscreenButton, 'pointerdown', (event) => {
            event.stopPropagation();
        });
        addEventListener(fullscreenButton, 'pointerup', (event) => {
            event.stopPropagation();
            if (!fullScreen.isFullscreenActive()) {
                fullScreen.activate();
                imageViewer.reinitSize();
                addCssStyle(fullscreenButton, 'display', 'none');
            }
        });
    }
    _setupFullscreenChangedHandler(FullscreenContainer, fullscreenButton, imageViewer, thumbScroller) {
        FullscreenContainer.addFullscreenChangedCallback((active) => {
            if (thumbScroller) {
                thumbScroller.reinitSize();
            }
            imageViewer.reinitSize();
            if (active) {
                addCssStyle(fullscreenButton, 'display', 'none');
            }
            else {
                removeCssStyle(fullscreenButton, 'display');
            }
        });
    }
}
