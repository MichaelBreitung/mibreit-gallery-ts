/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import ImageStage from './ImageStage';
export default class ImageStageFitAspect extends ImageStage {
    private _imageWidth;
    private _imageHeight;
    constructor(imageHandle: HTMLElement, imageWidth: number, imageHeight: number);
    protected _applyScaleModeImpl(stageWidth: number, stageHeight: number): void;
}
