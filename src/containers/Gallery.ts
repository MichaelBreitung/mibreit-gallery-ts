/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

// interfaces
import IGallery from '../interfaces/IGallery';
import IImageViewer from '../interfaces/IImageViewer';
import IThumbsViewer from '../interfaces/IThumbsViewer';
import IFullscreen from '../interfaces/IFullscreen';
import { ILazyLoader } from 'mibreit-lazy-loader';

export default class Gallery implements IGallery {
  private _imageViewer: IImageViewer;
  private _loader: ILazyLoader;
  private _fullscreenContainer: IFullscreen | null = null;
  private _thumbsViewer: IThumbsViewer | null = null;

  constructor(
    imageViewer: IImageViewer,
    loader: ILazyLoader,
    thumbsViewer: IThumbsViewer | null,
    fullscreenContainer: IFullscreen | null
  ) {
    this._imageViewer = imageViewer;
    this._loader = loader;
    this._thumbsViewer = thumbsViewer;
    this._fullscreenContainer = fullscreenContainer;
  }

  getImageViewer(): IImageViewer {
    return this._imageViewer;
  }

  getLoader(): ILazyLoader {
    return this._loader;
  }

  getThumbsViewer(): IThumbsViewer | null {
    return this._thumbsViewer;
  }

  getFullscreen(): IFullscreen | null {
    return this._fullscreenContainer;
  }
}
