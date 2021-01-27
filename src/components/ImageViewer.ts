/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import IImageViewer from '../interfaces/IImageViewer';
import IImageStage from '../interfaces/IImageStage';
import IImageInfo from '../interfaces/IImageInfo';
import { IElementLoaderInfo } from 'mibreit-lazy-loader';

export default class ImageViewer implements IImageViewer {
  private currentIndex: number = 0;
  private imageStages: Array<IImageStage>;
  private images: Array<IImageInfo & IElementLoaderInfo>;
  private imageChangedCallbacks: Array<(index: number, imageInfo: IImageInfo) => void> = new Array();

  constructor(imageStages: Array<IImageStage>, images: Array<IImageInfo & IElementLoaderInfo>) {
    this.imageStages = imageStages;
    this.images = images;
  }

  init(): void {
    console.log('ImageViewer#init');
    if (this.isValidIndex(0)) {
      if (!this.images[0].wasLoaded()) {
        this.images[0].addWasLoadedCallback(() => {
          this.changeCurrentImage(0);
        });
      } else {
        this.changeCurrentImage(0);
      }
    }
  }

  showImage(index: number): boolean {
    if (this.isValidIndex(index)) {
      if (index != this.currentIndex) {
        if (!this.images[index].wasLoaded()) {
          this.images[index].addWasLoadedCallback(() => {
            this.imageStages[this.currentIndex].hideImage();
            this.changeCurrentImage(index);
          });
        } else {
          this.imageStages[this.currentIndex].hideImage();
          this.changeCurrentImage(index);
        }
      }
      return true;
    } else {
      return false;
    }
  }

  showNextImage(): boolean {
    const newIndex = this.currentIndex < this.imageStages.length - 1 ? this.currentIndex + 1 : 0;

    return this.showImage(newIndex);
  }

  showPreviousImage(): boolean {
    const newIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.imageStages.length - 1;

    return this.showImage(newIndex);
  }

  reinitSize(): void {
    this.imageStages[this.currentIndex].applyScaleMode();
  }

  addImageChangedCallback(callback: (index: number, imageInfo: IImageInfo) => void) {
    if (!this.imageChangedCallbacks.includes(callback)) {
      this.imageChangedCallbacks.push(callback);
    }
  }

  getImageIndex(): number {
    return this.currentIndex;
  }

  getImageInfo(index: number): IImageInfo | null {
    if (this.isValidIndex(index)) {
      return this.images[index];
    } else {
      return null;
    }
  }

  private isValidIndex(index: number) {
    return index >= 0 && index < this.imageStages.length;
  }

  private changeCurrentImage(index: number) {
    console.log('ImageViewer#changeCurrentImage', index);
    this.currentIndex = index;
    this.imageStages[this.currentIndex].showImage();
    this.imageChangedCallbacks.forEach((callback) => {
      callback(this.currentIndex, this.images[this.currentIndex]);
    });
  }
}
