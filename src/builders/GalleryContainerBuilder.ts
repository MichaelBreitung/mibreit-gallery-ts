/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import GalleryContainer from '../containers/GalleryContainer';
import SlideshowContainer, { SlideshowConfig } from '../containers/SlideshowContainer';
import IGalleryContainer from '../interfaces/IGalleryContainer';
import IImageViewer from '../interfaces/IImageViewer';
import IThumbScroller from '../interfaces/IThumbScroller';
import ThumbScrollerContainer, { ThumbScrollerConfig } from '../containers/ThumbScrollerContainer';
import IImageInfo from '../interfaces/IImageInfo';
import FullscreenContainer from '../containers/FullscreenContainer';
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

// images
import nextImageSvg from '../images/nextImage.svg';
import fullscreenSvg from '../images/fullscreen.svg';

// styles
import styles from './GalleryContainerBuilder.module.css';
import animationStyles from '../tools/animations.module.css';

// constants
import { GALLERY_BUTTONS_SHOW_OPACITY } from '../constants';
import SwipeHander, { ESwipeDirection, TPosition } from '../components/SwipeHandler';
import IFullscreen from '../interfaces/IFullscreen';
import debounce from '../tools/debounce';
import { ILazyLoader } from 'mibreit-lazy-loader';

const RESIZE_DEBOUNCE_TIMER = 500;

export default class GalleryContainerBuilder {
  private _container: HTMLElement;
  private _thumbContainer: HTMLElement | null = null;
  private _fullscreenButton: HTMLElement | null = null;
  private _viewer: IImageViewer;
  private _loader: ILazyLoader;
  private _thumbScroller: IThumbScroller | null = null;
  private _fullscreenContainer: IFullscreen | null = null;

  constructor(container: HTMLElement, images: NodeListOf<HTMLElement>, config: SlideshowConfig) {
    this._container = container;

    const slideshowContainer = new SlideshowContainer(images, config);
    this._viewer = slideshowContainer.getViewer();
    this._loader = slideshowContainer.getLoader();
    const { previousButton, nextButton } = this._createPreviousNextButtons(container);
    this._setupHoverEvents(container, [previousButton, nextButton]);
    this._setupSwipeHandler(container, this._viewer);
  }

  public addThumbScroller(
    thumbContainer: HTMLElement,
    thumbs: NodeListOf<HTMLElement>,
    config: ThumbScrollerConfig
  ): GalleryContainerBuilder {
    this._thumbContainer = thumbContainer;
    this._thumbScroller = new ThumbScrollerContainer(thumbContainer, thumbs, config, (index: number) => {
      this._loader.setCurrentIndex(index);
      this._viewer.showImage(index);
    }).getScroller();

    this._viewer.addImageChangedCallback((index: number, _imageInfo: IImageInfo) => {
      this._thumbScroller!.scrollTo(index, true);
    });
    return this;
  }

  public build(): IGalleryContainer {
    this._fullscreenContainer = new FullscreenContainer(this._container, this._thumbContainer);
    this._fullscreenButton = this._createFullscreenButton(this._container);
    this._setupHoverEvents(this._container, [this._fullscreenButton]);
    this._setupKeyEvents(this._viewer, this._fullscreenContainer);
    this._setupFullscreenClickEvent(this._fullscreenButton, this._fullscreenContainer, this._viewer);
    this._setupResizeHandler(this._viewer, this._thumbScroller);
    if (this._fullscreenContainer && this._fullscreenButton) {
      this._setupFullscreenChangedHandler(
        this._fullscreenContainer,
        this._fullscreenButton,
        this._viewer,
        this._thumbScroller
      );
    }

    return new GalleryContainer(this._viewer, this._thumbScroller, this._fullscreenContainer);
  }

  private _createPreviousNextButtons(container: HTMLElement): { previousButton: HTMLElement; nextButton: HTMLElement } {
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

  private _setupResizeHandler(imageViewer: IImageViewer, thumbScroller: IThumbScroller | null) {
    if (thumbScroller) {
      const debouncedThumbResizer = debounce(
        () => {
          thumbScroller.reinitSize();
        },
        RESIZE_DEBOUNCE_TIMER,
        false
      );
      addResizeEventListener(() => {
        imageViewer.reinitSize();
        debouncedThumbResizer();
      });
    } else {
      addResizeEventListener(() => {
        imageViewer.reinitSize();
      });
    }
  }

  private _createFullscreenButton(container: HTMLElement): HTMLElement {
    const fullscreenButton = createElement('div');
    setInnerHtml(fullscreenButton, fullscreenSvg);
    addCssClass(fullscreenButton, styles.mibreit_GalleryFullscreenButton);
    addCssClass(fullscreenButton, animationStyles.mibreit_GalleryFade);
    appendChildElement(fullscreenButton, container);
    return fullscreenButton;
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

  private _setupKeyEvents(imageViewer: IImageViewer, fullScreen: IFullscreen) {
    addKeyEventListener((event: KeyboardEvent) => {
      const key: string = getKeyFromEvent(event);
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
          } else {
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

  private _setupFullscreenClickEvent(
    fullscreenButton: HTMLElement,
    fullScreen: IFullscreen,
    imageViewer: IImageViewer
  ) {
    addEventListener(fullscreenButton, 'pointerdown', (event: PointerEvent) => {
      event.stopPropagation();
    });
    addEventListener(fullscreenButton, 'pointerup', (event: PointerEvent) => {
      event.stopPropagation();
      if (!fullScreen.isFullscreenActive()) {
        fullScreen.activate();
        imageViewer.reinitSize();
        addCssStyle(fullscreenButton, 'display', 'none');
      }
    });
  }

  private _setupFullscreenChangedHandler(
    FullscreenContainer: IFullscreen,
    fullscreenButton: HTMLElement,
    imageViewer: IImageViewer,
    thumbScroller: IThumbScroller | null
  ) {
    FullscreenContainer.addFullscreenChangedCallback((active: boolean) => {
      if (thumbScroller) {
        thumbScroller.reinitSize();
      }
      imageViewer.reinitSize();
      if (active) {
        addCssStyle(fullscreenButton, 'display', 'none');
      } else {
        removeCssStyle(fullscreenButton, 'display');
      }
    });
  }
}
