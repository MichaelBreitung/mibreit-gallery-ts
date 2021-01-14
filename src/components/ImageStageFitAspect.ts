/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import ImageStage from './ImageStage';
import DomTools from '../tools/domTools';

export default class ImageStageFitAspect extends ImageStage {
  constructor(imageHandle: HTMLElement, imageWidth: number, imageHeight: number) {
    super(imageHandle, imageWidth, imageHeight);
  }

  protected applyScaleModeImpl(stageWidth: number, stageHeight: number) {
    const aspect = this.imageWidth / this.imageHeight;
    let newWidth: string = 'auto';
    let newHeight: string = 'auto';
    if (stageWidth / stageHeight > aspect) {
      // fit based on height
      if (stageHeight <= this.imageHeight) {
        newHeight = `100%`;
      }
    } else {
      // fit based on width
      if (stageWidth <= this.imageWidth) {
        newWidth = `100%`;
      }
    }
    DomTools.applyCssStyle(this.imageHandle, 'width', newWidth);
    DomTools.applyCssStyle(this.imageHandle, 'height', newHeight);
  }
}
