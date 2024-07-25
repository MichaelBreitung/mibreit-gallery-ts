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
    private _zoomAnimationActive;
    protected _imageStage: HTMLElement;
    protected _imageHandle: HTMLElement;
    constructor(imageHandle: HTMLElement);
    setZoomAnimation(activate: boolean): void;
    reinitSize(): void;
    hideImage(swipeDirection?: ESwipeDirection): Promise<void>;
    showImage(swipeDirection?: ESwipeDirection): Promise<void>;
    protected abstract _applyScaleModeImpl(stageWidth: number, stageHeight: number): void;
    private _createStage;
    private _centerImage;
    private _startZoomAnimation;
    private _resetZoom;
}
