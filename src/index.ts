/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import DomTools from './tools/domTools';
import Image from './components/Image';
import IImageStage from './interfaces/IImageStage';
import IImageViewer from './interfaces/IImageViewer';
import ImageViewer from './components/ImageViewer';
import Preloader from './components/Preloader';
import { EImageScaleMode, createImageStage } from './tools/createImageStage';

export const documentReady = DomTools.documentReady;
export const ImageScaleMode = EImageScaleMode;
export type SlideshowConfig = {
  imageSelector: string;
  scaleMode?: EImageScaleMode;
  interval?: number;
  zoom?: boolean;
};

export function createSlideshow(config: SlideshowConfig): IImageViewer {
  const imagesSelector = DomTools.getElements(config.imageSelector);
  const images: Array<Image> = new Array();
  const imageStages: Array<IImageStage> = new Array();

  for (let i = 0; i < imagesSelector.length; i++) {
    const image = new Image(imagesSelector[i]);
    const imageStage = createImageStage(imagesSelector[i], image.getWidth(), image.getHeight(), config.scaleMode);
    if (config.zoom) {
      imageStage.setZoomAnimation(config.zoom);
    }

    image.addWasLoadedCallback(() => {
      imageStage.applyScaleMode();
    });
    images.push(image);
    imageStages.push(imageStage);
  }

  const preloader: Preloader = new Preloader(images);
  const imageViewer: ImageViewer = new ImageViewer(imageStages);
  imageViewer.addImageChangedCallback((index) => {
    preloader.setCurrentIndex(index);
  });
  imageViewer.init();
  
  if (config.interval) {
    setInterval(function () {
      imageViewer.showNextImage();
    }, config.interval);
  }

  return imageViewer;
}
