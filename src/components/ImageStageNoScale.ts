/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { DomTools } from 'mibreit-dom-tools';
import ImageStage from './ImageStage';

export default class ImageStageNoScale extends ImageStage {
  constructor(imageHandle: HTMLElement, imageWidth: number, imageHeight: number) {
    super(imageHandle, imageWidth, imageHeight);
  }

  protected applyScaleModeImpl(_stageWidth: number, _stageHeight: number) {
    DomTools.applyCssStyle(this.imageHandle, 'width', null);
    DomTools.applyCssStyle(this.imageHandle, 'height', null);
  }
}
