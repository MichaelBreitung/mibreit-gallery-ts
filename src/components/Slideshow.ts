import IImageStage from '../interfaces/IImageStage';

export default class Slideshow {
  private currentIndex: number = 0;
  private imageStages: Array<IImageStage>;
  private imageChangedCallbacks: Array<(index: number) => void> = new Array();

  constructor(imageStages: Array<IImageStage>) {
    this.imageStages = imageStages;
  }

  showImage(index: number): boolean {
    if (this.isValidIndex(index)) {
      this.changeCurrentImage(index);
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
    if (index != this.currentIndex) {
      this.imageStages[this.currentIndex].showImage(false);
      this.currentIndex = index;
      this.imageStages[this.currentIndex].showImage(true);

      this.imageChangedCallbacks.forEach((callback) => {
        callback(this.currentIndex);
      });
    }
  }
}
