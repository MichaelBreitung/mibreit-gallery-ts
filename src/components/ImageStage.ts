/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { DomTools, TElementDimension } from 'mibreit-dom-tools';
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

  async hideImage(swipeDirection: ESwipeDirection = ESwipeDirection.NONE): Promise<void> {    
    if (this._zoomAnimation) {
      setTimeout(() => {
        this._resetZoom();
      }, ANIMATIONS_RESET_TIMEOUT);
    }
    this._stopSlideAnimation();
    await sleepTillNextRenderFinished();    
    if (swipeDirection == ESwipeDirection.RIGHT) {               
      DomTools.addCssClass( this._imageStage, animationStyles.mibreit_GalleryTransition);   
      DomTools.addCssStyle(this._imageStage, 'left', '-100%'); 
    }
    else if (swipeDirection == ESwipeDirection.LEFT) {              
      DomTools.addCssClass( this._imageStage, animationStyles.mibreit_GalleryTransition);   
      DomTools.addCssStyle(this._imageStage, 'left', '100%'); 
    }
    DomTools.removeCssStyle(this._imageStage, 'opacity');    
  }

  async showImage(swipeDirection: ESwipeDirection = ESwipeDirection.NONE): Promise<void> {
    this.applyScaleMode();
    if (this._zoomAnimation) {
      this._startZoomAnimation();
    }
    this._stopSlideAnimation();  
    await sleepTillNextRenderFinished();
    if (swipeDirection == ESwipeDirection.RIGHT) {        
      DomTools.removeCssClass( this._imageStage, animationStyles.mibreit_GalleryTransition);             
      DomTools.addCssStyle(this._imageStage, 'left', '100%'); 
      await sleepTillNextRenderFinished();      
      DomTools.addCssClass( this._imageStage, animationStyles.mibreit_GalleryTransition);       
      DomTools.removeCssStyle(this._imageStage, 'left'); 
    }
    else if (swipeDirection == ESwipeDirection.LEFT) {        
      DomTools.removeCssClass( this._imageStage, animationStyles.mibreit_GalleryTransition);             
      DomTools.addCssStyle(this._imageStage, 'left', '-100%'); 
      await sleepTillNextRenderFinished();     
      DomTools.addCssClass( this._imageStage, animationStyles.mibreit_GalleryTransition);       
      DomTools.removeCssStyle(this._imageStage, 'left');  
    }
    else{
      DomTools.removeCssClass( this._imageStage, animationStyles.mibreit_GalleryTransition);   
      DomTools.removeCssStyle(this._imageStage, 'left');     
    }
    DomTools.addCssStyle(this._imageStage, 'opacity', '1');
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

  private _stopSlideAnimation() {
    DomTools.addCssStyle(this._imageStage, 'margin-left', DomTools.getComputedCssStyle(this._imageStage, 'margin-left'));
  }
}
