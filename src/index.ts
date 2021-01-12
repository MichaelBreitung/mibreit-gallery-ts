import DomTools from './tools/domTools';
import Image from './components/Image';
import IImageStage from './interfaces/IImageStage';
import Slideshow from './components/Slideshow';
import Preloader from './components/Preloader';
import { EImageScaleMode, createImageState } from './tools/createImageStage';
import { SLIDESHOW_INTERVAL } from './constants';

export const documentReady = DomTools.documentReady;
export const ImageScaleMode = EImageScaleMode;

export async function createSlideshow(
  containerSelector: string,
  scaleMode: EImageScaleMode = EImageScaleMode.FIT_ASPECT,
  interval: number = SLIDESHOW_INTERVAL,
  zoom: boolean = false
): Promise<void> {
  const imagesSelector = DomTools.getElements(`${containerSelector} img`);
  const images: Array<Image> = new Array();
  const imageStages: Array<IImageStage> = new Array();

  for (let i = 0; i < imagesSelector.length; i++) {
    const image = new Image(imagesSelector[i]);
    const imageStage = createImageState(scaleMode, imagesSelector[i], image.getWidth(), image.getHeight());
    imageStage.setZoomAnimation(zoom);
    image.addWasLoadedCallback(() => {
      imageStage.applyScaleMode();
    });
    images.push(image);
    imageStages.push(imageStage);
  }

  const preloader: Preloader = new Preloader(images);
  const slideshow: Slideshow = new Slideshow(imageStages);
  slideshow.addImageChangedCallback((index) => {
    preloader.setCurrentIndex(index);
  });

  slideshow.showNextImage();
  setInterval(function () {
    slideshow.showNextImage();
  }, interval);
}
