/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { ESwipeDirection } from '../components/SwipeHandler';

export default interface IImageStage {
  setZoomAnimation(activate: boolean): void;

  reinitSize(): void;

  showImage(swipeDirection?: ESwipeDirection): void;

  hideImage(swipeDirection?: ESwipeDirection): void;
}
