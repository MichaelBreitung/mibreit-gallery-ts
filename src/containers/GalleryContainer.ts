/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

// interfaces
import IGalleryContainer from '../interfaces/IGalleryContainer';
import IImageViewer from '../interfaces/IImageViewer';
import IThumbsViewer from '../interfaces/IThumbsViewer';
import IFullscreen from '../interfaces/IFullscreenContainer';
import { ILazyLoader } from 'mibreit-lazy-loader';
export default class GalleryContainer implements IGalleryContainer {
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

  getFullscreenContainer(): IFullscreen | null {
    return this._fullscreenContainer;
  }
}
