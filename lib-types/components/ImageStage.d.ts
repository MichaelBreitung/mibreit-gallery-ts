/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IImageStage from '../interfaces/IImageStage';
import { ESwipeDirection } from './SwipeHandler';
/**
 * The ImageStage is responsible for proper scaling and centering
 * of images on the stage
 */
export default abstract class ImageStage implements IImageStage {
    private _zoomAnimation;
    protected _imageStage: HTMLElement;
    protected _imageHandle: HTMLElement;
    protected _imageWidth: number;
    protected _imageHeight: number;
    constructor(imageHandle: HTMLElement, imageWidth: number, imageHeight: number);
    setZoomAnimation(activate: boolean): void;
    setSize(widthCss: string, heightCss: string): void;
    setMargin(marginCss: string): void;
    hideImage(swipeDirection?: ESwipeDirection): Promise<void>;
    showImage(swipeDirection?: ESwipeDirection): Promise<void>;
    protected abstract _applyScaleModeImpl(stageWidth: number, stageHeight: number): void;
    private _createStage;
    private _centerImage;
    private _startZoomAnimation;
    private _resetZoom;
    private _stopSlideAnimation;
}
