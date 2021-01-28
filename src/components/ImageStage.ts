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
  private _zoomAnimation: boolean = false;
  protected _imageStage: HTMLElement;
  protected _imageHandle: HTMLElement;
  protected _imageWidth: number;
  protected _imageHeight: number;

  constructor(imageHandle: HTMLElement, imageWidth: number, imageHeight: number) {
    this._imageHandle = imageHandle;
    this._imageWidth = imageWidth;
    this._imageHeight = imageHeight;
    this._imageStage = this._createStage();
  }

  setZoomAnimation(activate: boolean): void {
    this._zoomAnimation = activate;
  }

  applyScaleMode(): void {
    console.log('ImageStage#applyScaleMode');
    const stageDimension: TElementDimention = DomTools.getElementDimension(this._imageStage);
    this._applyScaleModeImpl(stageDimension.width, stageDimension.height);
    this.centerImage(stageDimension.width, stageDimension.height);
  }

  setSize(widthCss: string, heightCss: string) {
    DomTools.addCssStyle(this._imageStage, 'width', widthCss);
    DomTools.addCssStyle(this._imageStage, 'height', heightCss);
    this.applyScaleMode();
  }

  setMargin(marginCss: string) {
    DomTools.addCssStyle(this._imageStage, 'margin', marginCss);
  }

  hideImage(): void {
    // leave enough time for hide animation to be applied
    if (this._zoomAnimation) {
      setTimeout(() => {
        this.resetZoom();
      }, 1000);
    }
    DomTools.removeCssStyle(this._imageStage, 'opacity');
    DomTools.removeCssStyle(this._imageStage, 'z-index');
  }

  showImage(): void {
    this.applyScaleMode();
    if (this._zoomAnimation) {
      this.startZoomAnimation();
    }
    DomTools.addCssStyle(this._imageStage, 'opacity', '1');
    DomTools.addCssStyle(this._imageStage, 'z-index', '1');
  }

  protected abstract _applyScaleModeImpl(stageWidth: number, stageHeight: number): void;

  private _createStage(): HTMLElement {
    const wrapper = DomTools.createElement('div');
    DomTools.addCssClass(wrapper, styles.mibreit_ImageStage);
    DomTools.wrapElements([this._imageHandle], wrapper);
    return wrapper;
  }

  private centerImage(stageWidth: number, stageHeight: number) {
    const { width, height } = DomTools.getElementDimension(this._imageHandle);
    const x: number = (((width + stageWidth) / 2 - width) * 100) / stageWidth;
    const y: number = (((height + stageHeight) / 2 - height) * 100) / stageHeight;
    DomTools.addCssStyle(this._imageHandle, 'margin-left', `${x}%`);
    DomTools.addCssStyle(this._imageHandle, 'margin-top', `${y}%`);
  }

  private startZoomAnimation() {
    console.log('ImageStage#startZoomAnimation');
    DomTools.addCssClass(this._imageHandle, 'zoom');
  }

  private resetZoom() {
    console.log('ImageStage#resetZoom');
    DomTools.removeCssClass(this._imageHandle, 'zoom');
  }
}
