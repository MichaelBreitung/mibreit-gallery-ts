/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

// interfaces
import IGalleryContainer from '../interfaces/IGalleryContainer';
import IImageViewer from '../interfaces/IImageViewer';
import IThumbScroller from '../interfaces/IThumbScroller';
import IFullscreen from '../interfaces/IFullscreen';
import { ILazyLoader } from 'mibreit-lazy-loader';
export default class GalleryContainer implements IGalleryContainer {
  private _viewer: IImageViewer;
  private _loader: ILazyLoader;
  private _fullscreenContainer: IFullscreen | null = null;
  private _thumbScroller: IThumbScroller | null = null;

  constructor(
    viewer: IImageViewer,
    loader: ILazyLoader,
    thumbScroller: IThumbScroller | null,
    fullscreenContainer: IFullscreen | null
  ) {
    this._viewer = viewer;
    this._loader = loader;
    this._thumbScroller = thumbScroller;
    this._fullscreenContainer = fullscreenContainer;
  }

  getViewer(): IImageViewer {
    return this._viewer;
  }

  getLoader(): ILazyLoader {
    return this._loader;
  }

  getScroller(): IThumbScroller | null {
    return this._thumbScroller;
  }

  getFullscreen(): IFullscreen | null {
    return this._fullscreenContainer;
  }
}
