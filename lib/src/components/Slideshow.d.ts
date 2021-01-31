/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { ILazyLoader } from 'mibreit-lazy-loader';
import { EImageScaleMode } from '../factories/createImageStage';
import IImageViewer from '../interfaces/IImageViewer';
export declare type SlideshowConfig = {
    imageSelector: string;
    scaleMode?: EImageScaleMode;
    interval?: number;
    zoom?: boolean;
};
export default class Slideshow {
    private _loader;
    private _imageViewer;
    constructor(config: SlideshowConfig);
    getViewer(): IImageViewer;
    getLoader(): ILazyLoader;
    private _checkConfig;
    private _prepareImages;
    private _prepareLoader;
    private _prepareImageViewer;
}
