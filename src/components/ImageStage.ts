import DomTools from '../tools/domTools';
import styles from './ImageStage.module.css';
import IImageStage from '../interfaces/IImageStage';

/**
 * The ImageStage is responsible for proper scaling and centering
 * of images on the stage
 */
export default abstract class ImageStage implements IImageStage {
  protected imageHandle: HTMLElement;
  protected imageStage: HTMLElement;
  protected imageWidth: number;
  protected imageHeight: number;
  protected parentWidth: number;
  protected parentHeight: number;

  constructor(imageHandle: HTMLElement, imageWidth: number, imageHeight: number) {
    this.imageHandle = imageHandle;
    this.imageWidth = imageWidth;
    this.imageHeight = imageHeight;
    this.imageStage = this.createStage();
    const parent: HTMLElement = DomTools.getParentElement(this.imageStage);
    ({ width: this.parentWidth, height: this.parentHeight } = DomTools.getElementDimension(parent));
  }

  applyScaleMode(): void {
    this.applyScaleModeImpl();
    this.centerImage();
  }

  showImage(show: boolean, zoom: boolean = false): void {
    let classes = styles.mibreit_ImageStage;
    if (show) {
      if (zoom) {
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

  protected abstract applyScaleModeImpl(): void;

  private createStage(): HTMLElement {
    const wrapper = DomTools.createElement('div');
    DomTools.applyCssClass(wrapper, styles.mibreit_ImageStage);
    DomTools.wrapElement(this.imageHandle, wrapper);
    return wrapper;
  }

  private centerImage() {
    const { width, height } = DomTools.getElementDimension(this.imageHandle);
    const x: number = (width + this.parentWidth) / 2 - width;
    const y: number = (height + this.parentHeight) / 2 - height;
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
