/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import ImageStage from './ImageStage';
export default class ImageStageStretch extends ImageStage {
    constructor(imageHandle: HTMLElement, imageWidth: number, imageHeight: number);
    protected _applyScaleModeImpl(_stageWidth: number, _stageHeight: number): void;
}
