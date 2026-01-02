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
    let newWidth: string = 'auto';
    let newHeight: string = 'auto';
    if (stageWidth / stageHeight > aspect) {
      // fit based on width
      newWidth = `100%`;
    } else {
      // fit based on height
      newHeight = `100%`;
    }
    addCssStyle(this._imageHandle, 'width', newWidth);
    addCssStyle(this._imageHandle, 'height', newHeight);
  }
}
