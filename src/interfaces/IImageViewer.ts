/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

export default interface IImageViewer {
  showImage(index: number): boolean;

  showNextImage(): boolean;

  showPreviousImage(): boolean;

  addImageChangedCallback(callback: (index: number) => void): void;
}
