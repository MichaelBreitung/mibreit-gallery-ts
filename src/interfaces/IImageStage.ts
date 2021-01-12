/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

export default interface IImageStage {
  applyScaleMode(): void;

  showImage(show: boolean, zoom?: boolean): void;

  setZoomAnimation(activate: boolean): void;
}
