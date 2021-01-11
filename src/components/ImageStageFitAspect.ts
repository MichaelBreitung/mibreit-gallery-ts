import ImageStage from "./ImageStage";
import DomTools from "../tools/domTools";

export default class ImageStageFitAspect extends ImageStage {
  constructor(imageHandle: HTMLElement, imageWidth: number, imageHeight: number)
  {
    super(imageHandle, imageWidth, imageHeight);
  }

  protected applyScaleModeImpl() {
    const aspect = this.imageWidth / this.imageHeight;
    let newWidth: string = "auto";
    let newHeight: string = "auto";
    if (this.parentWidth / this.parentHeight > aspect) {
      // fit based on height
      if (this.parentHeight <= this.imageHeight) {
        newHeight = `100%`;
      } 
    } else {
      // fit based on width
      if (this.parentWidth <= this.imageWidth) {
        newWidth = `100%`;
      }
    }
    DomTools.applyCssStyle(this.imageHandle, "width", newWidth);
    DomTools.applyCssStyle(this.imageHandle, "height", newHeight);
  }
}
