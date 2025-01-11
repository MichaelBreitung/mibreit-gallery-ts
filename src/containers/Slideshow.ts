/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { ILazyLoader } from 'mibreit-lazy-loader';

// interfaces
import IImageViewer from '../interfaces/IImageViewer';
import ISlideshow from '../interfaces/ISlideshow';

export default class Slideshow implements ISlideshow {
  private _imageViewer: IImageViewer;
  private _loader: ILazyLoader;

  constructor(imageViewer: IImageViewer, loader: ILazyLoader) {
    this._imageViewer = imageViewer;
    this._loader = loader;
  }

  public getImageViewer(): IImageViewer {
    return this._imageViewer;
  }

  public getLoader(): ILazyLoader {
    return this._loader;
  }
}
