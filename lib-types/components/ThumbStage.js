/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { addClickEventListener, addCssClass } from 'mibreit-dom-tools';
import ImageStageExpand from './ImageStageExpand';
import styles from './ThumbStage.module.css';
export default class ThumbStage extends ImageStageExpand {
    constructor(imageHandle, imageWidth, imageHeight) {
        super(imageHandle, imageWidth, imageHeight);
        addCssClass(this._imageStage, styles.thumb_stage);
    }
    addStageClickedCallback(callback) {
        addClickEventListener(this._imageStage, callback);
    }
}
