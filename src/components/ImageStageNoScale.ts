/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import ImageStage from './ImageStage';
import DomTools from '../tools/domTools';

export default class ImageStageNoScale extends ImageStage {
  constructor(imageHandle: HTMLElement, imageWidth: number, imageHeight: number) {
    super(imageHandle, imageWidth, imageHeight);
  }

  protected applyScaleModeImpl(_stageWidth: number, _stageHeight: number) {
    DomTools.applyCssStyle(this.imageHandle, 'width', null);
    DomTools.applyCssStyle(this.imageHandle, 'height', null);
  }
}
