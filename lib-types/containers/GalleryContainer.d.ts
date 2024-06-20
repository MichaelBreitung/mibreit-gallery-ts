/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IGalleryContainer from '../interfaces/IGalleryContainer';
import IImageViewer from '../interfaces/IImageViewer';
import IThumbsViewer from '../interfaces/IThumbsViewer';
import IFullscreen from '../interfaces/IFullscreen';
import { ILazyLoader } from 'mibreit-lazy-loader';
export default class GalleryContainer implements IGalleryContainer {
    private _imageViewer;
    private _loader;
    private _fullscreenContainer;
    private _thumbsViewer;
    constructor(imageViewer: IImageViewer, loader: ILazyLoader, thumbsViewer: IThumbsViewer | null, fullscreenContainer: IFullscreen | null);
    getImageViewer(): IImageViewer;
    getLoader(): ILazyLoader;
    getThumbsViewer(): IThumbsViewer | null;
    getFullscreen(): IFullscreen | null;
}
