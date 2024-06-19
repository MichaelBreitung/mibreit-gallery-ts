/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { removeCssStyle } from 'mibreit-dom-tools';
import ImageStage from './ImageStage';
export default class ImageStageNoScale extends ImageStage {
    constructor(imageHandle, imageWidth, imageHeight) {
        super(imageHandle, imageWidth, imageHeight);
    }
    _applyScaleModeImpl(_stageWidth, _stageHeight) {
        removeCssStyle(this._imageHandle, 'width');
        removeCssStyle(this._imageHandle, 'height');
    }
}
