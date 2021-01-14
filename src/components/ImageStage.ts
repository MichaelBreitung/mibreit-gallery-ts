/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import DomTools from '../tools/domTools';
import styles from './ImageStage.module.css';
import IImageStage from '../interfaces/IImageStage';

/**
 * The ImageStage is responsible for proper scaling and centering
 * of images on the stage
 */
export default abstract class ImageStage implements IImageStage {
  private zoomAnimation: boolean = false;
  private imageStage: HTMLElement;
  protected imageHandle: HTMLElement;
  protected imageWidth: number;
  protected imageHeight: number;

  constructor(imageHandle: HTMLElement, imageWidth: number, imageHeight: number) {
    this.imageHandle = imageHandle;
    this.imageWidth = imageWidth;
    this.imageHeight = imageHeight;
    this.imageStage = this.createStage();    
  }

  setZoomAnimation(activate: boolean): void {
    this.zoomAnimation = activate;
  }

  applyScaleMode(): void {   
    const stageDimenstion = DomTools.getElementDimension(this.imageStage) 
    this.applyScaleModeImpl(stageDimenstion.width, stageDimenstion.height);
    this.centerImage(stageDimenstion.width, stageDimenstion.height);
  }

  setSize(widthCss: string, heightCss: string)
  {
    DomTools.applyCssStyle(this.imageStage, "width", widthCss);
    DomTools.applyCssStyle(this.imageStage, "height", heightCss);
    this.applyScaleMode();
  }

  setMargin(marginCss: string)
  {
    DomTools.applyCssStyle(this.imageStage, "margin", marginCss);
  }

  showImage(show: boolean): void {
    console.log("ImageStage#showImage", show);
    let classes = styles.mibreit_ImageStage;
    if (show) {
      if (this.zoomAnimation) {
        this.startZoomAnimation();
      }

      classes += ` ${styles.visible}`;
    } else {
      // leave enough time for hide animation to be applied
      setTimeout(() => {
        this.resetZoom();
      }, 1000);
    }

    DomTools.applyCssClass(this.imageStage, classes);
  }

  protected abstract applyScaleModeImpl(stageWidth: number, stageHeight: number): void;

  private createStage(): HTMLElement {
    const wrapper = DomTools.createElement('div');
    DomTools.applyCssClass(wrapper, styles.mibreit_ImageStage);
    DomTools.wrapElement(this.imageHandle, wrapper);
    return wrapper;
  }

  private centerImage(stageWidth: number, stageHeight: number) {
    const { width, height } = DomTools.getElementDimension(this.imageHandle);
    const x: number = (width + stageWidth) / 2 - width;
    const y: number = (height + stageHeight) / 2 - height;
    DomTools.applyCssStyle(this.imageHandle, 'margin-left', `${x}px`);
    DomTools.applyCssStyle(this.imageHandle, 'margin-top', `${y}px`);
  }

  private startZoomAnimation() {
    DomTools.applyCssClass(this.imageHandle, 'zoom');
  }

  private resetZoom() {
    DomTools.applyCssClass(this.imageHandle, null);
  }
}
