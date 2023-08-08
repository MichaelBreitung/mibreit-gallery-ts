/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { ILazyLoader, LazyLoader } from 'mibreit-lazy-loader';

// interfaces
import IImageInfo from '../interfaces/IImageInfo';
import IImageViewer from '../interfaces/IImageViewer';
import ISlideshowContainer from '../interfaces/ISlideshowContainer';

// helpers
import Image from '../components/Image';
import { EImageScaleMode } from '../factories/createImageStage';

// constants
import { PRELOADER_LEFT_SIZE, PRELOADER_RIGHT_SIZE } from '../constants';
import ImageViewer from '../components/ImageViewer';

export type SlideshowConfig = {
  scaleMode?: EImageScaleMode;
  interval?: number;
  zoom?: boolean;
  preloaderBeforeSize?: number;
  preloaderAfterSize?: number;
};

export default class SlideshowContainer implements ISlideshowContainer {
  private _imageViewer: IImageViewer;
  private _loader: ILazyLoader;

  constructor(elements: NodeListOf<HTMLElement>, config: SlideshowConfig) {
    const images = this._prepareImages(elements);
    this._loader = this._prepareLoader(images, config.preloaderBeforeSize, config.preloaderAfterSize);
    this._imageViewer = this._prepareImageViewer(images, this._loader, config.scaleMode, config.zoom);

    if (config.interval !== undefined) {
      setInterval(() => {
        this._imageViewer.showNextImage();
      }, config.interval);
    }

    this._imageViewer.showImage(0);
  }

  public getViewer(): IImageViewer {
    return this._imageViewer;
  }

  public getLoader(): ILazyLoader {
    return this._loader;
  }

  private _prepareImages(imagesSelector: NodeListOf<HTMLElement>): Array<Image> {
    const images: Array<Image> = new Array();
    for (let i = 0; i < imagesSelector.length; i++) {
      const image = new Image(imagesSelector[i]!);
      images.push(image);
    }
    return images;
  }

  private _prepareLoader(
    images: Array<Image>,
    preloaderBeforeSize: number = PRELOADER_LEFT_SIZE,
    preloaderAfterSize: number = PRELOADER_RIGHT_SIZE
  ): ILazyLoader {
    const lazyLoader = new LazyLoader(images, preloaderBeforeSize, preloaderAfterSize);
    setTimeout(() => {
      lazyLoader.loadElement(0);
      lazyLoader.setCurrentIndex(0);
    }, 0);
    return lazyLoader;
  }

  private _prepareImageViewer(
    images: Array<Image>,
    loader: ILazyLoader,
    scaleMode?: EImageScaleMode,
    zoom?: boolean
  ): IImageViewer {
    const imageViewer = new ImageViewer(images, scaleMode);
    if (zoom !== undefined) {
      imageViewer.setZoomAnimation(zoom);
    }
    if (loader) {
      imageViewer.addImageChangedCallback((index: number, _imageInfo: IImageInfo) => {
        loader.setCurrentIndex(index);
      });
      loader.setCurrentIndex(0);
    }
    return imageViewer;
  }
}
