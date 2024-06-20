/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { ILazyLoader } from 'mibreit-lazy-loader';
import {
  addCssClass,
  addCssStyle,
  appendChildElement,
  createElement,
  prependChildElement,
  setInnerHtml,
  addEventListener,
  getElementDimension,
  getElementPosition,
  addKeyEventListener,
  getKeyFromEvent,
  addResizeEventListener,
  removeCssStyle,
} from 'mibreit-dom-tools';

import IImageViewer from '../interfaces/IImageViewer';
import IThumbsViewer from '../interfaces/IThumbsViewer';
import IFullscreenContainer from '../interfaces/IFullscreenContainer';
import IImageInfo from '../interfaces/IImageInfo';

import GalleryContainer from '../containers/GalleryContainer';
import FullscreenContainer from '../containers/FullscreenContainer';
import SlideshowContainer, { SlideshowConfig } from '../containers/SlideshowContainer';
import ThumbScrollerContainer, { ThumbScrollerConfig } from '../containers/ThumbScrollerContainer';
import IGalleryContainer from '../interfaces/IGalleryContainer';

import SwipeHander, { ESwipeDirection, TPosition } from '../components/SwipeHandler';

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
  private _slideshowContainerElement: HTMLElement;
  private _imageViewer: IImageViewer;
  private _lazyLoader: ILazyLoader;
  private _thumbsViewer: IThumbsViewer | null = null;
  private _fullscreenContainer: IFullscreenContainer | null = null;

  constructor(slideshowContainerElement: HTMLElement, images: NodeListOf<HTMLElement>, config?: SlideshowConfig) {
    this._slideshowContainerElement = slideshowContainerElement;

    const slideshowContainer = new SlideshowContainer(images, config);
    this._imageViewer = slideshowContainer.getImageViewer();
    this._lazyLoader = slideshowContainer.getLoader();
    const { previousButton, nextButton } = this._createPreviousNextButtons(slideshowContainerElement);
    this._setupHoverEvents(slideshowContainerElement, [previousButton, nextButton]);
    this._setupSwipeHandler(slideshowContainerElement, this._imageViewer);
    this._setupKeyEvents(this._imageViewer);
  }

  public addFullscreen() {
    this._fullscreenContainer = new FullscreenContainer(this._slideshowContainerElement);
    const fullscreenButton = this._createFullscreenButton(this._slideshowContainerElement);
    this._setupHoverEvents(this._slideshowContainerElement, [fullscreenButton]);
    this._setupFullscreenKeyEvents(this._fullscreenContainer);
    this._setupFullscreenClickEvent(fullscreenButton, this._fullscreenContainer);
    if (this._fullscreenContainer && fullscreenButton) {
      this._setupFullscreenChangedHandler(this._fullscreenContainer, fullscreenButton, this._thumbsViewer);
    }
  }

  public addThumbScroller(
    thumbContainer: HTMLElement,
    thumbs: NodeListOf<HTMLElement>,
    config?: ThumbScrollerConfig
  ): GalleryContainerBuilder {
    this._thumbsViewer = new ThumbScrollerContainer(thumbContainer, thumbs, config, (index: number) => {
      this._lazyLoader.setCurrentIndex(index);
      this._imageViewer.showImage(index);
    }).getThumbsViewer();

    if (this._thumbsViewer) {
      this._setupThumbsViewerResizeHandler(this._thumbsViewer);
      this._imageViewer.addImageChangedCallback((index: number, _imageInfo: IImageInfo) => {
        this._thumbsViewer!.setCenterThumb(index, true);
      });
    }
    return this;
  }

  public build(): IGalleryContainer {
    return new GalleryContainer(this._imageViewer, this._lazyLoader, this._thumbsViewer, this._fullscreenContainer);
  }

  private _createPreviousNextButtons(container: HTMLElement): { previousButton: HTMLElement; nextButton: HTMLElement } {
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

  private _setupSwipeHandler(container: HTMLElement, imageViewer: IImageViewer) {
    addCssStyle(container, 'touch-action', 'pinch-zoom pan-y');

    new SwipeHander(container, (direction: ESwipeDirection, position: TPosition) => {
      const containerWidth: number = getElementDimension(container).width;
      const containerPosX: number = getElementPosition(container).x;
      if (direction === ESwipeDirection.LEFT) {
        imageViewer.showPreviousImage(direction);
      } else if (direction === ESwipeDirection.RIGHT) {
        imageViewer.showNextImage(direction);
      } else {
        if (position.x - containerPosX > containerWidth / 2) {
          imageViewer.showNextImage();
        } else {
          imageViewer.showPreviousImage();
        }
      }
    });
  }

  private _setupThumbsViewerResizeHandler(thumbsViewer: IThumbsViewer) {
    addResizeEventListener(() => {
      debounce(
        () => {
          thumbsViewer.reinitSize();
        },
        RESIZE_DEBOUNCE_TIMER,
        false
      );
    });
  }

  private _setupHoverEvents(container: HTMLElement, buttons: Array<HTMLElement>) {
    addEventListener(container, 'mouseenter', () => {
      buttons.forEach((button: HTMLElement) => {
        addCssStyle(button, 'opacity', `${GALLERY_BUTTONS_SHOW_OPACITY}`);
      });
    });
    addEventListener(container, 'mouseleave', () => {
      buttons.forEach((button: HTMLElement) => {
        addCssStyle(button, 'opacity', '0');
      });
    });
  }

  private _setupKeyEvents(imageViewer: IImageViewer) {
    addKeyEventListener((event: KeyboardEvent) => {
      const key: string = getKeyFromEvent(event);
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

  private _setupFullscreenKeyEvents(fullScreen: IFullscreenContainer) {
    addKeyEventListener((event: KeyboardEvent) => {
      const key: string = getKeyFromEvent(event);
      switch (key) {
        case 'Escape':
          fullScreen.deActivate();
          break;
        case 'f':
          if (fullScreen.isFullscreenActive()) {
            fullScreen.deActivate();
          } else {
            fullScreen.activate();
          }
          break;
        default:
          break;
      }
    });
  }

  private _createFullscreenButton(container: HTMLElement): HTMLElement {
    const fullscreenButton = createElement('div');
    setInnerHtml(fullscreenButton, fullscreenSvg);
    addCssClass(fullscreenButton, styles.gallery__fullscreen_btn);
    addCssClass(fullscreenButton, animationStyles.fade);
    appendChildElement(fullscreenButton, container);
    return fullscreenButton;
  }

  private _setupFullscreenClickEvent(fullscreenButton: HTMLElement, fullScreen: IFullscreenContainer) {
    addEventListener(fullscreenButton, 'pointerdown', (event: PointerEvent) => {
      event.stopPropagation();
    });
    addEventListener(fullscreenButton, 'pointerup', (event: PointerEvent) => {
      event.stopPropagation();
      if (!fullScreen.isFullscreenActive()) {
        fullScreen.activate();
        addCssStyle(fullscreenButton, 'display', 'none');
      }
    });
  }

  private _setupFullscreenChangedHandler(
    FullscreenContainer: IFullscreenContainer,
    fullscreenButton: HTMLElement,
    thumbScroller: IThumbsViewer | null
  ) {
    FullscreenContainer.addFullscreenChangedCallback((active: boolean) => {
      if (thumbScroller) {
        thumbScroller.reinitSize();
      }

      if (active) {
        addCssStyle(fullscreenButton, 'display', 'none');
      } else {
        removeCssStyle(fullscreenButton, 'display');
      }
    });
  }
}
