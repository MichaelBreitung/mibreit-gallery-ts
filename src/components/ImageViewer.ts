/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import IImageViewer from '../interfaces/IImageViewer';
import IImageStage from '../interfaces/IImageStage';
import IImageInfo from '../interfaces/IImageInfo';
import { IElementLoaderInfo } from 'mibreit-lazy-loader';

export default class ImageViewer implements IImageViewer {
  private _currentIndex: number = 0;
  private _imageStages: Array<IImageStage>;
  private _images: Array<IImageInfo & IElementLoaderInfo>;
  private _imageChangedCallbacks: Array<(index: number, imageInfo: IImageInfo) => void> = new Array();

  constructor(imageStages: Array<IImageStage>, images: Array<IImageInfo & IElementLoaderInfo>) {
    this._imageStages = imageStages;
    this._images = images;
  }

  init(): void {
    console.log('ImageViewer#init');
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
    if (this._isValidIndex(index)) {
      if (index != this._currentIndex) {
        if (!this._images[index].wasLoaded()) {
          this._images[index].addWasLoadedCallback(() => {
            this._imageStages[this._currentIndex].hideImage();
            this._changeCurrentImage(index);
          });
        } else {
          this._imageStages[this._currentIndex].hideImage();
          this._changeCurrentImage(index);
        }
      }
      return true;
    } else {
      return false;
    }
  }

  showNextImage(): boolean {
    const newIndex = this._currentIndex < this._imageStages.length - 1 ? this._currentIndex + 1 : 0;

    return this.showImage(newIndex);
  }

  showPreviousImage(): boolean {
    const newIndex = this._currentIndex > 0 ? this._currentIndex - 1 : this._imageStages.length - 1;

    return this.showImage(newIndex);
  }

  reinitSize(): void {
    this._imageStages[this._currentIndex].applyScaleMode();
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

  private _isValidIndex(index: number) {
    return index >= 0 && index < this._imageStages.length;
  }

  private _changeCurrentImage(index: number) {
    console.log('ImageViewer#changeCurrentImage', index);
    this._currentIndex = index;
    this._imageStages[this._currentIndex].showImage();
    this._imageChangedCallbacks.forEach((callback) => {
      callback(this._currentIndex, this._images[this._currentIndex]);
    });
  }
}
