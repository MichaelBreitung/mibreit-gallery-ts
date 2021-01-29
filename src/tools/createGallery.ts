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
import { ILazyLoader } from 'mibreit-lazy-loader';
import SwipeHander, { ESwipeDirection, TPosition } from '../components/SwipeHandler';
import debounce from './debounce';

const DEBOUNCE_TIMER = 500;

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

function setupResizeHandler(imageViewer: IImageViewer, thumbScroller: IThumbScroller) {
  const debouncedThumbResizer = debounce(() => {    
    thumbScroller.reinitSize();
  }, DEBOUNCE_TIMER, false);

  DomTools.addResizeEventListener(() => {imageViewer.reinitSize(); debouncedThumbResizer();});
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

export default function createGallery(config: GalleryConfig): { viewer: IImageViewer; loader: ILazyLoader } {
  checkConfig(config);

  const container: HTMLElement = DomTools.getElement(config.galleryContainerSelector);
  const { viewer, loader } = createSlideshow(config);
  const thumbScroller: IThumbScroller = createThumbScroller(config, (index: number) => {
    loader.setCurrentIndex(index);
    viewer.showImage(index);
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

  viewer.addImageChangedCallback((index: number, _imageInfo: IImageInfo) => {
    thumbScroller.scrollTo(index, true);
  });

  setupKeyEvents(viewer, fullScreen);

  setupSwipeHandler(container, viewer);

  setupResizeHandler(viewer, thumbScroller);

  return { viewer, loader };
}
