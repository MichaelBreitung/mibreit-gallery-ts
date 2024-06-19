/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IGalleryContainer from '../interfaces/IGalleryContainer';
import IImageViewer from '../interfaces/IImageViewer';
import IThumbScroller from '../interfaces/IThumbScroller';
import IFullscreen from '../interfaces/IFullscreen';
import { ILazyLoader } from 'mibreit-lazy-loader';
export default class GalleryContainer implements IGalleryContainer {
    private _viewer;
    private _loader;
    private _fullscreenContainer;
    private _thumbScroller;
    constructor(viewer: IImageViewer, loader: ILazyLoader, thumbScroller: IThumbScroller | null, fullscreenContainer: IFullscreen | null);
    getViewer(): IImageViewer;
    getLoader(): ILazyLoader;
    getScroller(): IThumbScroller | null;
    getFullscreen(): IFullscreen | null;
}
