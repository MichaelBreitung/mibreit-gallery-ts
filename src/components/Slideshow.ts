/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { DomTools } from 'mibreit-dom-tools';
import { ILazyLoader, createLazyLoader, ELazyMode } from 'mibreit-lazy-loader';
import Image from '../components/Image';
import { EImageScaleMode } from '../factories/createImageStage';
import createImageViewer from '../factories/createImageViewer';
import IImageInfo from '../interfaces/IImageInfo';
import IImageViewer from '../interfaces/IImageViewer';
import { PRELOADER_LEFT_SIZE, PRELOADER_RIGHT_SIZE } from '../constants';

export type SlideshowConfig = {
  imageSelector: string;
  scaleMode?: EImageScaleMode;
  interval?: number;
  zoom?: boolean;
};

export default class Slideshow { 
  private _loader: ILazyLoader;
  private _imageViewer: IImageViewer;

  constructor(config: SlideshowConfig) {
    this._checkConfig(config);
    const images = this._prepareImages(DomTools.getElements(config.imageSelector));
    this._loader = this._prepareLoader(images);
    this._imageViewer = this._prepareImageViewer(images, this._loader, config.scaleMode, config.zoom);

    if (config.interval !== undefined) {
      setInterval(() => {
        this._imageViewer.showNextImage();
      }, config.interval);
    }
  }

  getViewer() : IImageViewer
  {
    return this._imageViewer;
  }

  getLoader() : ILazyLoader
  {
    return this._loader;
  }

  private _checkConfig(config: SlideshowConfig) {
    if (typeof config.imageSelector === 'undefined') {
      throw new Error('SlideshowConfig invalid: no imageSelector provided');
    }
  }

  private _prepareImages(imagesSelector: NodeListOf<HTMLElement>): Array<Image> {
    const images: Array<Image> = new Array();
    for (let i = 0; i < imagesSelector.length; i++) {
      const image = new Image(imagesSelector[i]);
      images.push(image);
    }
    return images;
  }

  private _prepareLoader(images: Array<Image>): ILazyLoader {
    const loader = createLazyLoader(images, {
      mode: ELazyMode.WINDOWED_EXTERNAL,
      preloaderBeforeSize: PRELOADER_LEFT_SIZE,
      preloaderAfterSize: PRELOADER_RIGHT_SIZE,
    });
    loader.setCurrentIndex(0);
    return loader;
  }

  private _prepareImageViewer(
    images: Array<Image>,
    loader: ILazyLoader,
    scaleMode?: EImageScaleMode,
    zoom?: boolean
  ): IImageViewer {
    const imageViewer = createImageViewer(images, scaleMode);
    imageViewer.addImageChangedCallback((index: number, _imageInfo: IImageInfo) => {
      loader.setCurrentIndex(index);
    });
    if (zoom !== undefined) {
      imageViewer.setZoomAnimation(zoom);
    }
    return imageViewer;
  }
}
