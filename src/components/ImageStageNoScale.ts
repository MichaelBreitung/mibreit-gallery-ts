/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { removeCssStyle } from 'mibreit-dom-tools';
import ImageStage from './ImageStage';

export default class ImageStageNoScale extends ImageStage {
  constructor(imageHandle: HTMLElement) {
    super(imageHandle);
  }

  protected _applyScaleModeImpl(_stageWidth: number, _stageHeight: number) {
    removeCssStyle(this._imageHandle, 'width');
    removeCssStyle(this._imageHandle, 'height');
  }
}
