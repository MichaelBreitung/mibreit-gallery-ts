/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { DomTools } from 'mibreit-dom-tools';
import { ILazyLoader } from 'mibreit-lazy-loader';
import IImageViewer from '../interfaces/IImageViewer';
import IThumbScroller from '../interfaces/IThumbScroller';
import IImageInfo from '../interfaces/IImageInfo';
import IFullscreenView from '../interfaces/IFullscreenView';
import { isThumbScrollerConfig, ThumbScrollerConfig } from '../components/ThumbScrollerView';
import SwipeHander, { ESwipeDirection, TPosition } from '../components/SwipeHandler';
import Slideshow, { SlideshowConfig } from '../components/Slideshow';
import createFullscreen from '../factories/createFullscreen';
import debounce from '../tools/debounce';
import { GALLERY_BUTTONS_SHOW_OPACITY } from '../constants';
import styles from './Gallery.module.css';
import animationStyles from '../tools/animations.module.css';
import nextImage from '../images/nextImage.svg';
import fullscreen from '../images/fullscreen.svg';
import createSlideshow from '../factories/createSlideshow';
import createThumbScrollerView from '../factories/createThumbScrollerView';

const DEBOUNCE_TIMER = 500;

export type GalleryConfig =
  | (ThumbScrollerConfig & SlideshowConfig & { galleryContainerSelector: string })
  | (SlideshowConfig & { galleryContainerSelector: string });

export default class Gallery {
  private _slideShow: Slideshow;

  constructor(config: GalleryConfig) {
    const container: HTMLElement = DomTools.getElement(config.galleryContainerSelector);
    this._slideShow = createSlideshow(config);

    let thumbContainer: HTMLElement;
    let thumbScroller: IThumbScroller | null = null;
    if (isThumbScrollerConfig(config)) {
      const thumbConfig: ThumbScrollerConfig = config as ThumbScrollerConfig;
      thumbContainer = DomTools.getElement(thumbConfig.thumbContainerSelector);
      thumbScroller = createThumbScrollerView(thumbConfig, (index: number) => {
        this._slideShow.getLoader().setCurrentIndex(index);
        this._slideShow.getViewer().showImage(index);
      }).getScroller();
      if (thumbScroller) {
        this._slideShow.getViewer().addImageChangedCallback((index: number, _imageInfo: IImageInfo) => {
          thumbScroller.scrollTo(index, true);
        });
      }
    }

    const fullScreenView = createFullscreen(container, thumbContainer);
    const { previousButton, nextButton } = this._createPreviousNextButtons(container);
    const fullscreenButton = this._createFullscreenButton(container);
    this._setupHoverEvents(container, [previousButton, nextButton, fullscreenButton]);
    this._setupKeyEvents(this.getViewer(), fullScreenView, fullscreenButton);
    this._setupSwipeHandler(container, this.getViewer());
    this._setupFullscreenClickEvent(fullscreenButton, fullScreenView, this.getViewer());
    this._setupResizeHandler(this.getViewer(), thumbScroller);
    this._setupFullscreenChangedHandler(fullScreenView, fullscreenButton, this.getViewer(), thumbScroller);
  }

  getViewer(): IImageViewer {
    return this._slideShow.getViewer();
  }

  getLoader(): ILazyLoader {
    return this._slideShow.getLoader();
  }

  private _createPreviousNextButtons(container: HTMLElement): { previousButton: HTMLElement; nextButton: HTMLElement } {
    const previousButton = DomTools.createElement('div');
    DomTools.setInnerHtml(previousButton, nextImage);
    DomTools.addCssClass(previousButton, styles.mibreit_GalleryPrevious);
    DomTools.addCssClass(previousButton, animationStyles.mibreit_GalleryFade);
    DomTools.prependChildElement(previousButton, container);
    const nextButton = DomTools.createElement('div');
    DomTools.setInnerHtml(nextButton, nextImage);
    DomTools.addCssClass(nextButton, styles.mibreit_GalleryNext);
    DomTools.addCssClass(nextButton, animationStyles.mibreit_GalleryFade);
    DomTools.appendChildElement(nextButton, container);
    return { previousButton, nextButton };
  }

