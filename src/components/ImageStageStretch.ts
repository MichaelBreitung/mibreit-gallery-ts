/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { addCssStyle } from 'mibreit-dom-tools';
import ImageStage from './ImageStage';

export default class ImageStageStretch extends ImageStage {
  constructor(imageHandle: HTMLElement, imageWidth: number, imageHeight: number) {
    super(imageHandle, imageWidth, imageHeight);
  }

  protected _applyScaleModeImpl(_stageWidth: number, _stageHeight: number) {
    addCssStyle(this._imageHandle, 'width', `100%`);
    addCssStyle(this._imageHandle, 'height', `100%`);
  }
}
