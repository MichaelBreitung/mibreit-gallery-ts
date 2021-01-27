/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { DomTools, TElementDimention } from 'mibreit-dom-tools';
import IImageStage from '../interfaces/IImageStage';
import styles from './ImageStage.module.css';

/**
 * The ImageStage is responsible for proper scaling and centering
 * of images on the stage
 */
export default abstract class ImageStage implements IImageStage {
  private zoomAnimation: boolean = false;
  protected imageStage: HTMLElement;
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
    console.log('ImageStage#applyScaleMode');
    const stageDimension: TElementDimention = DomTools.getElementDimension(this.imageStage);
    this.applyScaleModeImpl(stageDimension.width, stageDimension.height);
    this.centerImage(stageDimension.width, stageDimension.height);
  }

  setSize(widthCss: string, heightCss: string) {
    DomTools.addCssStyle(this.imageStage, 'width', widthCss);
    DomTools.addCssStyle(this.imageStage, 'height', heightCss);
    this.applyScaleMode();
  }

  setMargin(marginCss: string) {
    DomTools.addCssStyle(this.imageStage, 'margin', marginCss);
  }

  hideImage(): void {
    // leave enough time for hide animation to be applied
    if (this.zoomAnimation) {
      setTimeout(() => {
        this.resetZoom();
      }, 1000);
    }
    DomTools.removeCssStyle(this.imageStage, 'opacity');
    DomTools.removeCssStyle(this.imageStage, 'z-index');
  }

  showImage(): void {
    this.applyScaleMode();
    if (this.zoomAnimation) {
      this.startZoomAnimation();
    }
    DomTools.addCssStyle(this.imageStage, 'opacity', '1');
    DomTools.addCssStyle(this.imageStage, 'z-index', '1');
  }

  protected abstract applyScaleModeImpl(stageWidth: number, stageHeight: number): void;

  private createStage(): HTMLElement {
    const wrapper = DomTools.createElement('div');
    DomTools.addCssClass(wrapper, styles.mibreit_ImageStage);
    DomTools.wrapElements([this.imageHandle], wrapper);
    return wrapper;
  }

  private centerImage(stageWidth: number, stageHeight: number) {
    const { width, height } = DomTools.getElementDimension(this.imageHandle);
    const x: number = (((width + stageWidth) / 2 - width) * 100) / stageWidth;
    const y: number = (((height + stageHeight) / 2 - height) * 100) / stageHeight;
    DomTools.addCssStyle(this.imageHandle, 'margin-left', `${x}%`);
    DomTools.addCssStyle(this.imageHandle, 'margin-top', `${y}%`);
  }

  private startZoomAnimation() {
    console.log('ImageStage#startZoomAnimation');
    DomTools.addCssClass(this.imageHandle, 'zoom');
  }

  private resetZoom() {
    console.log('ImageStage#resetZoom');
    DomTools.removeCssClass(this.imageHandle, 'zoom');
  }
}
