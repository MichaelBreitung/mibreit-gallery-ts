/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import IImageViewer from '../interfaces/IImageViewer';
import IImageStage from '../interfaces/IImageStage';
import IImageInfo from '../interfaces/IImageInfo';

export default class ImageViewer implements IImageViewer {
  private currentIndex: number = 0;
  private imageStages: Array<IImageStage>;
  private imageInfos: Array<IImageInfo>;
  private imageChangedCallbacks: Array<(index: number, imageInfo: IImageInfo) => void> = new Array();

  constructor(imageStages: Array<IImageStage>, imageInfos: Array<IImageInfo>) {
    this.imageStages = imageStages;
    this.imageInfos = imageInfos;
  }

  init(): void {
    console.log('ImageViewer#init');
    if (this.isValidIndex(0)) {
      this.changeCurrentImage(0);
    }
  }

  showImage(index: number): boolean {
    if (this.isValidIndex(index)) {
      if (index != this.currentIndex) {
        this.imageStages[this.currentIndex].hideImage();
        this.changeCurrentImage(index);
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

  addImageChangedCallback(callback: (index: number, imageInfo: IImageInfo) => void) {
    if (!this.imageChangedCallbacks.includes(callback)) {
      this.imageChangedCallbacks.push(callback);
    }
  }

  getImageIndex() : number
  {
    return this.currentIndex;
  }

  getImageInfo(index: number) : IImageInfo | null
  {
    if (this.isValidIndex(index))
    {
      return this.imageInfos[index];
    } 
    else{
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
      callback(this.currentIndex, this.imageInfos[this.currentIndex]);
    });
  }
}
