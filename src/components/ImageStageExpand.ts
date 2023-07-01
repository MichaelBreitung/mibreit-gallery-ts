/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { DomTools } from 'mibreit-dom-tools';
import ImageStage from './ImageStage';

export default class ImageStageExpand extends ImageStage {
  constructor(imageHandle: HTMLElement, imageWidth: number, imageHeight: number) {
    super(imageHandle, imageWidth, imageHeight);
  }

  protected _applyScaleModeImpl(stageWidth: number, stageHeight: number) {
    const aspect = this._imageWidth / this._imageHeight;
    const stageAspect = stageWidth / stageHeight;

    if (stageAspect > aspect) {
      // fit based on width
      DomTools.addCssStyle(this._imageHandle, 'width', `100%`);
      DomTools.addCssStyle(this._imageHandle, 'height', `${100/aspect*stageAspect}%`);
    } else {
      // fit based on height
      DomTools.addCssStyle(this._imageHandle, 'width', `${aspect*100/stageAspect}%`);
      DomTools.addCssStyle(this._imageHandle, 'height', `100%`);
    }
  }
}
