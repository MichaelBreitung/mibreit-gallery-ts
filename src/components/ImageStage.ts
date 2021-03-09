/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { DomTools, TElementDimension } from 'mibreit-dom-tools';
import IImageStage from '../interfaces/IImageStage';
import styles from './ImageStage.module.css';
import animationStyles from '../tools/animations.module.css';
import { ESwipeDirection } from './SwipeHandler';

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
    const stageDimension: TElementDimension = DomTools.getElementDimension(this._imageStage);
    this._applyScaleModeImpl(stageDimension.width, stageDimension.height);
    this._centerImage(stageDimension.width, stageDimension.height);
  }

  setSize(widthCss: string, heightCss: string) {
    DomTools.addCssStyle(this._imageStage, 'width', widthCss);
    DomTools.addCssStyle(this._imageStage, 'height', heightCss);
    this.applyScaleMode();
  }

  setMargin(marginCss: string) {
    DomTools.addCssStyle(this._imageStage, 'margin', marginCss);
  }

  hideImage(swipeDirection: ESwipeDirection = ESwipeDirection.NONE): void {
    // leave enough time for hide animation to be applied
    if (this._zoomAnimation) {
      setTimeout(() => {
        this._resetZoom();
      }, ANIMATIONS_RESET_TIMEOUT);
    }
    if (swipeDirection != ESwipeDirection.NONE) {
      const animationClass = this._getSwipeAnimationClass(swipeDirection, false);
      setTimeout(() => {
        DomTools.removeCssClass(this._imageStage, animationClass);
      }, ANIMATIONS_RESET_TIMEOUT);
      DomTools.addCssClass(this._imageStage, animationClass);
    }
    DomTools.removeCssStyle(this._imageStage, 'opacity');
    DomTools.removeCssStyle(this._imageStage, 'z-index');
  }

  showImage(swipeDirection: ESwipeDirection = ESwipeDirection.NONE): void {
    this.applyScaleMode();
    if (this._zoomAnimation) {
      this._startZoomAnimation();
    }
    if (swipeDirection != ESwipeDirection.NONE) {
      const animationClass = this._getSwipeAnimationClass(swipeDirection, true);
      setTimeout(() => {
        DomTools.removeCssClass(this._imageStage, animationClass);
      }, ANIMATIONS_RESET_TIMEOUT);
      DomTools.addCssClass(this._imageStage, animationClass);
    }
    DomTools.addCssStyle(this._imageStage, 'opacity', '1');
    DomTools.addCssStyle(this._imageStage, 'z-index', '1');
  }

  protected abstract _applyScaleModeImpl(stageWidth: number, stageHeight: number): void;

  private _createStage(): HTMLElement {
    const wrapper = DomTools.createElement('div');
    DomTools.addCssClass(wrapper, styles.mibreit_ImageStage);
    DomTools.addCssClass(wrapper, animationStyles.mibreit_GalleryFade);
    DomTools.wrapElements([this._imageHandle], wrapper);
    return wrapper;
  }

  private _centerImage(stageWidth: number, stageHeight: number) {
    const { width, height } = DomTools.getElementDimension(this._imageHandle);
    const x: number = (width + stageWidth) / 2 - width;
    const y: number = (height + stageHeight) / 2 - height;
    DomTools.addCssStyle(this._imageHandle, 'margin-left', `${x}px`);
    DomTools.addCssStyle(this._imageHandle, 'margin-top', `${y}px`);
  }

  private _startZoomAnimation() {
    console.log('ImageStage#startZoomAnimation');
    DomTools.addCssClass(this._imageHandle, 'zoom');
  }

  private _resetZoom() {
    console.log('ImageStage#resetZoom');
    DomTools.removeCssClass(this._imageHandle, 'zoom');
  }

  private _getSwipeAnimationClass(swipeDirection: ESwipeDirection, show: boolean): string {
    if (swipeDirection == ESwipeDirection.LEFT) {
      if (show) {
        return animationStyles.mibreit_GallerySlideInLeft;
      } else {
        return animationStyles.mibreit_GallerySlideOutRight;
      }
    } else {
      if (show) {
        return animationStyles.mibreit_GallerySlideInRight;
      } else {
        return animationStyles.mibreit_GallerySlideOutLeft;
      }
    }
  }
}
