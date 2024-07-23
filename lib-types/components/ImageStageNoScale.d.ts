/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import ImageStage from './ImageStage';
export default class ImageStageNoScale extends ImageStage {
    constructor(imageHandle: HTMLElement);
    protected _applyScaleModeImpl(_stageWidth: number, _stageHeight: number): void;
}
