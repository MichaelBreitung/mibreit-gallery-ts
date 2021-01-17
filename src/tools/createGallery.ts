/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import DomTools from '../tools/domTools';
import IImageViewer from '../interfaces/IImageViewer';
import IThumbScroller from '../interfaces/IThumbScroller';
import createThumbScroller, { ThumbScrollerConfig } from './createThumbScroller';
import createSlideshow, { SlideshowConfig } from './createSlideshow';
import createGalleryButtons, { GalleryButtons } from './createGalleryButtons';
import { GALLERY_BUTTONS_SHOW_OPACITY } from '../constants';

export type GalleryConfig = ThumbScrollerConfig & SlideshowConfig & { galleryContainerSelector: string };

export default function createGallery(config: GalleryConfig): IImageViewer {
  const container: HTMLElement = DomTools.getElements(config.galleryContainerSelector)[0];
  const imageViewer: IImageViewer = createSlideshow(config);
  const thumbScroller: IThumbScroller = createThumbScroller(config, (index: number) => {
    imageViewer.showImage(index);
  });
  const galleryButtons: GalleryButtons = createGalleryButtons(container);

  DomTools.addClickEventListener(galleryButtons.nextButton, () => {
    imageViewer.showNextImage();
  });
  DomTools.addClickEventListener(galleryButtons.previousButton, () => {
    imageViewer.showPreviousImage();
  });
  DomTools.addEventListener(container, 'mouseenter', () => {
    DomTools.applyCssStyle(galleryButtons.nextButton, 'opacity', `${GALLERY_BUTTONS_SHOW_OPACITY}`);
    DomTools.applyCssStyle(galleryButtons.previousButton, 'opacity', `${GALLERY_BUTTONS_SHOW_OPACITY}`);
  });
  DomTools.addEventListener(container, 'mouseleave', () => {
    DomTools.applyCssStyle(galleryButtons.nextButton, 'opacity', '0');
    DomTools.applyCssStyle(galleryButtons.previousButton, 'opacity', '0');
  });

  imageViewer.addImageChangedCallback((index: number) => {
    thumbScroller.scrollTo(index, true);
  });

  return imageViewer;
}
