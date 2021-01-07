import DomTools from "../tools/domTools";
import Image from "./Image";
import { CSS_IMAGE_STATE_CLASS } from "../constants";

/**
 * The ImageStage is responsible for proper scaling and aligning of images. There are different 
 * modes, like stretching the image to cover the stage, expanding it to cover the stage while
 * keeping the aspect ratio, expanding it within the stage while keeping the aspect ratio or not
 * scaling at all and just centering it.
 */
export default class ImageStage {
  private image: Image;

  constructor(image: Image) {
    this.image = image;
    this.createStage();
  }

  private createStage() {
    const wrapper = DomTools.createElement("div");
    wrapper.setAttribute("class", CSS_IMAGE_STATE_CLASS);
    DomTools.wrapElement(this.image.getElement(), wrapper);
  }
}