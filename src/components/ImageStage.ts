import DomTools from "../tools/domTools";
import Image from "./Image";
import styles from "./ImageStage.module.css";

export enum EImageScaleMode {
  NONE,
  FIT_ASPECT,
  STRETCH,
  EXPAND,
}

/**
 * The ImageStage is responsible for proper scaling and centering
 * of images on the stage
 */
export default class ImageStage {
  private image: Image;
  private scaleMode: EImageScaleMode;

  constructor(image: Image, scaleMode: EImageScaleMode = EImageScaleMode.FIT_ASPECT) {
    this.image = image;
    this.scaleMode = scaleMode;
    this.createStage();
  }

  private createStage() {
    const wrapper = DomTools.createElement("div");
    wrapper.setAttribute("class", styles.mibreit_ImageStage);
    DomTools.wrapElement(this.image.getElement(), wrapper);
  }
}