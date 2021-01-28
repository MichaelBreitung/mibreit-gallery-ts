/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { DomTools } from 'mibreit-dom-tools';
import ImageStage from './ImageStage';

export default class ImageStageFitAspect extends ImageStage {
  constructor(imageHandle: HTMLElement, imageWidth: number, imageHeight: number) {
    super(imageHandle, imageWidth, imageHeight);
  }

  protected _applyScaleModeImpl(stageWidth: number, stageHeight: number) {
    const aspect = this._imageWidth / this._imageHeight;
    let newWidth: string = 'auto';
    let newHeight: string = 'auto';
    if (stageWidth / stageHeight > aspect) {
      // fit based on height
      if (stageHeight <= this._imageHeight) {
        newHeight = `100%`;
      }
    } else {
      // fit based on width
      if (stageWidth <= this._imageWidth) {
        newWidth = `100%`;
      }
    }
    DomTools.addCssStyle(this._imageHandle, 'width', newWidth);
    DomTools.addCssStyle(this._imageHandle, 'height', newHeight);
  }
}
