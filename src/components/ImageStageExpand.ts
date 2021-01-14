/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import ImageStage from './ImageStage';
import DomTools from '../tools/domTools';

export default class ImageStageExpand extends ImageStage {
  constructor(imageHandle: HTMLElement, imageWidth: number, imageHeight: number) {
    super(imageHandle, imageWidth, imageHeight);
  }

  protected applyScaleModeImpl(stageWidth: number, stageHeight: number) {
    const aspect = this.imageWidth / this.imageHeight;
    if (stageWidth / stageHeight > aspect) {
      // fit based on width
      DomTools.applyCssStyle(this.imageHandle, 'width', `100%`);
      DomTools.applyCssStyle(this.imageHandle, 'height', `${100/aspect}%`);
    } else {
      // fit based on height
      DomTools.applyCssStyle(this.imageHandle, 'width', `${aspect*100}%`);
      DomTools.applyCssStyle(this.imageHandle, 'height', `100%`);
    }
  }
}
