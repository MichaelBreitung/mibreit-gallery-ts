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
  removeCssStyle,
  getElement,
  cloneElement,
} from 'mibreit-dom-tools';

import SlideshowBuilder from './SlideshowBuilder';
import ThumbScrollerBuilder from './ThumbsScrollerBuilder';

import { Gallery } from '../containers';
import { Fullscreen, ImageDescription, AverageColor } from '../components';

import SwipeHander, { ESwipeDirection } from '../components/SwipeHandler';

// interfaces
import ISlideshow from '../interfaces/ISlideshow';
import IGallery from '../interfaces/IGallery';
import IImageViewer from '../interfaces/IImageViewer';
import IThumbsViewer from '../interfaces/IThumbsViewer';
import IFullscreen from '../interfaces/IFullscreen';
import IImageInfo from '../interfaces/IImageInfo';
import IImageDescription from '../interfaces/IImageDescription';

// types
import { FullscreenConfig, SlideshowConfig, ThumbScrollerConfig, TPosition } from '../types';

// images
import nextImageSvg from '../images/nextImage.svg';
import fullscreenSvg from '../images/fullscreen.svg';
import infoSvg from '../images/info.svg';

// styles
import styles from './GalleryBuilder.module.css';
import animationStyles from '../tools/animations.module.css';

