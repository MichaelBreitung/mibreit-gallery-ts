/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import {
  TElementDimension,
  addCssClass,
  addCssStyle,
  createElement,
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
  private _zoomAnimationActive: boolean = false;
  protected _imageStage: HTMLElement;
  protected _imageHandle: HTMLElement;

  constructor(imageHandle: HTMLElement) {
    this._imageHandle = imageHandle;

    this._imageStage = this._createStage();

    const resizeObserver = new ResizeObserver(() => {
      this.reinitSize();
    });

    resizeObserver.observe(this._imageStage);
  }

  public setZoomAnimation(activate: boolean): void {
    this._zoomAnimationActive = activate;
  }

  public reinitSize() {
    const stageDimension: TElementDimension = getElementDimension(this._imageStage);
    console.log('ImageStage#reinitSize - stageDimension: ', stageDimension);
    this._applyScaleModeImpl(stageDimension.width, stageDimension.height);
  }

  public async hideImage(swipeDirection: ESwipeDirection = ESwipeDirection.NONE): Promise<void> {
    setTimeout(() => {
      this._resetZoom();
    }, ANIMATIONS_RESET_TIMEOUT);
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

  public async showImage(swipeDirection: ESwipeDirection = ESwipeDirection.NONE): Promise<void> {
    if (swipeDirection === ESwipeDirection.NONE) {
      if (this._zoomAnimationActive) {
        this._startZoomAnimation();
      }
    }

    await sleepTillNextRenderFinished();
    if (swipeDirection === ESwipeDirection.RIGHT) {
      removeCssClass(this._imageStage, animationStyles.transition);
      addCssStyle(this._imageStage, 'left', '100%');
      await sleepTillNextRenderFinished();
      addCssClass(this._imageStage, animationStyles.transition);
      removeCssStyle(this._imageStage, 'left');
    } else if (swipeDirection === ESwipeDirection.LEFT) {
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

  private _startZoomAnimation() {
    console.log('ImageStage#_startZoomAnimation');
    addCssClass(this._imageHandle, styles.img_stage__zoom);
  }

  private _resetZoom() {
    console.log('ImageStage#_resetZoom');
    removeCssClass(this._imageHandle, styles.img_stage__zoom);
  }
}
