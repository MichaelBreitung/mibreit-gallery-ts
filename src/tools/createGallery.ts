/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { DomTools } from 'mibreit-dom-tools';
import IImageViewer from '../interfaces/IImageViewer';
import IThumbScroller from '../interfaces/IThumbScroller';
import IImageInfo from '../interfaces/IImageInfo';
import IFullscreenView from '../interfaces/IFullscreenView';
import createThumbScroller, { ThumbScrollerConfig } from './createThumbScroller';
import createSlideshow, { SlideshowConfig } from './createSlideshow';
import createGalleryButtons, { GalleryButtons } from './createGalleryButtons';
import { GALLERY_BUTTONS_SHOW_OPACITY } from '../constants';
import { createFullscreen } from './createFullscreen';
import { LazyLoader } from 'mibreit-lazy-loader';
import SwipeHander, { ESwipeDirection, TPosition } from '../components/SwipeHandler';

function checkConfig(config: GalleryConfig) {
  if (typeof config.galleryContainerSelector === 'undefined') {
    throw new Error('GalleryConfig invalid: no galleryContainerSelector provided');
  }
}

function setupKeyEvents(imageViewer: IImageViewer, fullScreen: IFullscreenView) {
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
        imageViewer.reinitSize();
        break;
      case 'f':
        if (fullScreen.isFullscreenActive()) {
          fullScreen.deActivate();
        } else {
          fullScreen.activate();
        }
        imageViewer.reinitSize();
        break;
      default:
        if (fullScreen.isFullscreenActive()) {
          fullScreen.deActivate();
          imageViewer.reinitSize();
        }
        break;
    }
  });
}

function setupResizeHandler(imageViewer: IImageViewer) {
  DomTools.addResizeEventListener((_event: UIEvent) => {
    imageViewer.reinitSize();
  });
}

function setupSwipeHandler(container: HTMLElement, imageViewer: IImageViewer) {
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

export type GalleryConfig = ThumbScrollerConfig & SlideshowConfig & { galleryContainerSelector: string };

export default function createGallery(config: GalleryConfig): IImageViewer {
  checkConfig(config);

  const container: HTMLElement = DomTools.getElement(config.galleryContainerSelector);
  const { imageViewer, preloader } = createSlideshow(config);
  const thumbScroller: IThumbScroller = createThumbScroller(config, (index: number) => {
    preloader.setCurrentIndex(index);
    imageViewer.showImage(index);
  });
  const galleryButtons: GalleryButtons = createGalleryButtons(container);
  const fullScreen: IFullscreenView = createFullscreen(container, DomTools.getElement(config.thumbContainerSelector));

  DomTools.addEventListener(container, 'mouseenter', () => {
    DomTools.addCssStyle(galleryButtons.nextButton, 'opacity', `${GALLERY_BUTTONS_SHOW_OPACITY}`);
    DomTools.addCssStyle(galleryButtons.previousButton, 'opacity', `${GALLERY_BUTTONS_SHOW_OPACITY}`);
  });
  DomTools.addEventListener(container, 'mouseleave', () => {
    DomTools.addCssStyle(galleryButtons.nextButton, 'opacity', '0');
    DomTools.addCssStyle(galleryButtons.previousButton, 'opacity', '0');
  });

  imageViewer.addImageChangedCallback((index: number, _imageInfo: IImageInfo) => {
    thumbScroller.scrollTo(index, true);
  });

  setupKeyEvents(imageViewer, fullScreen);

  setupSwipeHandler(container, imageViewer);

  setupResizeHandler(imageViewer);

  return imageViewer;
}
