/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

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
  getElement,
  cloneElement,
} from 'mibreit-dom-tools';

import Gallery from '../containers/Gallery';
import Fullscreen from '../containers/Fullscreen';
import ThumbScrollerContainer from '../containers/ThumbScrollerContainer';

import SwipeHander, { ESwipeDirection, TPosition } from '../components/SwipeHandler';

// tools
import debounce from '../tools/debounce';

// interfaces
import ISlideshow from '../interfaces/ISlideshow';
import IGallery from '../interfaces/IGallery';
import IImageViewer from '../interfaces/IImageViewer';
import IThumbsViewer from '../interfaces/IThumbsViewer';
import IFullscreen from '../interfaces/IFullscreen';
import IImageInfo from '../interfaces/IImageInfo';

// types
import { SlideshowConfig, ThumbScrollerConfig } from '../types';

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
  private _slideshowContainerElement: HTMLElement;
  private _fullScreenOnly: boolean;
  private _slideshow: ISlideshow;
  private _thumbsViewer: IThumbsViewer | null = null;
  private _fullscreen: IFullscreen | null = null;

  private constructor(slideshowContainerElement: HTMLElement, slideshow: ISlideshow, fullscreenOnly: boolean = false) {
    this._slideshowContainerElement = slideshowContainerElement;
    this._slideshow = slideshow;
    this._fullScreenOnly = fullscreenOnly;
  }

  public static fromContainerAndImages(
    slideshowContainerElement: HTMLElement,
    imageElements: NodeListOf<HTMLElement>,
    config?: SlideshowConfig
  ): GalleryContainerBuilder {
    const slideshow = new SlideshowBuilder(imageElements, config).build();
    return new GalleryContainerBuilder(slideshowContainerElement, slideshow);
  }

  public static fromImages(imageElements: NodeListOf<HTMLElement>, config?: SlideshowConfig): GalleryContainerBuilder {
    const slideshowContainerElement = createElement('div');
    addCssStyle(slideshowContainerElement, 'display', 'none');
    imageElements.forEach((image: HTMLElement) => {
      appendChildElement(cloneElement(image), slideshowContainerElement);
    });
    const body = getElement('body');
    appendChildElement(slideshowContainerElement, body!);
    const clonedImageElements = slideshowContainerElement.children as unknown as NodeListOf<HTMLElement>;

    const slideshow = new SlideshowBuilder(clonedImageElements, config).build();

    return new GalleryContainerBuilder(slideshowContainerElement, slideshow, true);
  }

  public addPreviousNextButtons(): GalleryContainerBuilder {
    const { previousButton, nextButton } = this._createPreviousNextButtons(this._slideshowContainerElement);
    this._setupHoverEvents(this._slideshowContainerElement, [previousButton, nextButton]);
    return this;
  }

  public addFullscreen(): GalleryContainerBuilder {
    this._fullscreen = new Fullscreen(this._slideshowContainerElement);
    const fullscreenButton = this._createFullscreenButton(this._slideshowContainerElement);
    this._setupHoverEvents(this._slideshowContainerElement, [fullscreenButton]);
    this._setupFullscreenKeyEvents(this._fullscreen);
    this._setupFullscreenClickEvent(fullscreenButton, this._fullscreen);
    this._setupFullscreenChangedHandler(this._fullscreen, fullscreenButton);

    if (this._fullScreenOnly) {
      this._fullscreen.addChangedCallback((active: boolean) => {
        if (active) {
          removeCssStyle(this._slideshowContainerElement, 'display');
        } else {
          addCssStyle(this._slideshowContainerElement, 'display', 'none');
        }
      });
    }
    return this;
  }

  public addThumbScroller(
    thumbContainer: HTMLElement,
    thumbs: NodeListOf<HTMLElement>,
    config?: ThumbScrollerConfig
  ): GalleryContainerBuilder {
    this._thumbsViewer = new ThumbScrollerContainer(thumbContainer, thumbs, config, (index: number) => {
      this._slideshow.getLoader().setCurrentIndex(index);
      this._slideshow.getImageViewer().showImage(index);
    }).getThumbsViewer();

    if (this._thumbsViewer) {
      this._setupThumbsViewerResizeHandler(this._thumbsViewer);
      this._slideshow.getImageViewer().addImageChangedCallback((index: number, _imageInfo: IImageInfo) => {
        this._thumbsViewer!.setCenterThumb(index, true);
      });
    }
    return this;
  }

  public build(): IGallery {
    this._setupSwipeHandler(this._slideshowContainerElement, this._slideshow.getImageViewer());
    this._setupKeyEvents(this._slideshow.getImageViewer());
    return new Gallery(
      this._slideshow.getImageViewer(),
      this._slideshow.getLoader(),
      this._thumbsViewer,
      this._fullscreen
    );
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

  private _setupFullscreenKeyEvents(fullScreen: IFullscreen) {
    addKeyEventListener((event: KeyboardEvent) => {
      const key: string = getKeyFromEvent(event);
      switch (key) {
        case 'Escape':
          fullScreen.deActivate();
          break;
        case 'f':
          if (fullScreen.isActive()) {
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

  private _setupFullscreenClickEvent(fullscreenButton: HTMLElement, fullScreen: IFullscreen) {
    addEventListener(fullscreenButton, 'pointerdown', (event: PointerEvent) => {
      event.stopPropagation();
    });
    addEventListener(fullscreenButton, 'pointerup', (event: PointerEvent) => {
      event.stopPropagation();
      if (!fullScreen.isActive()) {
        fullScreen.activate();
        addCssStyle(fullscreenButton, 'display', 'none');
      }
    });
  }

  private _setupFullscreenChangedHandler(fullScreen: IFullscreen, fullscreenButtonElement: HTMLElement) {
    fullScreen.addChangedCallback((active: boolean) => {
      if (active) {
        addCssStyle(fullscreenButtonElement, 'display', 'none');
      } else {
        removeCssStyle(fullscreenButtonElement, 'display');
      }
    });
  }
}
