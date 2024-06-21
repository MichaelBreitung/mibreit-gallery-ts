/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { ILazyLoader } from 'mibreit-lazy-loader';
import IImageViewer from '../interfaces/IImageViewer';
import ISlideshow from '../interfaces/ISlideshow';
export default class Slideshow implements ISlideshow {
    private _imageViewer;
    private _loader;
    constructor(imageViewer: IImageViewer, loader: ILazyLoader);
    getImageViewer(): IImageViewer;
    getLoader(): ILazyLoader;
}
