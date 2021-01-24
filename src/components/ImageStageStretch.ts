/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { DomTools } from 'mibreit-dom-tools';
import ImageStage from './ImageStage';

export default class ImageStageStretch extends ImageStage {
  constructor(imageHandle: HTMLElement, imageWidth: number, imageHeight: number) {
    super(imageHandle, imageWidth, imageHeight);
  }

  protected applyScaleModeImpl(_stageWidth: number, _stageHeight: number) {
    DomTools.applyCssStyle(this.imageHandle, 'width', `100%`);
    DomTools.applyCssStyle(this.imageHandle, 'height', `100%`);
  }
}
