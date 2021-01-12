import ImageStage from './ImageStage';
import DomTools from '../tools/domTools';

export default class ImageStageStretch extends ImageStage {
  constructor(imageHandle: HTMLElement, imageWidth: number, imageHeight: number) {
    super(imageHandle, imageWidth, imageHeight);
  }

  protected applyScaleModeImpl() {
    DomTools.applyCssStyle(this.imageHandle, 'width', `100%`);
    DomTools.applyCssStyle(this.imageHandle, 'height', `100%`);
  }
}
