/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { addCssStyle } from 'mibreit-dom-tools';
import ImageStage from './ImageStage';

export default class ImageStageExpand extends ImageStage {
  private _imageWidth: number;
  private _imageHeight: number;
  constructor(imageHandle: HTMLElement, imageWidth: number, imageHeight: number) {
    super(imageHandle);
    this._imageWidth = imageWidth;
    this._imageHeight = imageHeight;
  }

  protected _applyScaleModeImpl(stageWidth: number, stageHeight: number) {
    const aspect = this._imageWidth / this._imageHeight;
    const stageAspect = stageWidth / stageHeight;

    if (stageAspect > aspect) {
      // fit based on width
      addCssStyle(this._imageHandle, 'width', `100%`);
      addCssStyle(this._imageHandle, 'height', `${(100 / aspect) * stageAspect}%`);
    } else {
      // fit based on height
      addCssStyle(this._imageHandle, 'width', `${(aspect * 100) / stageAspect}%`);
      addCssStyle(this._imageHandle, 'height', `100%`);
    }
  }
}
