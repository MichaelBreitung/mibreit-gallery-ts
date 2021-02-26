/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { DomTools } from 'mibreit-dom-tools';
import { ILazyLoader, createLazyLoader, ELazyMode } from 'mibreit-lazy-loader';

// interfaces
import IImageInfo from '../interfaces/IImageInfo';
import IImageViewer from '../interfaces/IImageViewer';
import ISlideshowContainer from '../interfaces/ISlideshowContainer';

// helpers
import Image from '../components/Image';
import { EImageScaleMode } from '../factories/createImageStage';

// factories
import createImageViewer from '../factories/createImageViewer';

// constants
import { PRELOADER_LEFT_SIZE, PRELOADER_RIGHT_SIZE } from '../constants';


export type SlideshowConfig = {
  imageSelector: string;
  scaleMode?: EImageScaleMode;
  interval?: number;
  zoom?: boolean;
  preloaderBeforeSize?: number,
  preloaderAfterSize?: number
};

export default class SlideshowContainer implements ISlideshowContainer {
  private _loader: ILazyLoader | null = null;
  private _imageViewer: IImageViewer | null = null;

  constructor(config: SlideshowConfig) {
    const images = this._prepareImages(DomTools.getElements(config.imageSelector));
    if (images.length > 0)
    {
      this._loader = this._prepareLoader(images, config.preloaderBeforeSize, config.preloaderAfterSize);
      this._imageViewer = this._prepareImageViewer(images, this._loader, config.scaleMode, config.zoom);
  
      if (config.interval !== undefined) {
        setInterval(() => {
          // @ts-ignore
          this._imageViewer.showNextImage();
        }, config.interval);
      }
    }    
  }

  isInitialized() : boolean
  {
    return this._imageViewer != null && this._loader != null;
  }

  getViewer(): IImageViewer | null {
    return this._imageViewer;
  }

  getLoader(): ILazyLoader | null {
    return this._loader;
  }

  private _prepareImages(imagesSelector: NodeListOf<HTMLElement>): Array<Image> {
    const images: Array<Image> = new Array();
    for (let i = 0; i < imagesSelector.length; i++) {
      const image = new Image(imagesSelector[i]);
      images.push(image);
    }
    return images;
  }

  private _prepareLoader(images: Array<Image>, preloaderBeforeSize: number = PRELOADER_LEFT_SIZE, preloaderAfterSize: number = PRELOADER_RIGHT_SIZE): ILazyLoader {
    const loader = createLazyLoader(images, {
      mode: ELazyMode.WINDOWED_EXTERNAL,
      preloaderBeforeSize: preloaderBeforeSize,
      preloaderAfterSize: preloaderAfterSize,
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
