/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { addCssStyle } from 'mibreit-dom-tools';
import ImageStage from './ImageStage';
export default class ImageStageStretch extends ImageStage {
    constructor(imageHandle, imageWidth, imageHeight) {
        super(imageHandle, imageWidth, imageHeight);
    }
    _applyScaleModeImpl(_stageWidth, _stageHeight) {
        addCssStyle(this._imageHandle, 'width', `100%`);
        addCssStyle(this._imageHandle, 'height', `100%`);
    }
}
