/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import ImageStage from './ImageStage';
export default class ImageStageExpand extends ImageStage {
    constructor(imageHandle: HTMLElement, imageWidth: number, imageHeight: number);
    protected _applyScaleModeImpl(stageWidth: number, stageHeight: number): void;
}
