import DomTools from "../tools/domTools";
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
export default abstract class ImageStage {
  protected imageHandle: HTMLElement;
  protected imageWidth: number;
  protected imageHeight: number;
  protected parentWidth: number;
  protected parentHeight: number;  

  constructor(imageHandle: HTMLElement, imageWidth: number, imageHeight: number) {
    this.imageHandle = imageHandle;
    this.imageWidth = imageWidth;
    this.imageHeight = imageHeight;    
    const stage = this.createStage();
    const parent: HTMLElement = DomTools.getParentElement(stage);
    ({ width: this.parentWidth, height: this.parentHeight } = DomTools.getElementDimension(parent));
  }

  applyScaleMode() : void
  {
    this.applyScaleModeImpl();
    this.centerImage();
  }

  protected abstract applyScaleModeImpl() : void;

  private createStage(): HTMLElement {
    const wrapper = DomTools.createElement("div");
    DomTools.applyCssClass(wrapper, styles.mibreit_ImageStage);    
    DomTools.wrapElement(this.imageHandle, wrapper);
    return wrapper;
  }

  private centerImage() {
    const { width, height } = DomTools.getElementDimension(this.imageHandle);

    console.log("width ", width, "height ", height);
    const x: number = (width + this.parentWidth) / 2 - width;
    const y: number = (height + this.parentHeight) / 2 - height;
    DomTools.applyCssStyle(this.imageHandle, "margin-left", `${x}px`);
    DomTools.applyCssStyle(this.imageHandle, "margin-top", `${y}px`);
  }
}