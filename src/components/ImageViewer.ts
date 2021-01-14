/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import IImageViewer from "../interfaces/IImageViewer";
import IImageStage from '../interfaces/IImageStage';

export default class ImageViewer implements IImageViewer {
  private currentIndex: number = 0;
  private imageStages: Array<IImageStage>;
  private imageChangedCallbacks: Array<(index: number) => void> = new Array();

  constructor(imageStages: Array<IImageStage>) {
    this.imageStages = imageStages;
  }

  init(): void
  {
    console.log("ImageViewer#init");
    if(this.isValidIndex(0))
    {
      
      this.changeCurrentImage(0);
    } 
  }

  showImage(index: number): boolean {
    if (this.isValidIndex(index)) {
      if (index != this.currentIndex) {
        this.imageStages[this.currentIndex].showImage(false);
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
    var newIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.imageStages.length - 1;

    return this.showImage(newIndex);
  }

  addImageChangedCallback(callback: (index: number) => void) {
    if (!this.imageChangedCallbacks.includes(callback)) {
      this.imageChangedCallbacks.push(callback);
    }
  }

  private isValidIndex(index: number) {
    return index >= 0 && index < this.imageStages.length;
  }

  private changeCurrentImage(index: number) {  
      console.log("ImageViewer#changeCurrentImage", index);
      this.currentIndex = index;
      this.imageStages[this.currentIndex].showImage(true);
      this.imageChangedCallbacks.forEach((callback) => {
        callback(this.currentIndex);
      });  
  }
}
