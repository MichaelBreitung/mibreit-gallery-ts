/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import createImageStage, { EImageScaleMode } from '../factories/createImageStage';
import Image from './Image';

// interfaces
import IImageViewer from '../interfaces/IImageViewer';
import IImageStage from '../interfaces/IImageStage';
import IImageInfo from '../interfaces/IImageInfo';

// types
import { ESwipeDirection } from './SwipeHandler';

export default class ImageViewer implements IImageViewer {
  private _currentIndex: number = 0;
  private _imageStages: Array<IImageStage> = [];
  private _images: Array<Image>;
  private _imageChangedCallbacks: Array<(index: number, imageInfo: IImageInfo) => void> = new Array();

  constructor(images: Array<Image>, scaleMode: EImageScaleMode = EImageScaleMode.FIT_ASPECT) {
    this._images = images;
    this._prepareImageStages(images, scaleMode);

    if (this._isValidIndex(0)) {
      if (!this._images[0].wasLoaded()) {
        this._images[0].addWasLoadedCallback(() => {
          this._changeCurrentImage(0);
        });
      } else {
        this._changeCurrentImage(0);
      }
    }
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

  reinitSize(): void {
    this._imageStages[this._currentIndex].applyScaleMode();
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
      return this._images[index];
    } else {
      return null;
    }
  }

  getImageElement(index: number): HTMLElement | null {
    if (this._isValidIndex(index)) {
      return this._images[index].getHtmlElement();
    } else {
      return null;
    }
  }

  private _showImage(index: number, swipeDirection: ESwipeDirection = ESwipeDirection.NONE): boolean {
    if (this._isValidIndex(index)) {
      if (index != this._currentIndex) {
        if (!this._images[index].wasLoaded()) {
          this._images[index].addWasLoadedCallback(() => {
            this._imageStages[this._currentIndex].hideImage(swipeDirection);
            this._changeCurrentImage(index, swipeDirection);
          });
        } else {
          this._imageStages[this._currentIndex].hideImage(swipeDirection);
          this._changeCurrentImage(index, swipeDirection);
        }
      }
      return true;
    } else {
      return false;
    }
  }

  private _prepareImageStages(images: Array<Image>, scaleMode: EImageScaleMode) {
    images.forEach((image) => {
      const imageStage = createImageStage(image.getHtmlElement(), image.getWidth(), image.getHeight(), scaleMode);
      image.addWasLoadedCallback(() => {
        imageStage.applyScaleMode();
      });
      this._imageStages.push(imageStage);
    });
  }

  private _isValidIndex(index: number) {
    return index >= 0 && index < this._imageStages.length;
  }

  private _changeCurrentImage(index: number, swipeDirection: ESwipeDirection = ESwipeDirection.NONE) {
    console.log('ImageViewer#changeCurrentImage', index);
    this._currentIndex = index;
    this._imageStages[this._currentIndex].showImage(swipeDirection);
    this._imageChangedCallbacks.forEach((callback) => {
      callback(this._currentIndex, this._images[this._currentIndex]);
    });
  }
}
