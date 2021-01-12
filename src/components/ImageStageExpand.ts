import ImageStage from "./ImageStage";
import DomTools from "../tools/domTools";

export default class ImageStageExpand extends ImageStage {
  constructor(imageHandle: HTMLElement, imageWidth: number, imageHeight: number)
  {
    super(imageHandle, imageWidth, imageHeight);
  }

  protected applyScaleModeImpl() {
    const aspect = this.imageWidth / this.imageHeight;
    if (this.parentWidth / this.parentHeight > aspect) {
      // fit based on width
      DomTools.applyCssStyle(this.imageHandle, "width", `${this.parentWidth}px`);
      DomTools.applyCssStyle(this.imageHandle, "height", `${this.parentHeight / aspect}px`);
    } else {
      // fit based on height
      DomTools.applyCssStyle(this.imageHandle, "width", `${this.parentHeight * aspect}px`);
      DomTools.applyCssStyle(this.imageHandle, "height", `${this.parentHeight}px`);
    }
  }
}
