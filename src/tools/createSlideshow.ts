/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import DomTools from './domTools';
import IImageStage from '../interfaces/IImageStage';
import IImageLoader from '../interfaces/IImageLoader';
import IImageViewer from '../interfaces/IImageViewer';
import Image from '../components/Image';
import ImageViewer from '../components/ImageViewer';
import Preloader from '../components/Preloader';
import { EImageScaleMode, createImageStage } from './createImageStage';

function checkConfig(config: SlideshowConfig)
{
  if (typeof config.imageSelector === "undefined")
  {
    throw new Error("SlideshowConfig invalid: no imageSelector provided");
  }
}

function prepareImages(
  imagesSelector: NodeListOf<HTMLElement>,
  scaleMode: EImageScaleMode = EImageScaleMode.FIT_ASPECT,
  zoom: boolean = false
): { imageLoaders: Array<IImageLoader>; imageStages: Array<IImageStage> } {
  const images: Array<Image> = new Array();
  const imageStages: Array<IImageStage> = new Array();
  for (let i = 0; i < imagesSelector.length; i++) {
    const image = new Image(imagesSelector[i]);
    const imageStage = createImageStage(imagesSelector[i], image.getWidth(), image.getHeight(), scaleMode);
    if (zoom) {
      imageStage.setZoomAnimation(zoom);
    }
    image.addWasLoadedCallback(() => {
      imageStage.applyScaleMode();
    });
    images.push(image);
    imageStages.push(imageStage);
  }
  return { imageStages, imageLoaders: images };
}

export type SlideshowConfig = {
  imageSelector: string;
  scaleMode?: EImageScaleMode;
  interval?: number;
  zoom?: boolean;
};

export default function createSlideshow(config: SlideshowConfig): IImageViewer {
  checkConfig(config);
  
  const { imageLoaders, imageStages } = prepareImages(
    DomTools.getElements(config.imageSelector),
    config.scaleMode,
    config.zoom
  );

  const preloader: Preloader = new Preloader(imageLoaders);
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
