/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IGallery from '../interfaces/IGallery';
import IImageViewer from '../interfaces/IImageViewer';
import IThumbsViewer from '../interfaces/IThumbsViewer';
import IFullscreen from '../interfaces/IFullscreen';
import { ILazyLoader } from 'mibreit-lazy-loader';
import IImageDescription from '../interfaces/IImageDescription';
export default class Gallery implements IGallery {
    private _imageViewer;
    private _loader;
    private _fullscreenContainer;
    private _thumbsViewer;
    private _imageDescriptions;
    constructor(imageViewer: IImageViewer, loader: ILazyLoader, thumbsViewer: IThumbsViewer | null, fullscreenContainer: IFullscreen | null, imageDescriptions: Array<IImageDescription> | null);
    getImageViewer(): IImageViewer;
    getLoader(): ILazyLoader;
    getThumbsViewer(): IThumbsViewer | null;
    getFullscreen(): IFullscreen | null;
    showImageDescription(idx: number): void;
    hideImageDescription(idx: number): void;
}
