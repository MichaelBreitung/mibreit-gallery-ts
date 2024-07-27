/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import Image from './Image';
import ImageStageFitAspect from '../components/ImageStageFitAspect';
import ImageStageExpand from '../components/ImageStageExpand';
import ImageStageStretch from '../components/ImageStageStretch';
import ImageStageNoScale from '../components/ImageStageNoScale';

// interfaces
import IImageViewer from '../interfaces/IImageViewer';
import IImageStage from '../interfaces/IImageStage';
import IImageInfo from '../interfaces/IImageInfo';

// types
import { ESwipeDirection } from './SwipeHandler';
import { EImageScaleMode } from '../types';
import { ILazyLoader } from 'mibreit-lazy-loader/lib-types';

export default class ImageViewer implements IImageViewer {
  private _currentIndex: number = -1;
  private _delayedNewIndex: number = -1;
  private _imageStages: Array<IImageStage> = [];
  private _images: Array<Image>;
  private _lazyLoader: ILazyLoader;
  private _imageChangedCallbacks: Array<(index: number, imageInfo: IImageInfo) => void> = new Array();

  constructor(images: Array<Image>, loader: ILazyLoader, scaleMode: EImageScaleMode = EImageScaleMode.FIT_ASPECT) {
    this._images = images;
    this._lazyLoader = loader;
    this._prepareImageStages(images, scaleMode);
  }

  showImage(index: number): boolean {
    return this._showImage(index);
  }

  showNextImage(swipeDirection?: ESwipeDirection): boolean {
    const newIndex = this._currentIndex < this._imageStages.length - 1 ? this._currentIndex + 1 : 0;
    return this._showImage(newIndex, swipeDirection);
  }

  showPreviousImage(swipeDirection?: ESwipeDirection): boolean {
    const newIndex = this._currentIndex > 0 ? this._currentIndex - 1 : this._imageStages.length - 1;
    return this._showImage(newIndex, swipeDirection);
  }

  getNumberOfImages(): number {
    return this._imageStages.length;
  }

  setZoomAnimation(active: boolean): void {
    this._imageStages.forEach((stage) => {
      stage.setZoomAnimation(active);
    });
  }

  addImageChangedCallback(callback: (index: number, imageInfo: IImageInfo) => void) {
    if (!this._imageChangedCallbacks.includes(callback)) {
      this._imageChangedCallbacks.push(callback);
    }
  }

  getImageIndex(): number {
    return this._currentIndex;
  }

  getImageInfo(index: number): IImageInfo | null {
    if (this._isValidIndex(index)) {
      return this._images[index]!;
    } else {
      return null;
    }
  }

  getImageElement(index: number): HTMLElement | null {
    if (this._isValidIndex(index)) {
      return this._images[index]!.getHtmlElement();
    } else {
      return null;
    }
  }

  private _showImage(index: number, swipeDirection: ESwipeDirection = ESwipeDirection.NONE): boolean {
    console.log('ImageViewer#_showImage', index);
    if (this._isValidIndex(index)) {
      if (index != this._currentIndex) {
        this._lazyLoader.setCurrentIndex(index);
        if (!this._images[index]!.wasLoaded()) {
          console.log('ImageViewer#_showImage - not yet loaded');
          this._delayedNewIndex = index;
          this._images[index]!.addWasLoadedCallback(() => {
            console.log(
              `ImageViewer#_showImage#wasLoadedCallback - currentIndex=${this._currentIndex}, imageIndex=${index}, delayedIndex=${this._delayedNewIndex}`
            );
            if (index === this._delayedNewIndex) {
              this._hideImage(this._currentIndex, swipeDirection);
              this._changeCurrentImage(this._delayedNewIndex, swipeDirection);
            }
          });
        } else {
          this._hideImage(this._currentIndex, swipeDirection);
          this._changeCurrentImage(index, swipeDirection);
        }
      }
      return true;
    } else {
      return false;
    }
  }

  private _hideImage(index: number, swipeDirection: ESwipeDirection = ESwipeDirection.NONE) {
    if (this._isValidIndex(index)) {
      this._imageStages[this._currentIndex]!.hideImage(swipeDirection);
    }
  }

  private _prepareImageStages(images: Array<Image>, scaleMode: EImageScaleMode) {
    images.forEach((image) => {
      const imageStage = this._createImageStage(image.getHtmlElement(), image.getWidth(), image.getHeight(), scaleMode);
      image.addWasLoadedCallback(() => {
        imageStage.reinitSize();
      });
      this._imageStages.push(imageStage);
    });
  }

  private _createImageStage(
    imageHandle: HTMLElement,
    imageWidth: number,
    imageHeight: number,
    scaleMode: EImageScaleMode = EImageScaleMode.FIT_ASPECT
  ): IImageStage {
    switch (scaleMode) {
      case EImageScaleMode.EXPAND:
        return new ImageStageExpand(imageHandle, imageWidth, imageHeight);
      case EImageScaleMode.FIT_ASPECT:
        return new ImageStageFitAspect(imageHandle, imageWidth, imageHeight);
      case EImageScaleMode.STRETCH:
        return new ImageStageStretch(imageHandle);
      case EImageScaleMode.NONE:
      default:
        return new ImageStageNoScale(imageHandle);
    }
  }

  private _isValidIndex(index: number) {
    return index >= 0 && index < this._imageStages.length;
  }

  private _changeCurrentImage(index: number, swipeDirection: ESwipeDirection = ESwipeDirection.NONE) {
    console.log('ImageViewer#changeCurrentImage', index);
    this._currentIndex = index;
    this._imageStages[this._currentIndex]!.showImage(swipeDirection);
    this._imageChangedCallbacks.forEach((callback) => {
      callback(this._currentIndex, this._images[this._currentIndex]!);
    });
  }
}