  private _createFullscreenButton(container: HTMLElement): HTMLElement {
    const fullscreenButton = DomTools.createElement('div');
    DomTools.setInnerHtml(fullscreenButton, fullscreen);
    DomTools.addCssClass(fullscreenButton, styles.mibreit_GalleryFullscreenButton);
    DomTools.addCssClass(fullscreenButton, animationStyles.mibreit_GalleryFade);
    DomTools.appendChildElement(fullscreenButton, container);
    return fullscreenButton;
  }

  private _setupHoverEvents(container: HTMLElement, buttons: Array<HTMLElement>) {
    DomTools.addEventListener(container, 'mouseenter', () => {
      buttons.forEach((button: HTMLElement) => {
        DomTools.addCssStyle(button, 'opacity', `${GALLERY_BUTTONS_SHOW_OPACITY}`);
      });
    });
    DomTools.addEventListener(container, 'mouseleave', () => {
      buttons.forEach((button: HTMLElement) => {
        DomTools.addCssStyle(button, 'opacity', '0');
      });
    });
  }

  private _setupKeyEvents(imageViewer: IImageViewer, fullScreen: IFullscreenView, fullscreenButton: HTMLElement) {
    DomTools.addKeyEventListener((event: KeyboardEvent) => {
      const key: string = DomTools.getKeyFromEvent(event);
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

  private _setupResizeHandler(imageViewer: IImageViewer, thumbScroller: IThumbScroller | null) {
    if (thumbScroller) {
      const debouncedThumbResizer = debounce(
        () => {
          thumbScroller.reinitSize();
        },
        DEBOUNCE_TIMER,
        false
      );
      DomTools.addResizeEventListener(() => {
        imageViewer.reinitSize();
        debouncedThumbResizer();
      });
    } else {
      DomTools.addResizeEventListener(() => {
        imageViewer.reinitSize();
      });
    }
  }

  private _setupSwipeHandler(container: HTMLElement, imageViewer: IImageViewer) {
    const containerWidth: number = DomTools.getElementDimension(container).width;
    const containerPosX: number = DomTools.getElementPosition(container).x;

    DomTools.addCssStyle(container, 'touch-action', 'pinch-zoom pan-y');

    new SwipeHander(container, (direction: ESwipeDirection, position: TPosition) => {
      if (direction === ESwipeDirection.LEFT) {
        imageViewer.showPreviousImage();
      } else if (direction === ESwipeDirection.RIGHT) {
        imageViewer.showNextImage();
      } else {
        if (position.x - containerPosX > containerWidth / 2) {
          imageViewer.showNextImage();
        } else {
          imageViewer.showPreviousImage();
        }
      }
    });
  }

  private _setupFullscreenClickEvent(
    fullscreenButton: HTMLElement,
    fullScreen: IFullscreenView,
    imageViewer: IImageViewer
  ) {
    DomTools.addClickEventListener(fullscreenButton, (event: MouseEvent) => {
      event.stopPropagation();
      if (!fullScreen.isFullscreenActive()) {
        fullScreen.activate();
        imageViewer.reinitSize();
        DomTools.addCssStyle(fullscreenButton, 'display', 'none');
      }
    });
  }

  private _setupFullscreenChangedHandler(
    fullscreenView: IFullscreenView,
    fullscreenButton: HTMLElement,
    imageViewer: IImageViewer,
    thumbScroller: IThumbScroller | null
  ) {
    fullscreenView.addFullscreenChangedCallback((active: boolean) => {
      if (thumbScroller) {
        thumbScroller.reinitSize();
      }
      imageViewer.reinitSize();
      if (active) {
        DomTools.addCssStyle(fullscreenButton, 'display', 'none');
      } else {
        DomTools.removeCssStyle(fullscreenButton, 'display');
      }
    });
  }
}
