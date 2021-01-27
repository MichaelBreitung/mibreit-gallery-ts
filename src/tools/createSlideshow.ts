/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { DomTools } from 'mibreit-dom-tools';
import IImageStage from '../interfaces/IImageStage';
import IImageViewer from '../interfaces/IImageViewer';
import Image from '../components/Image';
import ImageViewer from '../components/ImageViewer';
import { EImageScaleMode, createImageStage } from './createImageStage';
import IImageInfo from '../interfaces/IImageInfo';
import { ILazyLoader, createLazyLoader } from 'mibreit-lazy-loader';

function checkConfig(config: SlideshowConfig) {
  if (typeof config.imageSelector === 'undefined') {
    throw new Error('SlideshowConfig invalid: no imageSelector provided');
  }
}

function prepareImages(
  imagesSelector: NodeListOf<HTMLElement>,
  scaleMode: EImageScaleMode = EImageScaleMode.FIT_ASPECT,
  zoom: boolean = false
): { images: Array<Image>; imageStages: Array<IImageStage> } {
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
  return { imageStages, images };
}

export type SlideshowConfig = {
  imageSelector: string;
  scaleMode?: EImageScaleMode;
  interval?: number;
  zoom?: boolean;
};

export default function createSlideshow(config: SlideshowConfig): { viewer: IImageViewer; loader: ILazyLoader } {
  checkConfig(config);

  const { images, imageStages } = prepareImages(
    DomTools.getElements(config.imageSelector),
    config.scaleMode,
    config.zoom
  );

  const loader: ILazyLoader = createLazyLoader(images, {});
  const imageViewer: ImageViewer = new ImageViewer(imageStages, images);
  imageViewer.addImageChangedCallback((index: number, _imageInfo: IImageInfo) => {
    loader.setCurrentIndex(index);
  });
  loader.setCurrentIndex(0);
  imageViewer.init();

  if (config.interval) {
    setInterval(function () {
      imageViewer.showNextImage();
    }, config.interval);
  }

  return { viewer: imageViewer, loader };
}