export default class GalleryContainerBuilder {
  private _slideshowContainerElement: HTMLElement;
  private _fullScreenOnly: boolean;
  private _slideshow: ISlideshow;
  private _thumbsViewer: IThumbsViewer | null = null;
  private _fullscreen: IFullscreen | null = null;
  private _imageDescriptions: Array<IImageDescription> | null = null;

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
    if (this._slideshow.getImageViewer().getNumberOfImages() > 1) {
      const { previousButton, nextButton } = this._createPreviousNextButtons();
      this._setupHoverEvents([previousButton, nextButton]);
    }
    return this;
  }

  public addFullscreen(config?: FullscreenConfig): GalleryContainerBuilder {
    this._fullscreen = new Fullscreen(this._slideshowContainerElement);
    if (config) {
      if (config.useAverageBackgroundColor) {
        const imageViewer = this._slideshow.getImageViewer();
        const averageColor = new AverageColor();
        imageViewer.addImageChangedCallback((idx) => {
          averageColor.updateColors(imageViewer.getImageElement(idx) as HTMLImageElement);
        });
        this._fullscreen.setAverageBackgroundColor();
      } else if (config.backgroundColor) {
        this._fullscreen.setBackgroundColor(config.backgroundColor);
      }
    }

    const fullscreenButton = this._createFullscreenButton();
    this._setupHoverEvents([fullscreenButton]);
    this._setupFullscreenKeyEvents(this._fullscreen);
    this._setupFullscreenClickEvent(this._fullscreen, fullscreenButton);
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
    this._thumbsViewer = new ThumbScrollerBuilder(thumbContainer, thumbs, config, (index: number) => {
      this._slideshow.getLoader().setCurrentIndex(index);
      this._slideshow.getImageViewer().showImage(index);
    })
      .addPreviousNextButtons()
      .build();

    this._slideshow.getImageViewer().addImageChangedCallback((index: number, _imageInfo: IImageInfo) => {
      this._thumbsViewer!.setCenterThumb(index, true);
    });

    return this;
  }

  public addDescriptions(descriptions: NodeListOf<HTMLElement>): GalleryContainerBuilder {
    this._imageDescriptions = [];
    for (let i = 0; i < descriptions.length; i++) {
      this._imageDescriptions.push(new ImageDescription(descriptions[i]));
    }
    const infoButton = this._createInfoButton();
    this._setupHoverEvents([infoButton]);
    this._setupInfoClickEvent(infoButton, this._imageDescriptions);
    return this;
  }

  public build(): IGallery {
    if (this._slideshow.getImageViewer().getNumberOfImages() > 1) {
      this._setupSwipeHandler(this._slideshow.getImageViewer());
      this._setupKeyEvents(this._slideshow.getImageViewer());
    }
    return new Gallery(
      this._slideshow.getImageViewer(),
      this._slideshow.getLoader(),
      this._thumbsViewer,
      this._fullscreen,
      this._imageDescriptions
    );
  }

  private _createPreviousNextButtons(): { previousButton: HTMLElement; nextButton: HTMLElement } {
    const previousButton = createElement('div');
    setInnerHtml(previousButton, nextImageSvg);
    addCssClass(previousButton, styles.gallery__previous_btn);
    addCssClass(previousButton, animationStyles.fade);
    prependChildElement(previousButton, this._slideshowContainerElement);
    const nextButton = createElement('div');
    setInnerHtml(nextButton, nextImageSvg);
    addCssClass(nextButton, styles.gallery__next_btn);
    addCssClass(nextButton, animationStyles.fade);
    appendChildElement(nextButton, this._slideshowContainerElement);
    return { previousButton, nextButton };
  }

  private _setupSwipeHandler(imageViewer: IImageViewer) {
    addCssStyle(this._slideshowContainerElement, 'touch-action', 'pinch-zoom pan-y');

    new SwipeHander(this._slideshowContainerElement, (direction: ESwipeDirection, position: TPosition) => {
      if (direction === ESwipeDirection.LEFT) {
        imageViewer.showPreviousImage(direction);
      } else if (direction === ESwipeDirection.RIGHT) {
        imageViewer.showNextImage(direction);
      } else {
        const containerWidth: number = getElementDimension(this._slideshowContainerElement).width;
        const containerPosX: number = getElementPosition(this._slideshowContainerElement).x;
        if (position.x - containerPosX > containerWidth / 2) {
          imageViewer.showNextImage();
        } else {
          imageViewer.showPreviousImage();
        }
      }
    });
  }

  private _setupHoverEvents(buttons: Array<HTMLElement>) {
    addEventListener(this._slideshowContainerElement, 'mouseenter', () => {
      buttons.forEach((button: HTMLElement) => {
        removeCssStyle(button, 'opacity');
      });
    });
    addEventListener(this._slideshowContainerElement, 'mouseleave', () => {
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

  private _createFullscreenButton(): HTMLElement {
    const fullscreenButton = createElement('div');
    setInnerHtml(fullscreenButton, fullscreenSvg);
    addCssClass(fullscreenButton, styles.gallery__fullscreen_btn);
    addCssClass(fullscreenButton, animationStyles.fade);
    appendChildElement(fullscreenButton, this._slideshowContainerElement);
    return fullscreenButton;
  }

  private _setupFullscreenClickEvent(fullScreen: IFullscreen, fullscreenButton: HTMLElement) {
    // we handle it with pointerdown and up, so properly stop propagation and avoid swipres on the
    // underlying element
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

  private _createInfoButton(): HTMLElement {
    const infoButton = createElement('div');
    setInnerHtml(infoButton, infoSvg);
    addCssClass(infoButton, styles.gallery__info_btn);
    addCssClass(infoButton, animationStyles.fade);
    appendChildElement(infoButton, this._slideshowContainerElement);
    return infoButton;
  }

  private _setupInfoClickEvent(infoButton: HTMLElement, imageDescriptions: Array<IImageDescription>) {
    let currentImageDescription: number | null = null;

    const imageDescriptionVisibilityChanged = (visible: boolean) => {
      if (!visible) {
        currentImageDescription = null;
        removeCssStyle(infoButton, 'display');
      } else {
        addCssStyle(infoButton, 'display', 'none');
      }
    };

    imageDescriptions.forEach((description: IImageDescription) => {
      description.addChangedCallback(imageDescriptionVisibilityChanged);
    });

    const showImageDescription = (idx: number) => {
      hideImageDescription();
      if (idx >= 0 && idx < this._imageDescriptions!.length) {
        currentImageDescription = idx;
        imageDescriptions[currentImageDescription].show();
      }
    };

    const hideImageDescription = () => {
      if (currentImageDescription !== null) {
        imageDescriptions[currentImageDescription].hide();
        currentImageDescription = null;
      }
    };

    addEventListener(infoButton, 'pointerdown', (event: PointerEvent) => {
      event.stopPropagation();
    });
    addEventListener(infoButton, 'pointerup', (event: PointerEvent) => {
      event.stopPropagation();
      showImageDescription(this._slideshow.getImageViewer().getImageIndex());
    });

    this._slideshow.getImageViewer().addImageChangedCallback((idx: number) => {
      if (currentImageDescription !== null) {
        showImageDescription(idx);
      }
    });
  }
}
