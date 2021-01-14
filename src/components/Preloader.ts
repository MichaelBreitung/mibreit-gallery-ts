/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { PRELOADER_RIGHT_SIZE, PRELOADER_LEFT_SIZE } from '../constants';
import IImageLoader from '../interfaces/IImageLoader';

export default class Preloader {
  private currentIndex: number;
  private preloaderLeftSize: number = PRELOADER_LEFT_SIZE;
  private preloaderRightSize: number = PRELOADER_RIGHT_SIZE;
  private nrImagesLoaded: number;
  private imageLoaders: Array<IImageLoader>;

  constructor(imageLoaders: Array<IImageLoader>) {
    this.currentIndex = 0;
    this.imageLoaders = imageLoaders;
    this.nrImagesLoaded = this.getLoadedCount();
    this.moveWindow();
  }

  setCurrentIndex(newIndex: number) {
    if (this.currentIndex != newIndex) {
      this.currentIndex = newIndex;
      this.moveWindow();
    }
  }

  /**
   * Will directly load an image without changing the window of loaded images. This
   * has to be handled separately by setCurrentIndex
   *
   * @return {Promise} Promise that will resolve with true once the image is loaded
   *         or will resolve right away with false, if the image is in loading state;
   *         It will reject an invalid index with a error message
   */
  async loadImage(index: number): Promise<boolean> {
    if (index >= 0 && index < this.imageLoaders.length) {
      let loaded = false;
      try {
        loaded = await this.imageLoaders[index].load();
        if (loaded) {
          this.nrImagesLoaded++;
        }
      } catch (wasLoaded) {
        loaded = wasLoaded;
      }
      return loaded;
    } else {
      throw new Error(`Preloader#loadImage -> invalid Index ${index}`);
    }
  }

  private moveWindow() {
    if (this.nrImagesLoaded < this.imageLoaders.length) {
      let start = this.currentIndex - this.preloaderLeftSize;
      let end = this.currentIndex + this.preloaderRightSize;

      // 1) load from current image towards the right
      this.loadImages(this.currentIndex, end < this.imageLoaders.length ? end : this.imageLoaders.length);
      // 2) load from left towards current image
      this.loadImages(start >= 0 ? start : 0, this.currentIndex);
      // 3) handle overflow
      if (start < 0) {
        start = this.imageLoaders.length + start;
        this.loadImages(start, this.imageLoaders.length);
      }
      if (end >= this.imageLoaders.length) {
        end = end - this.imageLoaders.length;
        this.loadImages(0, end);
      }
    }
  }

  private loadImages(start: number, end: number) {
    for (let i = start < 0 ? 0 : start; i < end && i < this.imageLoaders.length; i++) {
      this.loadImage(i);
    }
  }

  private getLoadedCount() {
    let loadedCount = 0;
    this.imageLoaders.forEach((loader: IImageLoader) => {
      if (loader.wasLoaded()) {
        loadedCount++;
      }
    });
    return loadedCount;
  }
}
