/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import {
  TElementDimension,
  addCssClass,
  addCssStyle,
  createElement,
  getComputedCssStyle,
  getElementDimension,
  removeCssClass,
  removeCssStyle,
  wrapElements,
} from 'mibreit-dom-tools';
import IImageStage from '../interfaces/IImageStage';
import styles from './ImageStage.module.css';
import animationStyles from '../tools/animations.module.css';
import { ESwipeDirection } from './SwipeHandler';
import { sleepTillNextRenderFinished } from '../tools/AsyncSleep';

// constants
const ANIMATIONS_RESET_TIMEOUT = 1000;

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
    const stageDimension: TElementDimension = getElementDimension(this._imageStage);
    this._applyScaleModeImpl(stageDimension.width, stageDimension.height);
    this._centerImage(stageDimension.width, stageDimension.height);
  }

  setSize(widthCss: string, heightCss: string) {
    addCssStyle(this._imageStage, 'width', widthCss);
    addCssStyle(this._imageStage, 'height', heightCss);
    this.applyScaleMode();
  }

  setMargin(marginCss: string) {
    addCssStyle(this._imageStage, 'margin', marginCss);
  }

  async hideImage(swipeDirection: ESwipeDirection = ESwipeDirection.NONE): Promise<void> {
    if (this._zoomAnimation) {
      setTimeout(() => {
        this._resetZoom();
      }, ANIMATIONS_RESET_TIMEOUT);
    }
    this._stopSlideAnimation();
    await sleepTillNextRenderFinished();
    if (swipeDirection == ESwipeDirection.RIGHT) {
      addCssClass(this._imageStage, animationStyles.transition);
      addCssStyle(this._imageStage, 'left', '-100%');
    } else if (swipeDirection == ESwipeDirection.LEFT) {
      addCssClass(this._imageStage, animationStyles.transition);
      addCssStyle(this._imageStage, 'left', '100%');
    }
    removeCssStyle(this._imageStage, 'opacity');
  }

  async showImage(swipeDirection: ESwipeDirection = ESwipeDirection.NONE): Promise<void> {
    this.applyScaleMode();
    if (this._zoomAnimation) {
      this._startZoomAnimation();
    }
    this._stopSlideAnimation();
    await sleepTillNextRenderFinished();
    if (swipeDirection == ESwipeDirection.RIGHT) {
      removeCssClass(this._imageStage, animationStyles.transition);
      addCssStyle(this._imageStage, 'left', '100%');
      await sleepTillNextRenderFinished();
      addCssClass(this._imageStage, animationStyles.transition);
      removeCssStyle(this._imageStage, 'left');
    } else if (swipeDirection == ESwipeDirection.LEFT) {
      removeCssClass(this._imageStage, animationStyles.transition);
      addCssStyle(this._imageStage, 'left', '-100%');
      await sleepTillNextRenderFinished();
      addCssClass(this._imageStage, animationStyles.transition);
      removeCssStyle(this._imageStage, 'left');
    } else {
      removeCssClass(this._imageStage, animationStyles.transition);
      removeCssStyle(this._imageStage, 'left');
    }
    addCssStyle(this._imageStage, 'opacity', '1');
  }

  protected abstract _applyScaleModeImpl(stageWidth: number, stageHeight: number): void;

  private _createStage(): HTMLElement {
    const wrapper = createElement('div');
    addCssClass(wrapper, styles.img_stage);
    addCssClass(wrapper, animationStyles.fade);
    wrapElements([this._imageHandle], wrapper);
    return wrapper;
  }

  private _centerImage(stageWidth: number, stageHeight: number) {
    const { width, height } = getElementDimension(this._imageHandle);
    const x: number = (width + stageWidth) / 2.0 - width;
    const y: number = (height + stageHeight) / 2.0 - height;
    addCssStyle(this._imageHandle, 'margin-left', `${x}px`);
    addCssStyle(this._imageHandle, 'margin-top', `${y}px`);
  }

  private _startZoomAnimation() {
    console.log('ImageStage#startZoomAnimation');
    addCssClass(this._imageHandle, 'zoom');
  }

  private _resetZoom() {
    console.log('ImageStage#resetZoom');
    removeCssClass(this._imageHandle, 'zoom');
  }

  private _stopSlideAnimation() {
    addCssStyle(this._imageStage, 'margin-left', getComputedCssStyle(this._imageStage, 'margin-left'));
  }
}
