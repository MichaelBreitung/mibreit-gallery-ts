/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { addCssStyle } from 'mibreit-dom-tools';
import ImageStage from './ImageStage';
export default class ImageStageFitAspect extends ImageStage {
    constructor(imageHandle, imageWidth, imageHeight) {
        super(imageHandle, imageWidth, imageHeight);
    }
    _applyScaleModeImpl(stageWidth, stageHeight) {
        const aspect = this._imageWidth / this._imageHeight;
        let newWidth = 'auto';
        let newHeight = 'auto';
        if (stageWidth / stageHeight > aspect) {
            // fit based on height
            if (stageHeight <= this._imageHeight) {
                newHeight = `100%`;
            }
        }
        else {
            // fit based on width
            if (stageWidth <= this._imageWidth) {
                newWidth = `100%`;
            }
        }
        addCssStyle(this._imageHandle, 'width', newWidth);
        addCssStyle(this._imageHandle, 'height', newHeight);
    }
}
