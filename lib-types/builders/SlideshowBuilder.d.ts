/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import ISlideshow from '../interfaces/ISlideshow';
import { SlideshowConfig } from '../types';
export default class SlideshowBuilder {
    private _imageViewer;
    private _lazyLoader;
    constructor(imageElements: NodeListOf<HTMLElement>, config?: SlideshowConfig);
    build(): ISlideshow;
    private _createImagesArray;
    private _createLoader;
    private _createImageViewer;
}
