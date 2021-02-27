/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { DomTools } from 'mibreit-dom-tools';

// interfaces
import { ILazyLoader } from 'mibreit-lazy-loader';
import ISlideshowContainer from '../interfaces/ISlideshowContainer';
import IGalleryContainer from '../interfaces/IGalleryContainer';
import IImageViewer from '../interfaces/IImageViewer';
import IThumbScroller from '../interfaces/IThumbScroller';
import IImageInfo from '../interfaces/IImageInfo';
import IFullscreen from '../interfaces/IFullscreen';

// helpers
import { isThumbScrollerConfig, ThumbScrollerConfig } from './ThumbScrollerContainer';
import { SlideshowConfig } from './SlideshowContainer';
import SwipeHander, { ESwipeDirection, TPosition } from '../components/SwipeHandler';
import debounce from '../tools/debounce';

// factories
import createFullscreen from '../factories/createFullscreen';
import createSlideshow from '../factories/createSlideshow';
import createThumbScroller from '../factories/createThumbScroller';

// images
import nextImage from '../images/nextImage.svg';
import fullscreen from '../images/fullscreen.svg';

// styles
import animationStyles from '../tools/animations.module.css';
import styles from './GalleryContainer.module.css';

// constants
import { GALLERY_BUTTONS_SHOW_OPACITY } from '../constants';
const DEBOUNCE_TIMER = 500;

export type GalleryConfig =
  | (ThumbScrollerConfig & SlideshowConfig & { slideshowContainerSelector: string })
  | (SlideshowConfig & { slideshowContainerSelector: string });

export default class GalleryContainer implements IGalleryContainer {
  private _slideShowContainer: ISlideshowContainer;
  private _fullscreenContainer: IFullscreen | null = null;
  private _thumbScroller: IThumbScroller | null = null;

  constructor(config: GalleryConfig) {
    const container: HTMLElement | null = DomTools.getElement(config.slideshowContainerSelector);
    if (!container)
    {
      throw new Error(`Gallery#constructor - no container found for ${config.slideshowContainerSelector}`)
    }

    this._slideShowContainer = createSlideshow(config);

    const viewer = this._slideShowContainer.getViewer();
    const loader = this._slideShowContainer.getLoader();
    if (viewer != null && loader != null)
    {
      let thumbContainer: HTMLElement | null | undefined;    
      if (viewer.getNumberOfImages() > 1)
      {
        if (isThumbScrollerConfig(config))
        {
          const thumbConfig: ThumbScrollerConfig = config as ThumbScrollerConfig;
          thumbContainer = DomTools.getElement(thumbConfig.thumbContainerSelector);
          this._thumbScroller = createThumbScroller(thumbConfig, (index: number) => {
            loader.setCurrentIndex(index);
            viewer.showImage(index);
          });
          if (this._thumbScroller != null) {
            viewer.addImageChangedCallback((index: number, _imageInfo: IImageInfo) => {
              // @ts-ignore - once it is initialized it will not get null again
              this._thumbScroller.scrollTo(index, true);
            });
          }
        }
        const { previousButton, nextButton } = this._createPreviousNextButtons(container);  
        this._setupHoverEvents(container, [previousButton, nextButton]);
        this._setupSwipeHandler(container, viewer);
      }
      this._fullscreenContainer = createFullscreen(container, thumbContainer);      
      const fullscreenButton = this._createFullscreenButton(container);
      this._setupHoverEvents(container, [fullscreenButton]);
      this._setupKeyEvents(viewer, this._fullscreenContainer, fullscreenButton);     
      this._setupFullscreenClickEvent(fullscreenButton, this._fullscreenContainer, viewer);
      this._setupResizeHandler(viewer, this._thumbScroller);
      this._setupFullscreenChangedHandler(this._fullscreenContainer, fullscreenButton, viewer, this._thumbScroller);
    }
  }
  
  isInitialized(): boolean {
    return this._slideShowContainer.isInitialized();
  }

  getViewer(): IImageViewer | null {
    return this._slideShowContainer.getViewer();
  }

  getLoader(): ILazyLoader | null {
    return this._slideShowContainer.getLoader();
  }

  getScroller(): IThumbScroller | null {
    return this._thumbScroller;
  }

  getFullscreen(): IFullscreen | null {
    return this._fullscreenContainer;
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

  private _setupKeyEvents(imageViewer: IImageViewer, fullScreen: IFullscreen, fullscreenButton: HTMLElement) {
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
    DomTools.addCssStyle(container, 'touch-action', 'pinch-zoom pan-y');

    new SwipeHander(container, (direction: ESwipeDirection, position: TPosition) => {
      const containerWidth: number = DomTools.getElementDimension(container).width;
      const containerPosX: number = DomTools.getElementPosition(container).x;
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
    fullScreen: IFullscreen,
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
        DomTools.addCssStyle(fullscreenButton, 'display', 'none');
      } else {
        DomTools.removeCssStyle(fullscreenButton, 'display');
      }
    });
  }
}
