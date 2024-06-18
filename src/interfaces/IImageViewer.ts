/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { ESwipeDirection } from '../components/SwipeHandler';
import IImageInfo from './IImageInfo';

export default interface IImageViewer {
  showImage(index: number): boolean;

  showNextImage(swipeDirection?: ESwipeDirection): boolean;

  showPreviousImage(swipeDirection?: ESwipeDirection): boolean;

  getNumberOfImages(): number;

  reinitSize(): void;

  setZoomAnimation(active: boolean): void;

  addImageChangedCallback(callback: (index: number, imageInfo: IImageInfo) => void): void;

  getImageIndex(): number;

  getImageInfo(index: number): IImageInfo | null;

  getImageElement(index:number): HTMLElement | null;
}
