import ImageStage from './ImageStage';
import DomTools from '../tools/domTools';

export default class ImageStageNoScale extends ImageStage {
  constructor(imageHandle: HTMLElement, imageWidth: number, imageHeight: number) {
    super(imageHandle, imageWidth, imageHeight);
  }

  protected applyScaleModeImpl() {
    DomTools.applyCssStyle(this.imageHandle, 'width', `${this.imageWidth}px`);
    DomTools.applyCssStyle(this.imageHandle, 'height', `${this.imageHeight}px`);
  }
}
