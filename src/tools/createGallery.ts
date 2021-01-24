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

export type GalleryConfig = ThumbScrollerConfig & SlideshowConfig & { galleryContainerSelector: string };

export default function createGallery(config: GalleryConfig): IImageViewer {
  checkConfig(config);

  const container: HTMLElement = DomTools.getElements(config.galleryContainerSelector)[0];
  const containerWidth: number = DomTools.getElementDimension(container).width;
  const containerPosX: number = DomTools.getElementPosition(container).x;
  const imageViewer: IImageViewer = createSlideshow(config);
  const thumbScroller: IThumbScroller = createThumbScroller(config, (index: number) => {
    imageViewer.showImage(index);
  });
  const galleryButtons: GalleryButtons = createGalleryButtons(container);
  const fullScreen: IFullscreenView = createFullscreen(container, DomTools.getElement(config.thumbContainerSelector));

  DomTools.addClickEventListener(container, (event: MouseEvent) => {
    if (event.pageX - containerPosX > containerWidth / 2) {
      imageViewer.showNextImage();
    } else {
      imageViewer.showPreviousImage();
    }
  });
  DomTools.addEventListener(container, 'mouseenter', () => {
    DomTools.applyCssStyle(galleryButtons.nextButton, 'opacity', `${GALLERY_BUTTONS_SHOW_OPACITY}`);
    DomTools.applyCssStyle(galleryButtons.previousButton, 'opacity', `${GALLERY_BUTTONS_SHOW_OPACITY}`);
  });
  DomTools.addEventListener(container, 'mouseleave', () => {
    DomTools.applyCssStyle(galleryButtons.nextButton, 'opacity', '0');
    DomTools.applyCssStyle(galleryButtons.previousButton, 'opacity', '0');
  });

  imageViewer.addImageChangedCallback((index: number, _imageInfo: IImageInfo) => {
    thumbScroller.scrollTo(index, true);
  });

  setupKeyEvents(imageViewer, fullScreen);

  setupResizeHandler(imageViewer);

  return imageViewer;
}
