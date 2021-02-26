/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { ILazyLoader } from 'mibreit-lazy-loader';
import IImageViewer from '../interfaces/IImageViewer';
import ISlideshowContainer from '../interfaces/ISlideshowContainer';
import { EImageScaleMode } from '../factories/createImageStage';
export declare type SlideshowConfig = {
    imageSelector: string;
    scaleMode?: EImageScaleMode;
    interval?: number;
    zoom?: boolean;
};
export default class SlideshowContainer implements ISlideshowContainer {
    private _loader;
    private _imageViewer;
    constructor(config: SlideshowConfig);
    isInitialized(): boolean;
    getViewer(): IImageViewer | null;
    getLoader(): ILazyLoader | null;
    private _prepareImages;
    private _prepareLoader;
    private _prepareImageViewer;
}
