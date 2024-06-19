/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { addCssStyle } from 'mibreit-dom-tools';
import ImageStage from './ImageStage';
export default class ImageStageExpand extends ImageStage {
    constructor(imageHandle, imageWidth, imageHeight) {
        super(imageHandle, imageWidth, imageHeight);
    }
    _applyScaleModeImpl(stageWidth, stageHeight) {
        const aspect = this._imageWidth / this._imageHeight;
        const stageAspect = stageWidth / stageHeight;
        if (stageAspect > aspect) {
            // fit based on width
            addCssStyle(this._imageHandle, 'width', `100%`);
            addCssStyle(this._imageHandle, 'height', `${(100 / aspect) * stageAspect}%`);
        }
        else {
            // fit based on height
            addCssStyle(this._imageHandle, 'width', `${(aspect * 100) / stageAspect}%`);
            addCssStyle(this._imageHandle, 'height', `100%`);
        }
    }
}
