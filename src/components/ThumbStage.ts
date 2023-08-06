/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { addClickEventListener, addCssClass } from 'mibreit-dom-tools';
import ImageStageExpand from './ImageStageExpand';
import styles from './ThumbStage.module.css';

export default class ThumbStage extends ImageStageExpand {
  constructor(imageHandle: HTMLElement, imageWidth: number, imageHeight: number) {
    super(imageHandle, imageWidth, imageHeight);
    addCssClass(this._imageStage, styles.mibreit_ThumbStage);
  }

  addStageClickedCallback(callback: () => void): void {
    addClickEventListener(this._imageStage, callback);
  }
}
