/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { ILazyLoader, LazyLoader } from 'mibreit-lazy-loader';

import ImageViewer from '../components/ImageViewer';
import Slideshow from '../containers/Slideshow';

// interfaces
import IImageInfo from '../interfaces/IImageInfo';
import IImageViewer from '../interfaces/IImageViewer';
import ISlideshow from '../interfaces/ISlideshow';

// Types
import { EImageScaleMode, SlideshowConfig } from '../types';

// helpers
import Image from '../components/Image';

// constants
import { PRELOADER_LEFT_SIZE, PRELOADER_RIGHT_SIZE } from '../constants';

export default class SlideshowBuilder {
  private _imageViewer: IImageViewer;
  private _lazyLoader: ILazyLoader;

  constructor(imageElements: NodeListOf<HTMLElement>, config?: SlideshowConfig) {
    const images = this._createImagesArray(imageElements);
    this._lazyLoader = this._createLoader(images, config?.loaderWindowLeft, config?.loaderWindowRight);
    this._imageViewer = this._createImageViewer(images, config?.scaleMode, config?.zoom);

    if (config?.interval) {
      setInterval(() => {
        this._imageViewer.showNextImage();
      }, config.interval);
    }

    this._imageViewer.showImage(0);
  }

  public build(): ISlideshow {
    return new Slideshow(this._imageViewer, this._lazyLoader);
  }

  private _createImagesArray(imagesSelector: NodeListOf<HTMLElement>): Array<Image> {
    const images: Array<Image> = new Array();
    for (let i = 0; i < imagesSelector.length; i++) {
      const image = new Image(imagesSelector[i]!);
      images.push(image);
    }
    return images;
  }

  private _createLoader(
    images: Array<Image>,
    loaderWindowLeft: number = PRELOADER_LEFT_SIZE,
    loaderWindowRight: number = PRELOADER_RIGHT_SIZE
  ): ILazyLoader {
    const lazyLoader = new LazyLoader(images, loaderWindowLeft, loaderWindowRight);
    setTimeout(() => {
      lazyLoader.loadElement(0);
      lazyLoader.setCurrentIndex(0);
    }, 0);
    return lazyLoader;
  }

  private _createImageViewer(images: Array<Image>, scaleMode?: EImageScaleMode, zoom?: boolean): IImageViewer {
    const imageViewer = new ImageViewer(images, scaleMode);
    if (zoom !== undefined) {
      imageViewer.setZoomAnimation(zoom);
    }

    imageViewer.addImageChangedCallback((index: number, _imageInfo: IImageInfo) => {
      this._lazyLoader.setCurrentIndex(index);
    });

    return imageViewer;
  }
}
