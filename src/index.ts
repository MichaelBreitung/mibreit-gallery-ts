/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import DomTools from './tools/domTools';
import Image from './components/Image';
import IImageStage from './interfaces/IImageStage';
import ImageViewer from './components/ImageViewer';
import Preloader from './components/Preloader';
import { EImageScaleMode, createImageStage } from './tools/createImageStage';
import { SLIDESHOW_INTERVAL } from './constants';

export const documentReady = DomTools.documentReady;
export const ImageScaleMode = EImageScaleMode;
export type TSlideshowConfig = {
  containerSelector: string;
  scaleMode?: EImageScaleMode;
  interval?: number;
  zoom?: boolean;
};

export async function createSlideshow(config: TSlideshowConfig): Promise<void> {
  const imagesSelector = DomTools.getElements(`${config.containerSelector} img`);
  const images: Array<Image> = new Array();
  const imageStages: Array<IImageStage> = new Array();

  for (let i = 0; i < imagesSelector.length; i++) {
    const image = new Image(imagesSelector[i]);
    const imageStage = createImageStage(      
      imagesSelector[i],
      image.getWidth(),
      image.getHeight(),
      config.scaleMode
    );
    if (config.zoom)
    {
      imageStage.setZoomAnimation(config.zoom);
    }
    
    image.addWasLoadedCallback(() => {
      imageStage.applyScaleMode();
    });
    images.push(image);
    imageStages.push(imageStage);
  }

  const preloader: Preloader = new Preloader(images);
  const slideshow: ImageViewer = new ImageViewer(imageStages);
  slideshow.addImageChangedCallback((index) => {
    preloader.setCurrentIndex(index);
  });

  slideshow.showNextImage();
  setInterval(function () {
    slideshow.showNextImage();
  }, config.interval ? config.interval : SLIDESHOW_INTERVAL);
}
