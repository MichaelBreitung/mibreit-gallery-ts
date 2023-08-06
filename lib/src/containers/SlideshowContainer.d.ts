/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { ILazyLoader } from 'mibreit-lazy-loader';
import IImageViewer from '../interfaces/IImageViewer';
import ISlideshowContainer from '../interfaces/ISlideshowContainer';
import { EImageScaleMode } from '../factories/createImageStage';
export type SlideshowConfig = {
    scaleMode?: EImageScaleMode;
    interval?: number;
    zoom?: boolean;
};
export default class SlideshowContainer implements ISlideshowContainer {
    private _imageViewer;
    private _loader;
    constructor(elements: NodeListOf<HTMLElement>, config: SlideshowConfig);
    getViewer(): IImageViewer;
    getLoader(): ILazyLoader;
    private _prepareImages;
    private _prepareLoader;
    private _prepareImageViewer;
}
